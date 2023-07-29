import baseApi from '.';
import { updateProfileInfo } from '../../../firebase/auth';

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		updateProfile: builder.mutation({
			async queryFn(payload) {
				try {
					const data = await updateProfileInfo({ data: payload });
					return { data };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ['Auth'],
		}),
	}),
	overrideExisting: false,
});

export const { useUpdateProfileMutation } = authApi;
export default authApi;
