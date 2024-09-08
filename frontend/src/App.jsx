import Home from "./pages/Home"
import ContactUs from "./pages/ContactUs";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs/>}/>
        </Routes>
    </Router>
  );
}

export default App
