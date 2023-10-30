import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenu } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import logo from "../../assets/images/logo_toorbook.png";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { userLoggedOut } from "../../redux/features/auth/authSlice";

const mobileNavigationMenuClassName =
    "text-[#267CB5] font-medium text-lg text-center py-3 hover:bg-slate-500 d duration-300";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useAppSelector(state => state.auth.user);

    // handling logout
    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
        navigate("/signin");
    };

    return (
        <nav className="sticky top-0 z-50 shadow bg-[#fff]">
            {/* Desktop Navigation */}
            <div >
                <div className="w-[100%] md:w-[80%] mx-auto hidden md:flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="Brand_Logo"
                            width={36}
                            height={36}
                        />
                        <p className="text-[#267CB5] font-bold text-3xl ml-2">Tourbook</p>
                    </Link>

                    {user ? (
                        <div>
                            <Link to='/' className="text-[#267CB5] font-medium text-lg mr-5">Home</Link>
                            <Link to='/add-tour' className="text-[#267CB5] font-medium text-lg mr-5">Add Tour</Link>
                            <Link to='/my-tours' className="text-[#267CB5] font-medium text-lg mr-5">My Tours</Link>
                            <Link to='/account' className="text-[#267CB5] font-medium text-lg mr-5">Account</Link>
                            <button onClick={logout} className="text-[#267CB5] font-medium text-lg">Logout</button>
                        </div>
                    ) : (
                        <div>
                            <Link to='/' className="text-[#267CB5] font-medium text-lg mr-5">Home</Link>
                            <Link to='/signin' className="text-[#267CB5] font-medium text-lg">Login</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden bg-[#F3F4F6]">
                <div className="flex justify-between items-center px-4 py-4">
                    <Link to='/' className="flex items-center">
                        <img
                            src={logo}
                            alt="Brand_Logo"
                            width={36}
                            height={36}
                        />
                        <p className="text-[#267CB5] font-bold text-3xl ml-2">Tourbook</p>
                    </Link>

                    {isMenuOpen ? (
                        <RxCross2
                            size={30}
                            color="#267CB5"
                            cursor='pointer'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                        />
                    ) : (
                        <BiMenu
                            size={30}
                            color="#267CB5"
                            cursor='pointer'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                        />
                    )}
                </div>

                {user ? (
                    <div className={`${isMenuOpen ? 'flex flex-col mt-4' : 'hidden'}`}>
                        <Link
                            to='/'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            Home
                        </Link>

                        <Link
                            to='/add-tour'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            Add Tour
                        </Link>

                        <Link
                            to='/my-tours'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            My Tours
                        </Link>

                        <Link
                            to='/account'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            Account
                        </Link>

                        <button
                            onClick={logout}
                            className={mobileNavigationMenuClassName}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className={`${isMenuOpen ? 'flex flex-col mt-4' : 'hidden'}`}>
                        <Link
                            to='/'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            Home
                        </Link>
                        <Link
                            to='/signin'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};