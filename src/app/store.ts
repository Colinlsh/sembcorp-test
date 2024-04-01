import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  MigrationManifest,
  createMigrate,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/authSlice";
import uiReducer from "./slice/uiSlice";

// // Assuming this is the shape of your persisted state
// interface NewPersistedState1 {
//   essentialOils?: {
//     // Optional because it might not exist in earlier versions
//     // ... structure of essentialOils
//     history?: RainbowHistoryModel[];
//   };
//   // ... other slices of your state that are persisted
//   _persist: PersistState;
// }

const migrations: MigrationManifest = {
  0: (state) => {
    // Initial migration logic, if needed
    return state;
  },
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"], // only auth will be persisted
  migrations: createMigrate(migrations, { debug: false }),
};
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
