import React, { Fragment } from "react";
import { Dialog as DL, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { setModal } from "../app/slice/uiSlice";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Dialog = () => {
  const state = useAppSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatch();

  function closeModal() {
    dispatch(setModal({ isShow: false, message: "", header: "" }));
  }

  return (
    <>
      <Transition appear show={state.modal.isShow} as={Fragment}>
        <DL as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-full min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DL.Panel className="w-full h-fit flex flex-col justify-between space-y-5 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DL.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    {state.modal.header}
                  </DL.Title>
                  <div className="mt-2 text-center">
                    <p className="text-sm text-gray-500">
                      {state.modal.message}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={
                        state.modal.yesCallback !== undefined
                          ? state.modal.yesCallback
                          : closeModal
                      }
                    >
                      Ok
                    </button>
                    {state.modal.noCallback !== undefined ? (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        No
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </DL.Panel>
              </Transition.Child>
            </div>
          </div>
        </DL>
      </Transition>
    </>
  );
};
