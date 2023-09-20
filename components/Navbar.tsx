/* eslint-disable @next/next/no-img-element */
import NavbarItem from "./Navbaritem";
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';
import MobileMenu from "./MobileMenu";
import { useState, useCallback, useEffect } from 'react';
import AccountMenu from './AccountMenu';

const TOP_OFFSET = 66;

const Navbar = () => {
const [showMobileMenu, setShowMobileMenu] = useState(false);
const [showAccountMenu, setShowAccountMenu] = useState(false);
const [showBackground, setShowBackground] = useState(false);

useEffect(()=>{
    const handleScroll=()=>{
        if(window.scrollY>= TOP_OFFSET){
            setShowBackground(true);
        } else {
            setShowBackground(false);
        }
    }
    window.addEventListener('scroll',handleScroll);

    return () => {
    window.removeEventListener('scroll',handleScroll);
    }
},[]);

const toggleMobileMenu = useCallback(()=> {
    setShowMobileMenu((current) => !current);
},[]);
const toggleAccountMenu = useCallback(()=> {
    setShowAccountMenu((current) => !current);
},[]);

    return (
        <nav className="w-full fixed z-40">
            <div className={`
                px-4
                md:px-16
                py-6
                flex
                flex-flow
                items-center
                transition
                duration-500
                ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
                `}><a href="#">
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" /></a>
                <div className="
                    flex-row
                    ml-8
                    gap-7
                    hidden
                    lg:flex
                    ">
                        <a href="#"><NavbarItem label="Home" /></a>
                        <NavbarItem label="Series" />
                        <NavbarItem label="Films" />
                        <NavbarItem label="New & Popular" />
                        <NavbarItem label="My List" />
                        <NavbarItem label="Browse by languages" />
                </div>
                        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                        <p className="text-white text-sm">Browse</p>
                        <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180':'rotate-0'}`} />
                        <MobileMenu visible={showMobileMenu}/>
                        </div>
                        <div className="flex flex-row ml-auto gap-7 items-center">
                            <div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
                                <BsSearch/>
                            </div>
                            <div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
                                <BsBell/>
                            </div>

                            <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                                <div className="w-6 h-6 lg:w-9 lg:h-9 rounded-xl overflow-hidden">
                                    <img src="/images/default-blue.png" alt="Profiles"/>
                                </div> <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180':'rotate-0'}`}/>
                                <AccountMenu visible={showAccountMenu} />
                            </div>

                        </div>
            </div>
        </nav>
    )
}
export default Navbar;
