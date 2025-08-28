import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/user.js'


export const store = configureStore({
    reducer: {user: userReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})