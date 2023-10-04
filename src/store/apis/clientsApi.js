import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const clientsApi = createApi({
    reducerPath: "clients",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001" 
    }),
    endpoints(builder) {
        return {
            fetchClients: builder.query({
                providesTags: (results, error, user) => {
                    return [{type: "Client", id: user.id}]
                },
                query: (user) => {
                    return {
                        method: "GET",
                        url: "/clients",
                        params: {
                            userId: user.id
                        }
                    }
                }
            }),

            addClient: builder.mutation({
                invalidatesTags: (results, error, user) => {
                    return [{type: "Client", id: user.id}]
                },
                query: ({user, client}) => {
                    return {
                        method: "POST",
                        url: "/clients",
                        body: {
                            name: client.name,
                            phone: client.phone,
                            address: client.address,
                            userId: user.id
                        }
                    }
                }
            }),
             
            editClient: builder.mutation({
                invalidatesTags: (results, error, client) => {
                    return [{type: 'Client', id: client.userId}]
                },
                query: ({user, client}) => {
                    return {
                        method: "PUT",
                        url: `/clients/${client.id}`,
                        body: {
                            name: client.name,
                            phone: client.phone,
                            address: client.address,
                            userId: user.id
                        }
                    }
                }
            }),
            
            deleteClient: builder.mutation({
                invalidatesTags: (results, error, client) => {
                    return [{type: 'Client', id: client.userId}]
                },
                query: (client) => {
                    return {
                        method: "DELETE",
                        url: `clients/${client.id}`,
                    }
                }
            })
        }
    }
})

export const {useFetchClientsQuery, useAddClientMutation, useEditClientMutation,  useDeleteClientMutation} = clientsApi;
export { clientsApi };