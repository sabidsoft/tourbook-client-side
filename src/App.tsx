import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import Header from "./components/header/Header";
import AddTour from "./pages/addTour/AddTour";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import useInitialAuthCheck from "./hooks/useInitialAuthCheck";
import Loader from "./components/common/loader/Loader";
import SingleTour from "./pages/singleTour/SingleTour";

export default function App() {
  const initialAuthChecked = useInitialAuthCheck();

  return !initialAuthChecked ? (
    <Loader />
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours/:tourId" element={<SingleTour />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/add-tour" element={<PrivateRoute><AddTour /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  )
}
