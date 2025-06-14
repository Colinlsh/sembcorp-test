import { AsyncThunk } from "@reduxjs/toolkit";

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, never>;

export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
