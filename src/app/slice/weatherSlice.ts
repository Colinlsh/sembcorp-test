import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Coordinates,
  ModalModel,
  WeatherApiResponse,
  WeatherArchiveDataProps,
  WeatherData,
  WeatherState,
} from "../models";
import agent from "../api/agent";

export const initialState: WeatherState = {
  modal: {
    message: "",
    header: "",
    isShow: false,
    isError: false,
    result: false,
    yesCallback: undefined,
    noCallback: undefined,
  },
  data: null,
  areaForecasts: null,
  isLoading: false,
  currentLocation: {
    name: "home",
    location: { latitude: 1.3521, longitude: 103.8198 },
    bounds: [
      [1.3521, 103.8198], // South-West corner
      [1.3541, 103.8238], // North-East corner
    ],
  },
};

// const OpenMeteoUrl = "https://api.open-meteo.com/v1/forecast";

export const openMeteoHourlyAsync = createAsyncThunk(
  "weather/openMeteoHourly",
  async (input: WeatherArchiveDataProps, { rejectWithValue }) => {
    try {
      const rawResponse = await agent.SmartWeather.getForecastByLatLng(
        input.coordinates.latitude,
        input.coordinates.longitude
      );

      // Helper function to process the raw API response
      const processedData: WeatherData = {
        latitude: rawResponse.latitude,
        longitude: rawResponse.longitude,
        hourly: {
          time: rawResponse.hourly.time,
          temperature2m: rawResponse.hourly.temperature_2m,
          relativehumidity2m: rawResponse.hourly.relativehumidity_2m,
          directRadiation: rawResponse.hourly.direct_radiation,
        },
        daily: {
          time: rawResponse.daily.time,
          temperature_2m_max: rawResponse.daily.temperature_2m_max,
          temperature_2m_min: rawResponse.daily.temperature_2m_min,
        },
      };

      // Return the processed data, which now matches the `Weather` type
      return processedData;
    } catch (error) {
      return rejectWithValue("Error getting weather data");
    }
  }
);

export const getSGAreaWeatherAsync = createAsyncThunk(
  "weather/getSGAreaWeather",
  async (_, { rejectWithValue }) => {
    try {
      const responses = await agent.SmartWeather.getAreaWeather();

      return responses;
    } catch (error) {
      return rejectWithValue("Error getting weather data");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCenter: (
      state,
      action: PayloadAction<{
        name: string;
        location: Coordinates;
        bounds: [[number, number], [number, number]];
      }>
    ) => {
      state.currentLocation = action.payload;
    },
    clearCenter: (state) => {
      state.currentLocation = {
        name: "home",
        location: { latitude: 1.3521, longitude: 103.8198 },
        bounds: [
          [1.3521, 103.8198], // South-West corner
          [1.3541, 103.8238], // North-East corner
        ],
      };
    },
    setModal: (state, action: PayloadAction<ModalModel>) => {
      state.modal = { ...state.modal, ...action.payload };
    },
    clearModal: (state) => {
      state.modal = {
        message: "",
        header: "",
        isShow: false,
        isError: false,
        result: false,
        yesCallback: undefined,
        noCallback: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        openMeteoHourlyAsync.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.isLoading = false;

          state.data = action.payload;
        }
      )
      .addCase(openMeteoHourlyAsync.rejected, (state, action) => {
        state.isLoading = false;
        const header = "Error";
        state.modal = {
          message: action.payload as string,
          header: header,
          isShow: true,
          isError: true,
          result: false,
          yesCallback: undefined,
          noCallback: undefined,
        };
      })
      .addCase(openMeteoHourlyAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getSGAreaWeatherAsync.fulfilled,
        (state, action: PayloadAction<WeatherApiResponse>) => {
          state.isLoading = false;
          // Store the payload in the new state property
          state.areaForecasts = action.payload;
        }
      )
      .addCase(getSGAreaWeatherAsync.rejected, (state, action) => {
        state.isLoading = false;
        const header = "Error";
        state.modal = {
          message: action.payload as string,
          header: header,
          isShow: true,
          isError: true,
          result: false,
          yesCallback: undefined,
          noCallback: undefined,
        };
      })
      .addCase(getSGAreaWeatherAsync.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { setModal, clearModal, setCenter, clearCenter } =
  weatherSlice.actions;

export default weatherSlice.reducer;
