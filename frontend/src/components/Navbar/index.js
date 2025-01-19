import {useState} from 'react'

import loginlogo from '../../images/loginlogo.png'

import './index.css'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };

    return (
        <nav className="flex items-center justify-between bg-white p-3">
            <img className="ml-32 h-10 w-32" src={loginlogo} alt="Login Logo"/>
            <div className="hidden md:flex flex-row justify-around mr-32">
                <h1>dw</h1>
                <h1>dw</h1>
                <h1>dw</h1>
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