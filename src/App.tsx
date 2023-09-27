import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import AddTour from "./pages/AddTour";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import useInitialAuthCheck from "./hooks/useInitialAuthCheck";
import Loader from "./components/Loader";

export default function App() {
  const initialAuthChecked = useInitialAuthCheck();

  return !initialAuthChecked ? (
    <Loader />
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/add-tour" element={<PrivateRoute><AddTour /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  )
}
