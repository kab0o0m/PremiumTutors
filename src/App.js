import "./App.css";
import ClientProfile from "./Components/ClientProfile/ClientProfile";
import TutorProfile from "./Components/TutorProfile/TutorProfile";
import Navbar from "./Components/Navbar/Navbar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/PremiumTutors/" element={<ClientProfile />} />
          <Route path="/PremiumTutors/tutor" element={<TutorProfile />} />
          {/* <Route path="/PremiumTutors/gpt" element={<Chatgpt />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
