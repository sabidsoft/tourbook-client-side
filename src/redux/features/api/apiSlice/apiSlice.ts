import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'tourbookApi',
    tagTypes: ['Tours', 'Tour', 'ToursByUser', 'ToursBySearch'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
    }),
    endpoints: (builder) => ({}),
})



// // with prepareHeaders and keepUnusedDataFor
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from '../../../app/store';

// export const apiSlice = createApi({
//     reducerPath: 'tourbookApi',
//     tagTypes: ['Tours', 'Tour'],
//     keepUnusedDataFor: 600,
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:8080',
//         prepareHeaders: async (headers, { getState }) => {
//             const token = (getState() as RootState).auth.token;
//             if (token) {
//                 headers.set('Authorization', `Bearer ${token}`)
//             }
//             return headers;
//         }
//     }),
//     endpoints: (builder) => ({}),
// })

