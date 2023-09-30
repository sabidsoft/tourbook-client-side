import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenu } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import logo from "../../assets/images/hero-logo-overlay.png";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { userLoggedOut } from "../../redux/features/auth/authSlice";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // handling logout
    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
        navigate("/signin");
    }

    return (
        <nav>
            {/* Desktop Navigation */}
            <div className="bg-[#F3F4F6]">
                <div className="w-[100%] sm:w-[80%] mx-auto hidden sm:flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="logo"
                            width={48}
                            height={48}
                        />
                        <p className="logo_text text-[#404756] font-bold text-2xl ml-2">Tourbook</p>
                    </Link>

                    {
                        user ? (
                            <div>
                                <Link
                                    to='/'
                                    className="text-[#404756] font-medium text-lg mr-8"
                                >
                                    Home
                                </Link>
                                <Link
                                    to='/add-tour'
                                    className="text-[#404756] font-medium text-lg mr-8"
                                >
                                    Add Tour
                                </Link>
                                <Link
                                    to='/dashboard'
                                    className="text-[#404756] font-medium text-lg mr-8"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-[#404756] font-medium text-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div>
                                <Link
                                    to='/'
                                    className="text-[#404756] font-medium text-lg mr-8"
                                >
                                    Home
                                </Link>
                                <Link
                                    to='/signin'
                                    className="text-[#404756] font-medium text-lg"
                                >
                                    Login
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden bg-[#F3F4F6]">
                <div className="flex justify-between items-center px-4 py-4">
                    <Link to='/' className="flex items-center">
                        <img
                            src={logo}
                            alt="logo"
                            width={30}
                            height={30}
                        />
                        <p className="logo_text text-[#404756] font-bold text-2xl ml-2">Tourbook</p>
                    </Link>

                    {isMenuOpen ? (
                        <RxCross2
                            size={30}
                            color="#404756"
                            cursor='pointer'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                        />
                    ) : (
                        <BiMenu
                            size={30}
                            color="#404756"
                            cursor='pointer'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                        />
                    )}
                </div>

                {
                    user ? (
                        <div className={`${isMenuOpen ? 'flex flex-col mt-4' : 'hidden'}`}>
                            <Link
                                to='/'
                                onClick={() => setIsMenuOpen((prevState) => !prevState)}
                                className="text-[#404756] font-medium text-lg text-center py-3 hover:bg-slate-500 duration-300"
                            >
                                Home
                            </Link>
                            <Link
                                to='/add-tour'
                                onClick={() => setIsMenuOpen((prevState) => !prevState)}
                                className="text-[#404756] font-medium text-lg text-center py-3 hover:bg-slate-500 duration-300"
                            >
                                Add Tour
                            </Link>
                            <Link
                                to='/dashboard'
                                onClick={() => setIsMenuOpen((prevState) => !prevState)}
                                className="text-[#404756] font-medium text-lg text-center py-3 hover:bg-slate-500 duration-300"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className="text-[#404756] font-medium text-lg text-center py-3 hover:bg-slate-500 duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className={`${isMenuOpen ? 'flex flex-col mt-4' : 'hidden'}`}>
                            <Link
                                to='/'
                                onClick={() => setIsMenuOpen((prevState) => !prevState)}
                                className="text-[#404756] font-medium text-lg text-center py-3 hover:bg-slate-500 duration-300"
                            >
                                Home
                            </Link>
                            <Link
                                to='/signin'
                                onClick={() => setIsMenuOpen((prevState) => !prevState)}
                                className="text-[#404756] font-medium text-lg text-center py-3 hover:bg-slate-500 duration-300"
                            >
                                Login
                            </Link>
                        </div>
                    )
                }
            </div>
        </nav>
    );
};