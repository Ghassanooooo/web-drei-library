import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "./baseUrl";
import { setCredentials } from "@/store/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers: any, { getState }: any) => {
    //const token: any = getState().auth.token ;
    const token: any = null;

    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult: any = await baseQuery(
      "/auth-api/auth/refresh",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

export const dashboardApi = createApi({
  reducerPath: "api",
  refetchOnFocus: true,
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Folders", "Lessons", "Users", "Auth"],
  endpoints: (builder) => ({}),
});
