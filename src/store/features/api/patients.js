import baseApi from '.';
import {
	addPatient,
	deletePatient,
	getPatients,
} from '../../../firebase/firestore/patients';

const postsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		fetchPatients: builder.query({
			async queryFn() {
				try {
					const data = await getPatients();
					return { data };
				} catch (error) {
					return { error };
				}
			},
			providesTags: ['Patient'],
		}),
		createPatient: builder.mutation({
			async queryFn(payload) {
				try {
					const data = await addPatient({ data: payload });
					return { data };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ['Patient'],
		}),
		deletePatient: builder.mutation({
			async queryFn(id) {
				try {
					const data = await deletePatient({ id });
					return { data };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ['Patient'],
		}),
	}),
	overrideExisting: false,
});

export const {
	useCreatePatientMutation,
	useDeletePatientMutation,
	useFetchPatientsQuery,
} = postsApi;
export default postsApi;
