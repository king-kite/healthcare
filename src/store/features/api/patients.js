import baseApi from '.';
import {
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
		deletePatient: builder.mutation({
			async queryFn(id) {
				try {
					const data = await deletePatient({ id });
					return { data };
				} catch (error) {
					return { error };
				}
			},
		}),
		// fetchPatients: builder.query({
		// 	providesTags: ["Patient"],
		// 	keepUnusedDataFor: 3600,
		// 	async queryFn() {
		// 		return { data: null };
		// 	},
		// 	async onCacheEntryAdded(
		// 		params,
		// 		{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
		// 	) {
		// 		let unsubscribe;
		// 		try {
		// 			const ref =
		// 				userIds.length > 0
		// 					? await query(
		// 							getUsersCollection(),
		// 							where(documentId(), "in", userIds)
		// 					  )
		// 					: await query(getUsersCollection());
		// 			unsubscribe = onSnapshot(ref, (snapshot) => {
		// 				updateCachedData((draft) => {
		// 					return snapshot?.docs?.map((doc) => doc.data());
		// 				});
		// 			});
		// 		} catch (error) {
		// 			console.log("error in users!", error);
		// 			throw new Error("Something went wrong with users.");
		// 		}
		// 		await cacheEntryRemoved;
		// 		unsubscribe && unsubscribe();
		// 		return unsubscribe;
		// 	},
		// }),
	}),
	overrideExisting: false,
});

export const { useDeletePatientMutation, useFetchPatientsQuery } = postsApi;
export default postsApi;
