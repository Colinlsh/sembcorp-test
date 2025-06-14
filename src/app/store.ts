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
import weatherReducer, {
  initialState as weatherInitialState,
} from "./slice/weatherSlice";
import { WeatherState } from "./models/index";

type StateV4 = PersistedState & {
  weather?: WeatherState;
};

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
      weather: weatherInitialState, // Add the entire initial state for the weather slice
    } as PersistedState;
  },
  4: (state: StateV4 | undefined) => {
    // This migration only targets the 'weather' slice of the persisted state.
    // We check if it exists to be safe.
    if (state && state.weather) {
      return {
        ...state,
        weather: {
          ...state.weather,
          data: null, // Reset 'data' from an array `[]` to `null`
        },
      } as PersistedState;
    }
  },
};

const persistConfig = {
  key: "root",
  version: 5,
  storage,
  whitelist: ["auth", "weather"], // only auth will be persisted
  migrations: createMigrate(migrations, { debug: true }),
};
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  weather: weatherReducer,
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
