"use client";
import React, { use, useEffect, useState } from "react";
import {
    Search,
    User,
    ShoppingCart,
    Menu,
    X,
    MapPin,
    Phone,
    Facebook,
    Twitter,
    Instagram,
    MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import themeConfig from "@/app/configs/themeConfig";
import { useUserData } from "@/app/hooks/useData";
import { isAuthenticated } from "@/app/redux/user/api/axiosBaseQuery";
import OptionsMenu from "../../option-menu";
import CustomAvatar from "../../avatar";
import { getInitials } from "@/app/utils/get-initials";
import IconifyIcon from "../../icon";
import { useDispatch } from "react-redux";
import { desktopOptions } from "../home/Components/data";
// import UserDropdown from "./UserDropdown";

export default function Navbar2() {
    const searchParams = useSearchParams()
    const search = searchParams.get("search")
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(search || "");
    const { cartItemCount, } = useCart()
    const dispatch = useDispatch()
    const { userInfo } = useUserData()
    const offline = !isAuthenticated()
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        setSearchQuery(search);
    }, [search]);

    const pathname = usePathname();
    const getPath = pathname.split("/");
    const UserPages = {
        offline: [
            { title: 'Home', link: '' },
            { title: 'About', link: 'about' },
            { title: 'Explore', link: 'explore' },
            { title: 'Seller', link: 'seller' },
            { title: 'Support', link: 'support' },
        ],
        online: [
            { title: 'Home', link: '' },
            { title: 'Orders', link: 'order' },
            { title: 'Inbox', link: 'chat' },
            { title: 'Earn', link: 'referral' },
            { title: 'Account', link: 'user' },
        ],
    }

    const menu = UserPages[offline ? "offline" : "online"]
    return (
        <div className="sticky -top-px z-50">
            {/* Top Bar */}
            <div className="bg-brand-500 text-brand-200 px-4 py-2">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
                    {/* Social Icons */}
                    <div className="flex items-center space-x-3">
                        <Facebook className="w-4 h-4 hover:text-brand-200 cursor-pointer" />
                        <Twitter className="w-4 h-4 hover:text-brand-200 cursor-pointer" />
                        <Instagram className="w-4 h-4 hover:text-brand-200 cursor-pointer" />
                        <MessageCircle className="w-4 h-4 hover:text-brand-200 cursor-pointer" />
                    </div>

                    {/* Contact Info */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>Store Location</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>+234 (901) 234 5678</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-white shadow-sm ">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <img
                                src={themeConfig.vertical1}
                                className=" w-32 md:w-44"
                            />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-6">
                            {menu.map((each, i) => (
                                <a
                                    href={`/${each.link}`}
                                    key={i}
                                    className={`${getPath[1] !== each.link
                                        ? "text-gray-700"
                                        : "text-brand-500"
                                        } hover:text-brand-600 font-normal text-sm`}
                                >
                                    {each.title}
                                </a>
                            ))}
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex items-center h-10 flex-1 max-w-sm mx-8 bg-gray-100 rounded-md">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            window.location.href = `/products?search=${searchQuery}`;
                                        }
                                    }}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search Product"
                                    className="w-full pl-4 pr-10 py-2.5 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-transparent"
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex items-center space-x-4">
                            {/* Search Icon - Mobile */}
                            <Link href="/search" className="hidden p-2 text-gray-600 hover:text-brand-600">
                                <Search className="w-5 h-5" />
                            </Link>
                            {/* Account */}
                            {/* <UserDropdown /> */}

                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="flex md:!mr-10 items-center space-x-1 text-gray-600 hover:text-brand-600 relative"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span className="hidden sm:inline text-sm font-medium">
                                    Cart
                                </span>
                                <span className="absolute -top-2 -right-2 bg-brand-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount || 0}
                                </span>
                            </Link>

                            <OptionsMenu
                                icon={
                                    <div className="flex items-center">
                                        {userInfo.picture ? (
                                            <CustomAvatar
                                                src={userInfo.picture}
                                                alt={getInitials(
                                                    userInfo?.fullname || 'New User'
                                                ).substring(0, 2)}
                                                className="!w-10 !hidden md:!block !h-10 !ml flex-shrink-0"
                                            />
                                        ) : (
                                            <CustomAvatar
                                                skin="light"
                                                color="primary"
                                                className="!w-10 !hidden md:!flex !h-10 !font-black !text-[15px] !ml-2 flex-shrink-0"
                                            // onClick={() => dispatch(userLogout())}
                                            // sx={{ ml: 3, width: 30, height: 30, fontSize: "0.85rem" }}
                                            >
                                                {getInitials(userInfo?.fullname || 'New User').substring(
                                                    0,
                                                    2
                                                )}
                                            </CustomAvatar>
                                        )}
                                        <IconifyIcon
                                            icon="tabler:chevron-down"
                                            className="ml-3 hidden md:block"
                                        />
                                    </div>
                                }
                                options={desktopOptions(offline, userInfo)}
                                setOption={(e) => { }}
                                iconButtonProps={{
                                    size: 'small',
                                    sx: { cursor: 'pointer' },
                                }}
                                itemsClassName="!bg-transparent hover:!bg-gray-50"
                            />


                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMenu}
                                className="lg:hidden p-2 text-gray-600 hover:text-brand-600"
                            >
                                {isMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    <div className="md:hidden pb-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        window.location.href = `/products?search=${searchQuery}`;
                                    }
                                }}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Product"
                                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {
                    isMenuOpen && (
                        <div className="lg:hidden bg-white border-t border-gray-200">
                            <div className="px-4 py-2 space-y-1">
                                {menu.map((each, i) => (
                                    <a
                                        href={`/${each.link}`}
                                        key={i}
                                        className="block px-3 py-2 text-gray-700 hover:text-brand-600 hover:bg-gray-50 rounded-md font-medium"
                                    >
                                        {each.title}
                                    </a>
                                ))}

                            </div>

                            {/* Mobile Contact Info */}
                            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span>
                                            5, Fola Oshibo Street, Lekki Phase 1,
                                            Lagos State, Nigeria
                                        </span>
                                    </div>
                                    <Link href="tel:09134434790" className="flex items-center space-x-2 text-gray-600">
                                        <Phone className="w-4 h-4" />
                                        <span>+234 (913) 443 4790</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </nav >
        </div >
    );
}
