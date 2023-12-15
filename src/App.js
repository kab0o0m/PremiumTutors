import "./App.css";
import Convert from "./Components/Convert/Convert";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/PremiumTutors/" element={<Convert />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
