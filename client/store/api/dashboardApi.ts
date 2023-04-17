import { foldersUrl } from "./baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "foldersApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: foldersUrl,
  }),
  tagTypes: ["Folders"],
  endpoints: (builder) => ({}),
});
