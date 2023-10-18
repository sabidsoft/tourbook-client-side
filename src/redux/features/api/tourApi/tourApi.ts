import { getToken } from "../../../../utils/getToken";
import { apiSlice } from "../apiSlice/apiSlice";
import { TourResponse, ToursResponse } from "./types";

export const tourApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTours: builder.query<ToursResponse, number>({             // <ToursResponse, FormData> = <ResponseValueTypeFromServer, ArgumentType>
            query: (page) => ({                                        // If there is no argument, have to use void
                url: `/api/v1/tours?page=${page}&limit=${9}`,
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

        getToursByUser: builder.query<ToursResponse, { userId: string, page: number }>({
            query: ({ userId, page }) => ({
                url: `/api/v1/tours?creatorId=${userId}&page=${page}&limit=${10}`,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            providesTags: (result, error, arg) => [{ type: 'ToursByUser', id: arg.userId }]
        }),

        getToursBySearch: builder.query<ToursResponse, { search: string, page: number }>({
            query: ({ search, page }) => ({
                url: `/api/v1/tours?search=${search}&page=${page}&limit=${9}`,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            providesTags: (result, error, arg) => [{ type: 'ToursBySearch', id: arg.search }]
        }),

        getToursByTagName: builder.query<ToursResponse, { tagName: string, page: number }>({
            query: ({ tagName, page }) => ({
                url: `/api/v1/tours?tags=${tagName}&page=${page}&limit=${9}`,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            providesTags: (result, error, arg) => [{ type: 'ToursByTag', id: arg.tagName }]
        }),

        getRelatedTours: builder.query<ToursResponse, { tags: string[], currentTourId: string, page: number }>({
            query: ({ tags, currentTourId, page }) => ({
                url: `/api/v1/tours?tagsValues=${tags}&currentTourId=${currentTourId}&page=${page}&limit=${10}`,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            providesTags: (result, error, arg) => [{ type: 'RelatedTours', id: arg.currentTourId }]
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
            invalidatesTags: ['Tours', 'ToursByUser', 'ToursBySearch', 'ToursByTag']
        }),

        updateTour: builder.mutation<any, { tourId: string, formData: FormData }>({
            query: ({ tourId, formData }) => ({
                url: `/api/v1/tours/${tourId}`,
                method: "PATCH",
                body: formData,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            invalidatesTags: ['Tours', 'ToursByUser', 'ToursBySearch', 'ToursByTag']
        }),

    })
})

export const {
    useGetToursQuery,
    useGetTourQuery,
    useGetToursByUserQuery,
    useGetToursBySearchQuery,
    useGetToursByTagNameQuery,
    useGetRelatedToursQuery,
    useCreateTourMutation,
    useDeleteTourMutation,
    useUpdateTourMutation
} = tourApi;
