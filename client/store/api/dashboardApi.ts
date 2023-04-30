import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "./baseUrl";

export const dashboardApi = createApi({
  reducerPath: "foldersApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Folders", "Lessons", "Users"],
  endpoints: (builder) => ({}),
});
