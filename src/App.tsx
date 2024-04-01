import { Routes, Route } from "react-router-dom";
import DashBoard from "./page/dashboard";
import Signin from "./page/signin";
import SignUp from "./page/signup";
import Calendar from "./components/Calendar";
import Invoices from "./components/Invoices";
import Clients from "./components/Clients";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route
          path="/calendar"
          element={
            <AuthenticatedRoute>
              <Calendar />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/invoices"
          element={
            <AuthenticatedRoute>
              <Invoices />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <AuthenticatedRoute>
              <Clients />
            </AuthenticatedRoute>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
