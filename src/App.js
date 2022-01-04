import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/createpage/createpage.component";
import HomePage from "./pages/homepage/homepage.component";
import "./App.css";
function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/create" element={<CreatePage />} exact />
        <Route path="/edit/:id" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
