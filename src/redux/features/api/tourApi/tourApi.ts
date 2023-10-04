import { getToken } from "../../../../utils/getToken";
import { apiSlice } from "../apiSlice/apiSlice";
import { TourResponse, ToursResponse } from "./types";

export const tourApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTour: builder.mutation<TourResponse, FormData>({    // <TourResponse, FormData> = <ResponseValueTypeFromServer, ArgumentType>
            query: (formData) => ({                               // If there is no argument, using void
                url: "/api/v1/tours/create-tour",
                method: "POST",
                body: formData,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            invalidatesTags: ['Tours', 'ToursByUser']
        }),

        getTours: builder.query<ToursResponse, void>({
            query: () => ({
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
                url: `/api/v1/tours/user-tours/${userId}`,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            providesTags: (result, error, arg) => [{ type: 'ToursByUser', id: arg }]
        }),

        deleteTour: builder.mutation<any, string>({
            query: (tourId) => ({
                url: `/api/v1/tours/${tourId}`,
                method: "DELETE",
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            invalidatesTags: ['Tours', 'ToursByUser']
        }),

        updateTour: builder.mutation<any, { tourId: string, formData: FormData }>({
            query: ({ tourId, formData }) => ({
                url: `/api/v1/tours/${tourId}`,
                method: "PATCH",
                body: formData,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            invalidatesTags: ['Tours', 'ToursByUser']
        }),

    })
})

export const {
    useCreateTourMutation,
    useGetToursQuery,
    useGetTourQuery,
    useGetToursByUserQuery,
    useDeleteTourMutation,
    useUpdateTourMutation
} = tourApi;
