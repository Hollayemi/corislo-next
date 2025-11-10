import React, { useState } from 'react';
import {
    Store,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    ArrowRight,
    Heart,
    Shield,
    Truck,
    Headphones,
    CreditCard,
    Globe,
    Star,
    Users,
    TrendingUp,
    CheckCircle,
    Send,
    ExternalLink
} from 'lucide-react';
import Image from 'next/image';

const ModernFooter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [hoveredSocial, setHoveredSocial] = useState(null);

    const handleNewsletterSubmit = () => {
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const quickLinks = [
        { name: 'How It Works', href: '#' },
        { name: 'For Store Owners', href: '#' },
        { name: 'For Shoppers', href: '#' },
        { name: 'Success Stories', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'API Documentation', href: '#' }
    ];

    const support = [
        { name: 'Help Center', href: '#' },
        { name: 'Contact Support', href: '#' },
        { name: 'Live Chat', href: '#' },
        { name: 'Community Forum', href: '#' },
        { name: 'Video Tutorials', href: '#' },
        { name: 'System Status', href: '#' }
    ];

    const legal = [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'GDPR Compliance', href: '#' },
        { name: 'Accessibility', href: '#' },
        { name: 'Seller Agreement', href: '#' }
    ];

    const features = [
        // { icon: Shield, text: 'Secure Payments', desc: 'Bank-level security' },
        { icon: Truck, text: 'Fast Delivery', desc: 'Same-day available' },
        { icon: Headphones, text: '24/7 Support', desc: 'Always here to help' },
        // { icon: CreditCard, text: 'Easy Returns', desc: '30-day guarantee' }
    ];

    const socialLinks = [
        {
            icon: Facebook,
            name: 'Facebook',
            href: '#',
            color: 'hover:text-blue-600',
            bgColor: 'group-hover:bg-blue-600',
            followers: '12.5K'
        },
        {
            icon: Twitter,
            name: 'Twitter',
            href: '#',
            color: 'hover:text-sky-500',
            bgColor: 'group-hover:bg-sky-500',
            followers: '8.2K'
        },
        {
            icon: Instagram,
            name: 'Instagram',
            href: '#',
            color: 'hover:text-pink-600',
            bgColor: 'group-hover:bg-pink-600',
            followers: '15.8K'
        },
        {
            icon: Linkedin,
            name: 'LinkedIn',
            href: '#',
            color: 'hover:text-blue-700',
            bgColor: 'group-hover:bg-blue-700',
            followers: '3.4K'
        },
        {
            icon: Youtube,
            name: 'YouTube',
            href: '#',
            color: 'hover:text-red-600',
            bgColor: 'group-hover:bg-red-600',
            followers: '5.9K'
        }
    ];

    const stats = [
        // { number: '10,000+', label: 'Active Stores', icon: Store },
        // { number: '50,000+', label: 'Products Listed', icon: TrendingUp },
        // { number: '100,000+', label: 'Happy Customers', icon: Users },
        // { number: '4.9/5', label: 'Average Rating', icon: Star }
    ];

    return (
        <footer className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
                {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M0 0h60v60H0z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div> */}
            </div>

            <div className="relative z-10">
                {/* Top Section - Newsletter & Features */}
                <div className="border-b border-white/10">
                    <div className="container mx-auto px-6 py-12">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Newsletter Signup */}
                            <div>
                                <h3 className="text-3xl font-bold mb-4">
                                    Stay in the <span className="bg-gradient-to-r from-brand-400 to-blue-400 bg-clip-text text-transparent">Loop</span>
                                </h3>
                                <p className="text-gray-300 text-lg mb-6">
                                    Get the latest updates on new stores, exclusive deals, and platform features delivered to your inbox.
                                </p>

                                {!isSubscribed ? (
                                    <div className="flex gap-3">
                                        <div className="flex-1 relative">
                                            <Mail className="absolute left-4 z-30 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email address"
                                                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-500 focus:border-transparent backdrop-blur-sm"
                                            />
                                        </div>
                                        <button
                                            onClick={handleNewsletterSubmit}
                                            className="bg-gradient-to-r from-brand-600 to-blue-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-brand-500/25 flex items-center"
                                        >
                                            Subscribe
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center space-x-3">
                                        <CheckCircle className="w-6 h-6 text-green-400" />
                                        <span className="text-green-300 font-medium">
                                            Thanks for subscribing! Check your email for confirmation.
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-blue-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-white mb-1">{feature.text}</h4>
                                        <p className="text-gray-400 text-sm">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="container mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Brand Section */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Logo */}
                            <div className="flex items-center space-x-3">
                                <Image src="/images/logo/horizontal/hor-logo-4.png" alt='Logo' width={150} height={100} />
                            </div>

                            {/* Description */}
                            <p className="text-gray-300 leading-relaxed">
                                Corisio bridges the gap between local stores and community shoppers, creating a thriving ecosystem where businesses grow and customers discover amazing products in their neighborhood.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 text-gray-300">
                                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span>support@corisio.com</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-300">
                                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span>+2348147702684</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-300">
                                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span>Benin city, Edo State, Nigeria</span>
                                </div>
                            </div>

                            {/* Stats */}
                            {/* <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl font-bold text-white">{stat.number}</div>
                                        <div className="text-gray-400 text-sm">{stat.label}</div>
                                    </div>
                                ))}
                            </div> */}
                        </div>

                        {/* Quick Links */}
                        <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8 ">
                            <div>
                                <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                                <ul className="space-y-3">
                                    {quickLinks.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-200">
                                                    {link.name}
                                                </span>
                                                <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support */}

                            <div>
                                <h3 className="text-lg font-semibold mb-6">Support</h3>
                                <ul className="space-y-3">
                                    {support.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-200">
                                                    {link.name}
                                                </span>
                                                <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h3 className="text-lg font-semibold mb-6">Legal</h3>
                                <ul className="space-y-3">
                                    {legal.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-200">
                                                    {link.name}
                                                </span>
                                                <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-6 py-8">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2">Connect With Us</h3>
                            <p className="text-gray-300">Join our community and stay updated</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="group relative"
                                    onMouseEnter={() => setHoveredSocial(index)}
                                    onMouseLeave={() => setHoveredSocial(null)}
                                >
                                    <div className={`w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${social.bgColor} group-hover:border-transparent`}>
                                        <social.icon className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" />
                                    </div>

                                    {/* Tooltip */}
                                    {hoveredSocial === index && (
                                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20">
                                            <div className="text-center">
                                                <div className="font-semibold">{social.name}</div>
                                                <div className="text-xs text-gray-300">{social.followers} followers</div>
                                            </div>
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/80"></div>
                                        </div>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-2 text-gray-300">
                                <span>© {new Date().getFullYear()} Corisio. Connect with local stores</span>
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <Globe className="w-4 h-4" />
                                    <span>English (US)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Shield className="w-4 h-4" />
                                    <span>SSL Secured</span>
                                </div>
                                {/* <div>Version 2.1.0</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ModernFooter;