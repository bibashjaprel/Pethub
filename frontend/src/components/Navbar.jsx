import React, { useEffect } from 'react';
import './Navbar.css';
import { FaRegUserCircle } from "react-icons/fa";

const logo = 'https://cdn.pixabay.com/photo/2023/08/18/15/02/cat-8198720_1280.jpg'
const Header = () => {

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById("navbar");
            const sticky = navbar.offsetTop;

            if (window.scrollY >= sticky) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header id="navbar">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Adopt or Get Involved</a></li>
                        <li><a href="#">Dogs & Puppies</a></li>
                        <li><a href="#">Cats & Kittens</a></li>
                        <li><a href="#">Other Types of Pets</a></li>
                    </ul>
                </nav>
                <div className="header-right">
                    <FaRegUserCircle size={30} color="#fff" />
                </div>
            </div>
        </header>
    );
};

export default Header;
