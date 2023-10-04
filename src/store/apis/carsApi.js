import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const carsApi = createApi({
    reducerPath: "cars",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    endpoints(builder) {
        return {
            fetchCars: builder.query({
                providesTags: (results, error, user) => {
                    return [{ type: 'Car', id: user.id }];
                },
                query: (user) => {
                    return {
                        method: "GET",
                        url: "/cars",
                        params: {
                            userId: user.id
                        }
                    }
                }
            }),

            addCar: builder.mutation({
                invalidatesTags: (results, error, user) => {
                    return [{type:'Car', id: user.id}]
                },
                query: ({user, car}) => {
                    return {
                        method: "POST",
                        url: "/cars",
                        body: {
                            name: car.name,
                            userId: user.id,
                            cost: car.cost
                        }
                    }
                }
            }),

            editCar: builder.mutation({
                invalidatesTags: (results, error, car) => {
                    return [{type: 'Car', id: car.userId}]
                },
                query: ({user, car}) => {
                    return {
                        method: "PUT",
                        url: `/cars/${car.id}`,
                        body: {
                            name: car.name,
                            userId: user.id,
                            cost: car.cost
                        }
                    }
                }
            }),

            deleteCar: builder.mutation({
                invalidatesTags: (results, error, car) => {
                    return [{type: 'Car', id: car.userId}]
                },
                query: (car) => {
                    return {
                        method: "DELETE",
                        url: `/cars/${car.id}`
                    }
                }
            })
        }
    }
})

export const { useFetchCarsQuery, useAddCarMutation, useEditCarMutation, useDeleteCarMutation} = carsApi;
export {carsApi}