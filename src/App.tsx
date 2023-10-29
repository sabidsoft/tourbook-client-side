import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import Header from "./components/header/Header";
import AddTour from "./pages/addTour/AddTour";
import MyTours from "./pages/myTours/MyTours";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import useInitialAuthCheck from "./hooks/useInitialAuthCheck";
import Loader from "./components/common/loader/Loader";
import SingleTour from "./pages/singleTour/SingleTour";
import EditTour from "./pages/editTour/EditTour";
import NotFound from "./pages/notFound/NotFound";
import ToursBySearch from "./pages/toursBySearch/ToursBySearch";
import ToursByTagName from "./pages/toursByTagName/ToursByTagName";
import EditProfile from "./pages/editProfile/EditProfile";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Account from "./pages/account/Account";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";

export default function App() {
  const initialAuthChecked = useInitialAuthCheck();

  return !initialAuthChecked ? (
    <Loader />
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours/search" element={<ToursBySearch />} />
        <Route path="/tours/tags" element={<ToursByTagName />} />
        <Route path="/tours/:tourId" element={<SingleTour />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/add-tour" element={<PrivateRoute><AddTour /></PrivateRoute>} />
        <Route path="/edit-tour/:tourId" element={<PrivateRoute><EditTour /></PrivateRoute>} />
        <Route path="/my-tours" element={<PrivateRoute><MyTours /></PrivateRoute>} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
