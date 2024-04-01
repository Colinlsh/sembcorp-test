import React from "react";
import Footer from "./Footer2";
import Navbar from "./Navbar2";
import { Dialog } from "./Dialog";
import NewInvoice from "./NewInvoice";
// import { Modal } from "./Modal";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  // #region redux
  // const state = useAppSelector((state: RootState) => state.essentialOils);
  // const dispatch = useAppDispatch();
  // #endregion

  // const handleCloseModal = () => {
  //   dispatch(setCloseModal(false));
  // };

  // const handleYesModal = () => {
  //   dispatch(setCloseModal(false));
  // };
  // #endregion
  return (
    <div className="flex flex-col h-screen justify-between scrollbar bg-zinc-200">
      <Navbar />
      {children}
      <Footer />
      {/* {state.modal.isShow ? (
        <Modal
          header={state.modal.header}
          message={state.modal.message}
          yesCallback={state.modal.yesCallback}
          yesButtonText="ok"
        />
      ) : (
        <></>
      )} */}
      <Dialog />
      <NewInvoice />
    </div>
  );
};

export default Layout;
