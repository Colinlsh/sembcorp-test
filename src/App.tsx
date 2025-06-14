import { Routes, Route } from "react-router-dom";
import LocationPage from "./page/location";
// import { useAppSelector } from "./app/hooks";

function App() {
  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LocationPage />} />
        {/* <Route path="/signin" element={<Signin />} /> */}
      </Routes>
    </div>
  );
}

export default App;
