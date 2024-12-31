import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddressFrom from "./AddressForm/AddressForm";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <nav className="p-4">
          <Link to="/address">Address Form</Link>
        </nav>
        <Routes>
          <Route path="/address" element={<AddressFrom />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;