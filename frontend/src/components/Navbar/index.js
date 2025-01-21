import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import loginlogo from '../../images/loginlogo.png'

import './index.css'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const navigate = useNavigate();
    const onClickLogout = () => {
        Cookies.remove('jwt_token');
        navigate('/login');

    }
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };

    return (
        <nav className="flex items-center justify-between bg-white p-3">
            <img className="ml-32 h-10 w-32" src={loginlogo} alt="Login Logo"/>
            <div className="w-1/5 hidden md:flex flex-row justify-between items-center mr-32">
                <Link className="no-underline text-[#64748B]" to="/">Home</Link>
                <Link className="no-underline text-[#64748B]" to="/book-hub">Bookshelves</Link>
                <button type="button" className='bg-[#0284C7] text-white text-sm p-2 pr-5 pl-5 rounded' onClick={onClickLogout}>Logout</button>
            </div>
      
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
                </button>
            </div>
                
            <div className={`${menuOpen ? 'block' : 'hidden'} absolute right-0 mt-10 bg-gray-800 rounded shadow-md w-48 md:hidden`}>
                <h1>da</h1>
                <h1>da</h1>
                <h1>da</h1>
            </div>
        </nav>
    )

}

export default Navbar;