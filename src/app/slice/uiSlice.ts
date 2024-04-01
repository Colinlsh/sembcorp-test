import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalModel, NewInvoiceUIModel, UIState } from "../models";

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
  new_invoice_modal: {
    isShow: false,
    new_invoice: {
      customer: "",
      email: "",
      dueDate: "",
      issueDate: "",
      items: [],
      status: "",
      invoiceNumber: "",
      date: "",
      total: 0,
    },
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsShowNewInvoiceModal: (state, action: PayloadAction<boolean>) => {
      state.new_invoice_modal.isShow = action.payload;
    },
    setNewInvoiceModal: (state, action: PayloadAction<NewInvoiceUIModel>) => {
      state.new_invoice_modal = {
        ...state.new_invoice_modal,
        ...action.payload,
      };
    },
    clearInvoiceModal: (state) => {
      state.new_invoice_modal = {
        isShow: false,
        new_invoice: {
          customer: "",
          email: "",
          dueDate: "",
          issueDate: "",
          items: [],
          status: "",
          invoiceNumber: "",
          date: "",
          total: 0,
        },
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
});

export const {
  setModal,
  clearModal,
  setIsShowNewInvoiceModal,
  setNewInvoiceModal,
  clearInvoiceModal,
} = uiSlice.actions;

export default uiSlice.reducer;
