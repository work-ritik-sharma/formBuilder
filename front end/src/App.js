import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddForm from './pages/AddForm/AddForm';
import EditForm from './pages/EditForm/EditForm';
import ViewForm from './pages/View/ViewForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddForm />} />
          <Route path="/edit/:id" element={<EditForm />} />\
          <Route path="/view/:id" element={<ViewForm />} />\
        </Routes>
      </Router>
    </div>
  );
}

export default App;
