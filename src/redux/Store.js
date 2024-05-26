
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { persistStore } from 'redux-persist';

import userReducer from './slice/User'; // Make sure the path and import name are correct

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['userName', 'allProducts', 'cartData','user'], // You can choose which slices of the state to persist
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        userDetail: persistedReducer,
        // If you had more reducers, you'd add them here like so:
        // cartDetails: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);



// setup without persistance
// import { configureStore } from "@reduxjs/toolkit";

// // here we are importing the default module from given root 
// // which dont have any explicit name we can use it as per our convinience

// import userReducer from "./slice/User";  // Make sure the path and import name are correct
// // import cartReducer from "./slice/Cart"

// export const store = configureStore({
//     reducer: {
//         userDetail: userReducer,  // This should match the exported default from your slice file
//         // cartDetails:cartReducer
//     },
// });
