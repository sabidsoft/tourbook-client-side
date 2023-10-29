import { getToken } from "../../../../utils/getToken";
import { userLoggedIn } from "../../auth/authSlice";
import { apiSlice } from "../apiSlice/apiSlice";
import { SignUp, UserResponse } from "./types";

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

        signIn: builder.mutation<any, { email: string, password: string }>({
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

        getUser: builder.query<UserResponse, string>({
            query: (userId) => ({
                url: `/api/v1/users/${userId}`,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            providesTags: (result, error, arg) => [{ type: 'User', id: arg }]
        }),

        updateUser: builder.mutation<any, { userId: string, formData: FormData }>({
            query: ({ userId, formData }) => ({
                url: `/api/v1/users/${userId}`,
                method: "PATCH",
                body: formData,
                headers: { authorization: `Bearer ${getToken()}` }
            }),
            invalidatesTags: ['User']
        }),

        changePassword: builder.mutation<any, { currentPassword: string, newPassword: string }>({
            query: (data) => ({
                url: '/api/v1/users/change-password',
                method: 'POST',
                body: data,
                headers: { authorization: `Bearer ${getToken()}` }
            })
        }),

        forgotPassword: builder.mutation<any, { email: string }>({
            query: (data) => ({
                url: '/api/v1/users/forgot-password',
                method: 'POST',
                body: data,
                headers: { authorization: `Bearer ${getToken()}` }
            })
        }),

        resetPassword: builder.mutation<any, { password: string, resetPasswordToken: string, userId: string }>({
            query: ({ password, resetPasswordToken, userId }) => {
                console.log(password +" " +resetPasswordToken+ " " +userId)
                return ({
                    url: `/api/v1/users/reset-password?resetPasswordToken=${resetPasswordToken}&userId=${userId}`,
                    method: 'POST',
                    body: { password },
                    headers: { authorization: `Bearer ${getToken()}` }
                })
            }
        }),
    })
})

export const {
    useSignUpMutation,
    useSignInMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = userApi;