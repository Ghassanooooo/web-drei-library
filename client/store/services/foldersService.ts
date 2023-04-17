import { dashboardApi } from "../api/dashboardApi";

export const endpoints = "/folders-api";

export const extendedFoldersApi = dashboardApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getFolders: builder.query({
      query: () => endpoints + "/folders",
      providesTags: ["Folders"],
    }),
    getFolder: builder.query({
      query: (id: any) => endpoints + "/folder/" + id,
      providesTags: ["Folders"],
    }),
    createFolder: builder.mutation({
      query: (folder: any) => ({
        url: endpoints + "/folder",
        method: "POST",
        body: folder,
      }),
      invalidatesTags: ["Folders"],
    }),
    updateFolder: builder.mutation({
      query: ({ id, ...rest }: any) => ({
        url: endpoints + "/folder/" + id,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Folders"],
    }),
    deleteFolder: builder.mutation({
      query: (id: any) => ({
        url: endpoints + "/folder/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Folders"],
    }),
  }),
});

export const {
  useGetFoldersQuery,
  useGetFolderQuery,
  useCreateFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
} = extendedFoldersApi;
