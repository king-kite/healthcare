import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
	baseQuery: fakeBaseQuery(),
	reducerPath: 'baseApi',
	tagTypes: ['Patient'],
	endpoints: () => ({}),
});

export default baseApi;
