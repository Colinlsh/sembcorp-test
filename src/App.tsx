import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./page/dashboard";
import Signin from "./page/signin";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import SetWiFi from "./page/setwifi";
import { useAppSelector } from "./app/hooks";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signin />}
        />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route
          path="/setwifi"
          element={
            <AuthenticatedRoute>
              <SetWiFi />
            </AuthenticatedRoute>
          }
        />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
