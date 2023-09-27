import { getToken } from "../../utils/getToken";
import { apiSlice } from "./apiSlice";

export const tourApiEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTour: builder.mutation<any, FormData>({
            query: (data) => {
                return {
                    url: "/api/v1/tour/create-tour",
                    method: "POST",
                    body: data,
                    headers: { authorization: `Bearer ${getToken()}` }
                }
            }
        }),

        
    })
})

export const { useCreateTourMutation } = tourApiEndpoints;
