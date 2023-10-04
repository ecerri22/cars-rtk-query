import { configureStore } from "@reduxjs/toolkit"
import { usersApi } from "./apis/usersApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { carsApi } from "./apis/carsApi"
import { clientsApi } from "./apis/clientsApi"

export const store = configureStore({
    reducer:{
        [usersApi.reducerPath]: usersApi.reducer,
        [carsApi.reducerPath]: carsApi.reducer,
        [clientsApi.reducerPath]: clientsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(carsApi.middleware)
        .concat(clientsApi.middleware)
    }
})

setupListeners(store.dispatch);

export {useFetchUsersQuery, useAddUserMutation} from "./apis/usersApi";
export {useFetchCarsQuery, useAddCarMutation, useEditCarMutation, useDeleteCarMutation} from "./apis/carsApi"
export {useFetchClientsQuery, useAddClientMutation, useEditClientMutation, useDeleteClientMutation} from "./apis/clientsApi"