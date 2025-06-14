import React from "react";
// import { useAppDispatch } from "../../app/hooks";
// import { setCloseModal } from "../../app/slice/essentialOilsSlice";

interface ModalProps {
  header: string;
  message: string;
  yesButtonText?: string;
  noButtonText?: string;
  yesCallback?: () => void;
  noCallback?: () => void;
}

/*
{
  header,
  message,
  yesCallback,
  noCallback,
  yesButtonText = "Yes",
  noButtonText = "No",
}
*/

export const Modal: React.FC<ModalProps> = () => {
  // #region redux
  // const dispatch = useAppDispatch();
  // #endregion

  return (
    // <div onClick={() => dispatch(setCloseModal(true))}>
    //   <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
    //     <div className="relative w-auto my-6 mx-auto max-w-3xl">
    //       {/*content*/}
    //       <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
    //         {/*header*/}
    //         <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
    //           <h3 className="text-3xl font-semibold">{header}</h3>
    //           <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
    //             <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
    //               ×
    //             </span>
    //           </button>
    //         </div>
    //         {/*body*/}
    //         <div className="relative p-6 flex-auto">
    //           <p className="my-4 text-slate-500 text-lg leading-relaxed">
    //             {message}
    //           </p>
    //         </div>
    //         {/*footer*/}
    //         <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
    //           {noCallback === undefined ? (
    //             <></>
    //           ) : (
    //             <button
    //               className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    //               type="button"
    //               onClick={
    //                 noCallback !== undefined
    //                   ? noCallback
    //                   : () => dispatch(setCloseModal(true))
    //               }
    //             >
    //               {noButtonText}
    //             </button>
    //           )}
    //           <button
    //             className="text-black bg-green-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    //             type="button"
    //             onClick={
    //               yesCallback !== undefined
    //                 ? yesCallback
    //                 : () => dispatch(setCloseModal(true))
    //             }
    //           >
    //             {yesButtonText}
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    // </div>
    <></>
  );
};
