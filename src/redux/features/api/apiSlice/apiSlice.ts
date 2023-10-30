import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../../app/store';

export const apiSlice = createApi({
    reducerPath: 'tourbookApi',
    tagTypes: ['User', 'Tours', 'Tour', 'ToursByUser', 'ToursBySearch', 'ToursByTag', 'RelatedTours'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://tourbook-backend.vercel.app',
        prepareHeaders: async (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({})
})

