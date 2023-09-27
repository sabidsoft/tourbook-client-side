import { userLoggedIn } from "../auth/authSlice";
import { apiSlice } from "./apiSlice";

interface SignUp {
    name: string;
    email: string;
    password: string;
}

interface SignIn {
    email: string;
    password: string;
}

export const authApiEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data: SignUp) => ({
                url: '/api/v1/users/signup',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.payload.token,
                        user: response.data.payload.user
                    }));

                    // storing on redux store
                    dispatch(userLoggedIn({
                        token: response.data.payload.token,
                        user: response.data.payload.user
                    }));
                }
                catch (err) { }
            }
        }),

        signIn: builder.mutation({
            query: (data: SignIn) => ({
                url: '/api/v1/users/signin',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.payload.token,
                        user: response.data.payload.user
                    }));

                    // storing on redux store
                    dispatch(userLoggedIn({
                        token: response.data.payload.token,
                        user: response.data.payload.user
                    }));
                }
                catch (err) { }
            }
        }),
    })
})

export const { useSignUpMutation, useSignInMutation } = authApiEndpoints;