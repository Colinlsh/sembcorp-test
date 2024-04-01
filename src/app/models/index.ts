// import * as FirebaseFirestore from "firebase/firestore";

export interface KeyValuePair {
  name: string;
  value: unknown[];
}

export interface MainState {
  oils: oilUIModel[];
  rainbows: rainbowModel[];
  modal: ModalModel;
  checkResponse: checkRainbowModelResponse;
  selectedOil: oilModel;
  selectedRainbowOils: oilUIModel[];
  history: RainbowHistoryModel[] | null;
  loading: boolean;
  error: string | null;
}

export interface UIState {
  modal: ModalModel;
  new_invoice_modal: NewInvoiceUIModel;
}

export interface NewInvoiceUIModel extends ModalModel {
  new_invoice: NewInvoiceModel;
}

export interface NewInvoiceModel {
  invoiceNumber: string;
  customer: string;
  email: string;
  date: string;
  dueDate: string;
  issueDate: string;
  items: InvoiceItemModel[];
  total: number;
  status: string;
}

export interface InvoiceItemModel {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface rainbowModel {
  id: string;
  cid: string;
  symptoms: string[];
  csymptoms: string[];
  essential_oils: essentialoilListModel;
}

export interface oilModel {
  id: string;
  name: string;
  cname: string;
  ingredients: string[];
  cingredients: string[];
  origin: string;
  corigin: string;
  traits: string;
  ctraits: string;
  body: string[];
  mental: string[];
  skin: string[];
  imageURL: string;
}

export interface essentialoilListModel {
  main: string[];
  additional: additionalModel[];
}

export interface additionalModel {
  id: string[];
  oils: string[];
}

export interface ModalModel {
  message?: string;
  header?: string;
  isShow?: boolean;
  isError?: boolean;
  result?: boolean;
  yesCallback?: () => void;
  noCallback?: () => void;
}

export interface checkRainbowModel {
  codes: string[];
}

export interface checkRainbowModelResponse {
  oils: oilModel[];
  symptoms: rainbowModel[];
  isLoading: boolean;
}

export interface oilUIModel extends oilModel {
  isDisabled: boolean;
}

export interface selectedOilsModel {
  oils: oilModel[];
  symptoms: rainbowModel[];
}

export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface RainbowHistoryModel {
  checkedRainbows: selectedOilsModel;
  datetime: FirestoreTimestamp;
}

export interface UserRegistration {
  email: string;
  password: string;
}
