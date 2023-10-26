import { getToken } from "../../../../utils/getToken";
import { userLoggedIn } from "../../auth/authSlice";
import { apiSlice } from "../apiSlice/apiSlice";
import { ChangePassword, SignIn, SignUp } from "./types";

export const userApi = apiSlice.injectEndpoints({
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

        changePassword: builder.mutation<any, ChangePassword>({
            query: (data) => ({
                url: '/api/v1/users/change-password',
                method: 'POST',
                body: data,
                headers: { authorization: `Bearer ${getToken()}` }
            })
        })
    })
})

export const { useSignUpMutation, useSignInMutation, useChangePasswordMutation } = userApi;