import { dashboardApi } from "../api/dashboardApi";

export const endpoints = "/users-api";

export const extendedLessonsApi = dashboardApi.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (body: any) => ({
        url: endpoints + "/users/find/login-jwt",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useLoginMutation } = extendedLessonsApi;
