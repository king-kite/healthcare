import baseApi from '.';
import {
	addPatient,
	deletePatient,
	editPatient,
	getPatient,
	getPatients,
} from '../../../firebase/firestore/patients';

const postsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getPatient: builder.query({
			async queryFn(id) {
				try {
					const data = await getPatient({ id });
					return { data };
				} catch (error) {
					return { error };
				}
			},
			providesTags: ['Patient'],
		}),
		getPatients: builder.query({
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
		editPatient: builder.mutation({
			async queryFn(payload) {
				try {
					const data = await editPatient({
						id: payload.id,
						data: payload.data,
					});
					return { data };
				} catch (error) {
					return { error };
				}
			},
		}),
		invalidatesTags: ['Patient'],
	}),
	overrideExisting: false,
});

export const {
	useCreatePatientMutation,
	useDeletePatientMutation,
	useEditPatientMutation,
	useGetPatientQuery,
	useGetPatientsQuery,
} = postsApi;
export default postsApi;
