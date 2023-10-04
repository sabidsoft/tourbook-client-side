import { userLoggedIn } from "../../auth/authSlice";
import { apiSlice } from "../apiSlice/apiSlice";
import { SignIn, SignUp } from "./types";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation<any, SignUp>({
            query: (data) => ({
                url: '/api/v1/users/signup',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // storing on redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));
                }
                catch (err) { }
            }
        }),

        signIn: builder.mutation<any, SignIn>({
            query: (data) => ({
                url: '/api/v1/users/signin',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // storing on redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));
                }
                catch (err) { }
            }
        }),
    })
})

export const { useSignUpMutation, useSignInMutation } = authApi;