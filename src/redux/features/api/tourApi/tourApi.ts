import { getToken } from "../../../../utils/getToken";
import { apiSlice } from "../apiSlice/apiSlice";
import { TourResponse, ToursResponse } from "./types";

export const tourApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTours: builder.query<ToursResponse, void>({             // <TourResponse, FormData> = <ResponseValueTypeFromServer, ArgumentType>
            query: () => ({                                        // If there is no argument, using void
                url: "/api/v1/tours",
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            keepUnusedDataFor: 600, // default 60 seconds
            providesTags: ['Tours']
        }),

        getTour: builder.query<TourResponse, string>({
            query: (tourId) => ({
                url: `/api/v1/tours/${tourId}`,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            providesTags: (result, error, arg) => [{ type: 'Tour', id: arg }]
        }),

        getToursByUser: builder.query<ToursResponse, string>({
            query: (userId) => ({
                url: `/api/v1/tours?creatorId=${userId}`,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            providesTags: (result, error, arg) => [{ type: 'ToursByUser', id: arg }]
        }),

        getToursBySearch: builder.query<ToursResponse, string>({
            query: (search) => ({
                url: `/api/v1/tours?search=${search}`,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            providesTags: (result, error, arg) => [{ type: 'ToursBySearch', id: arg }]
        }),

        createTour: builder.mutation<TourResponse, FormData>({
            query: (formData) => ({
                url: "/api/v1/tours",
                method: "POST",
                body: formData,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            invalidatesTags: ['Tours', 'ToursByUser']
        }),

        deleteTour: builder.mutation<any, string>({
            query: (tourId) => ({
                url: `/api/v1/tours/${tourId}`,
                method: "DELETE",
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            invalidatesTags: ['Tours', 'ToursByUser', 'ToursBySearch']
        }),

        updateTour: builder.mutation<any, { tourId: string, formData: FormData }>({
            query: ({ tourId, formData }) => ({
                url: `/api/v1/tours/${tourId}`,
                method: "PATCH",
                body: formData,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            invalidatesTags: ['Tours', 'ToursByUser', 'ToursBySearch']
        }),

    })
})

export const {
    useGetToursQuery,
    useGetTourQuery,
    useGetToursByUserQuery,
    useGetToursBySearchQuery,
    useCreateTourMutation,
    useDeleteTourMutation,
    useUpdateTourMutation
} = tourApi;
