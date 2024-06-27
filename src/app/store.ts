import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  MigrationManifest,
  PersistedState,
  createMigrate,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/authSlice";
import uiReducer from "./slice/uiSlice";

const migrations: MigrationManifest = {
  0: (state) => {
    // Initial migration logic, if needed
    return state;
  },
  1: (state) => {
    // Migration logic for version 1
    return {
      ...state,
      // Add new keys for each slice that you want to persist
      auth: {
        user: {
          username: String,
          password: String,
          tokens: {
            access: String,
            refresh: String,
          },
        },
      },
    } as PersistedState;
  },
  2: (state) => {
    return {
      ...state,
      ui: {
        wifiModel: {
          ssid_list: Array,
          status: String,
          is_network_changing: Boolean,
          wifiForm: {
            ssid: String,
            password: String,
          },
          connected_network: {
            Active: Boolean,
            SSID: String,
            Mode: String,
            Channel: String,
            Rate: String,
            Signal: String,
            Bars: String,
            Security: String,
            IsLoading: Boolean,
          },
        },
      },
    } as PersistedState;
  },
};

const persistConfig = {
  key: "root",
  version: 2,
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
