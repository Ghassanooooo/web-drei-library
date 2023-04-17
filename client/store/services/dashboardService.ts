import { dashboardApi } from "../api/dashboardApi";

export const extendedDashboardApi = dashboardApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getFolders: builder.query({
      query: () => "/folders",
      providesTags: ["Folders"],
    }),
    getFolder: builder.query({
      query: (id: any) => "/folder/" + id,
      providesTags: ["Folders"],
    }),
    createFolder: builder.mutation({
      query: (folder: any) => ({
        url: "/folder",
        method: "POST",
        body: folder,
      }),
      invalidatesTags: ["Folders"],
    }),
    updateFolder: builder.mutation({
      query: ({ id, ...rest }: any) => ({
        url: "/folder/" + id,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Folders"],
    }),
    deleteFolder: builder.mutation({
      query: (id: any) => ({
        url: "/folder/" + id,
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
} = extendedDashboardApi;
