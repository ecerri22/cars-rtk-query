import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: " http://localhost:3001"
    }),
    endpoints(builder) {
        return {
            fetchUsers: builder.query({
                providesTags: (results, error, user) => {
                    return [{type: "User", user}]
                },
                query: () => {
                    return {
                        method: "GET",
                        url: "/users",
                    }
                }
            }),

            addUser: builder.mutation({
                invalidatesTags: (results, error, user) => {
                    return [{type: "User", user}]
                },
                query: (user) => {
                    return {
                        method: "POST",
                        url: "/users",
                        body: {
                            name: user.name,
                            surname: user.surname,
                            email: user.email,
                            password: user.password
                        }

                    }
                }
            })
        }
    }
})

export const { useFetchUsersQuery, useAddUserMutation } = usersApi;
export { usersApi };