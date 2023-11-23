import baseApi from '.';
import { changePassword, updateProfileInfo } from '../../../firebase/auth';

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		updatePassword: builder.mutation({
			async queryFn(payload) {
				try {
					const data = await changePassword({ password: payload });
					return { data };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ['Auth'],
		}),
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

export const { useUpdatePasswordMutation, useUpdateProfileMutation } = authApi;
export default authApi;
