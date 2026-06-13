import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import UploadPage from "./pages/UploadPage";
import RecordingsPage from "./pages/RecordingsPage";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<RecordingsPage />}
        />

        <Route
          path="/upload"
          element={<UploadPage />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;