/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: TQueryParam) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "semester-registration",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
    updateRegisteredStatus: builder.mutation({
      query: (args) => ({
        url: `semester-registration/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: TQueryParam) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: `courses/create-course`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    addFaculties: builder.mutation({
      query: (args) => ({
        url: `courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["courses"],
    }),
    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: `offered-course/create-offered-course`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    getCourseFaculties: builder.query({
      query: (id) => {
        return {
          url: `courses/${id}/get-faculties`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredStatusMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAddFacultiesMutation,
  useCreateOfferedCourseMutation,
  useGetCourseFacultiesQuery,
} = courseManagementApi;
