import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
//slices ----
import { loginUserSlice } from "./slices/loginUserSlice";
import { signupUserSlice } from "./slices/signupUserSlice";



// Configure persist
const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

//combine all reducers  -------
const reducer = combineReducers({
    loginUser: loginUserSlice.reducer,
    signupUser: signupUserSlice.reducer,

})


// Persist the combined reducers
const persistedReducer = persistReducer(persistConfig, reducer);


//configure the store 
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

//export the persistor 
export const persistor = persistStore(store);


export default store;