"use client"
import Footer from "./Footer";
import Navbar2 from "./Navbar2";

const UserWrapper = ({ children, noFooter, popup, className }) => {
    return (
        <div className={`user-wrapper ${className}`}>
            <Navbar2 />
            {children}
            {!noFooter && <Footer />}
            {popup}
        </div>
    );
};

export default UserWrapper;
