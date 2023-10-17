import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import About from "./About";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;