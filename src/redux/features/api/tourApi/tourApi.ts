import { getToken } from "../../../../utils/getToken";
import { apiSlice } from "../apiSlice/apiSlice";
import { TourResponse, ToursResponse } from "./types";

export const tourApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTour: builder.mutation<TourResponse, FormData>({    // <TourResponse, FormData> = <ResponseValueTypeFromServer, ArgumentType>
            query: (formData) => ({                               // If there is no argument, using void
                url: "/api/v1/tour/create-tour",
                method: "POST",
                body: formData,
                headers: { authorization: `Bearer ${getToken()}` }
            })
        }),

        getTours: builder.query<ToursResponse, void>({
            query: () => ({
                url: "/api/v1/tour/tours",
                headers: { authorization: `Bearer ${getToken()}` }
            })
        }),

        getTour: builder.query<TourResponse, string>({
            query: (id) => ({
                url: `/api/v1/tour/tours/${id}`,
                headers: { authorization: `Bearer ${getToken()}` }
            })
        }),

    })
})

export const {
    useCreateTourMutation,
    useGetToursQuery,
    useGetTourQuery
} = tourApi;
