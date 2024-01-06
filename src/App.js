import "./App.css";
import ClientProfile from "./Components/ClientProfile/ClientProfile";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/PremiumTutors/" element={<ClientProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
