import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ConnectedNetworkModel,
  ModalModel,
  UIState,
  WiFiConnectionsModel,
  WiFiFormModel,
} from "../models";
import agent from "../api/agent";
import { RootState } from "../store";
import { AxiosError } from "axios";
import { clearUser } from "./authSlice";
import { handleAxiosError } from "../utils/common";

const initialState: UIState = {
  modal: {
    message: "",
    header: "",
    isShow: false,
    isError: false,
    result: false,
    yesCallback: undefined,
    noCallback: undefined,
  },
  wifiModel: {
    ssid_list: [],
    status: "",
    is_network_changing: false,
    wifiForm: {
      ssid: "",
      password: "",
      isLoading: false,
      isTimeoutSuccess: false,
    },
    connected_network: {
      Active: false,
      SSID: "",
      Mode: "",
      Channel: "",
      Rate: "",
      Signal: "",
      Bars: "",
      Security: "",
      IsLoading: false,
    },
  },
};

export const postWiFiFormAsync = createAsyncThunk(
  "ui/postWiFiFormAsync",
  async (form: WiFiFormModel, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const response = await agent.SmartWater.setWiFi(
        {
          ssid: form.ssid,
          password: form.password,
        },
        state.auth.user!.tokens.access,
        5000
      );
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.message == "timeout of 5000ms exceeded") {
          return rejectWithValue(
            "Successfully connected to WiFi, please connect to selected network and refresh page"
          );
        }
      }
      return rejectWithValue("Error setting WiFi form");
    }
  }
);

export const getScanWiFiAsync = createAsyncThunk<
  object,
  object,
  {
    rejectValue: string;
  }
>("ui/getScanWiFiAsync", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const response = await agent.SmartWater.scanForWifi(
      state.auth.user!.tokens.access
    );
    return response;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error, "Error scanning for wifi"));
  }
});

export const checkWiFiConnectionAsync = createAsyncThunk<
  object,
  object,
  {
    rejectValue: string;
  }
>(
  "ui/checkWiFiConnectionAsync",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as RootState;
      if (state.auth.user!.tokens === null) {
        dispatch(clearWiFiConnection());
        return rejectWithValue("Please sign in.");
      }
      const response = await agent.SmartWater.checkWiFiConnection(
        state.auth.user!.tokens.access
      );
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(clearUser());
          return rejectWithValue("UnAuthorized, please sign in again");
        }
      }
      return rejectWithValue("Error setting wifi form");
    }
  }
);

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setWiFiForm: (state, action: PayloadAction<object>) => {
      state.wifiModel.wifiForm = {
        ...state.wifiModel.wifiForm,
        ...action.payload,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearWiFiForm: (state, _) => {
      state.wifiModel.wifiForm = {
        ssid: "",
        password: "",
        isLoading: false,
        isTimeoutSuccess: false,
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
    setNetworkChainging: (state, action: PayloadAction<boolean>) => {
      state.wifiModel.is_network_changing = action.payload;
    },
    clearWiFiConnection: (state) => {
      state.wifiModel.connected_network = {
        Active: false,
        SSID: "",
        Mode: "",
        Channel: "",
        Rate: "",
        Signal: "",
        Bars: "",
        Security: "",
        IsLoading: false,
      };
    },
    setWiFiFormIsTimeoutSuccess: (state, action: PayloadAction<boolean>) => {
      state.wifiModel.wifiForm.isTimeoutSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postWiFiFormAsync.fulfilled, (state) => {
        state.wifiModel.wifiForm.isLoading = false;
        state.modal = {
          message:
            "Successfully connected to WiFi, please connect to selected network and refresh page",
          header: "Success",
          isShow: true,
          isError: false,
          result: true,
          yesCallback: undefined,
          noCallback: undefined,
        };
      })
      .addCase(postWiFiFormAsync.rejected, (state, action) => {
        state.wifiModel.wifiForm.isLoading = false;
        let header = "Error";
        if (
          "Successfully connected to WiFi, please connect to selected network and refresh page" ==
          action.payload
        ) {
          header = "Success";
          state.wifiModel.wifiForm.isTimeoutSuccess = true;
        }
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
      .addCase(postWiFiFormAsync.pending, (state) => {
        state.wifiModel.wifiForm.isLoading = true;
      });

    builder
      .addCase(getScanWiFiAsync.fulfilled, (state, action) => {
        state.wifiModel.ssid_list = action.payload as WiFiConnectionsModel[];
      })
      .addCase(getScanWiFiAsync.rejected, (state, action) => {
        state.modal = {
          message: action.payload as string,
          header: "Error",
          isShow: true,
          isError: true,
          result: false,
          yesCallback: undefined,
          noCallback: undefined,
        };
      });

    builder
      .addCase(checkWiFiConnectionAsync.fulfilled, (state, action) => {
        state.wifiModel.connected_network.IsLoading = false;
        state.wifiModel.connected_network =
          action.payload as ConnectedNetworkModel;
      })
      .addCase(checkWiFiConnectionAsync.rejected, (state) => {
        state.wifiModel.connected_network.IsLoading = false;
        state.wifiModel.connected_network = {
          Active: false,
          SSID: "",
          Mode: "",
          Channel: "",
          Rate: "",
          Signal: "",
          Bars: "",
          Security: "",
          IsLoading: false,
        };
        state.modal = {
          message: "",
          header: "",
          isShow: false,
          isError: false,
          result: false,
          yesCallback: undefined,
          noCallback: undefined,
        };
      })
      .addCase(checkWiFiConnectionAsync.pending, (state) => {
        state.wifiModel.connected_network.IsLoading = true;
      });
  },
});

export const {
  setModal,
  clearModal,
  setWiFiForm,
  clearWiFiForm,
  setNetworkChainging,
  clearWiFiConnection,
  setWiFiFormIsTimeoutSuccess,
} = uiSlice.actions;

export default uiSlice.reducer;
