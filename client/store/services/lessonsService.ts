import { dashboardApi } from "../api/dashboardApi";

export const endpoints = "/lessons-api";

export const extendedLessonsApi = dashboardApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getLessons: builder.query({
      query: () => endpoints + "/lessons",
      providesTags: ["Lessons"],
    }),
    getLesson: builder.query({
      query: (id: string) => {
        console.log(" getLesson ==> id", id);
        return "/lessons-api" + "/lesson/" + id;
      },
      providesTags: ["Lessons"],
    }),
    createLessons: builder.mutation({
      query: () => ({
        url: endpoints + "/lesson",
        method: "POST",
      }),
      invalidatesTags: ["Lessons"],
    }),

    createMarkdownHorizontalSlide: builder.mutation({
      query: (id: string) => ({
        url: endpoints + `/lesson/${id}/markdown/horizontal-slide`,
        method: "POST",
      }),
      invalidatesTags: ["Lessons"],
    }),
    updateLessons: builder.mutation({
      query: ({ id, content }: any) => ({
        url: endpoints + "/lesson/" + id,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["Lessons"],
    }),
    deleteLessons: builder.mutation({
      query: (id: any) => ({
        url: endpoints + "/lesson/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Lessons"],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useGetLessonQuery,
  useCreateLessonsMutation,
  useUpdateLessonsMutation,
  useDeleteLessonsMutation,
  useCreateMarkdownHorizontalSlideMutation,
} = extendedLessonsApi;
