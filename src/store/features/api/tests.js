import baseApi from ".";
import {
  addTest,
  deleteTest,
  getTest,
  getTests,
} from "../../../firebase/firestore/tests";

const testsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTest: builder.query({
      async queryFn(id) {
        try {
          const data = await getTest({ id });
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Test"],
    }),
    getTests: builder.query({
      async queryFn() {
        try {
          const data = await getTests();
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Test"],
    }),
    createTest: builder.mutation({
      async queryFn(payload) {
        try {
          const data = await addTest({ data: payload });
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Test"],
    }),
    deleteTest: builder.mutation({
      async queryFn(id) {
        try {
          const data = await deleteTest({ id });
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Test"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTestMutation,
  useDeleteTestMutation,
  useGetTestQuery,
  useGetTestsQuery,
} = testsApi;
export default testsApi;
