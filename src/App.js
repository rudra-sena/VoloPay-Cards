import NavBar from "./NavBar/NavBar";
import AllCards from "./Routes/AllCards/AllCards";
import YourCards from "./Routes/YourCards/YourCards";
import BlockedCards from "./Routes/BlockedCards/BlockedCards";
import NotFound from "./Routes/NotFound/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<AllCards />} />
          <Route path="/your-cards" element={<YourCards />} />
          <Route path="/blocked-cards" element={<BlockedCards />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
