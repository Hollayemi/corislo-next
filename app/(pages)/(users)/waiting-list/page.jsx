"use client"
import React, { useState, useEffect } from 'react';
import { Search, Store, Users, TrendingUp, ArrowRight, Mail, CheckCircle, Star, MapPin, Bell } from 'lucide-react';

const WaitingListHero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('shopper');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        { icon: Store, text: "Local Store Discovery", desc: "Connect with nearby businesses" },
        { icon: Users, text: "Community Shopping", desc: "Shop within your neighborhood" },
        { icon: TrendingUp, text: "Boost Sales", desc: "Increase your store visibility" }
    ];

    const comingSoonFeatures = [
        "Real-time inventory updates",
        "In-app messaging with stores",
        "Location-based recommendations"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <>
            <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

                <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
                    {/* Navigation */}
                    <nav className="flex justify-between items-center mb-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                <Store className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-white font-bold text-xl">LocalMarket</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 flex items-center space-x-2">
                                <Bell className="w-4 h-4 text-yellow-400" />
                                <span className="text-yellow-300 text-sm font-medium">Coming Soon</span>
                            </div>
                        </div>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                            {/* Launch Badge */}
                            <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-4 py-2 text-purple-300">
                                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                                <span className="text-sm font-medium">Launching Q4 2025 • Be the first to know</span>
                            </div>

                            {/* Main Headline */}
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                                    Connect
                                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Local</span>
                                    <br />
                                    Commerce
                                </h1>
                                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                    The future of local shopping is here. Bridge the gap between neighborhood stores and community shoppers.
                                    Join thousands waiting for early access.
                                </p>
                            </div>

                            {/* Waiting List Form */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-4">Join the Waiting List</h3>
                                            <p className="text-gray-300 mb-6">Be among the first to experience the future of local commerce.</p>
                                        </div>

                                        {/* User Type Selection */}
                                        <div className="space-y-3">
                                            <label className="text-white font-medium">I am a:</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setUserType('shopper')}
                                                    className={`p-4 rounded-xl border-2 transition-all ${userType === 'shopper'
                                                        ? 'border-purple-500 bg-purple-500/10'
                                                        : 'border-white/20 bg-white/5'
                                                        }`}
                                                >
                                                    <Users className="w-6 h-6 text-white mx-auto mb-2" />
                                                    <div className="text-white font-medium">Shopper</div>
                                                    <div className="text-gray-400 text-sm">Find local products</div>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setUserType('store')}
                                                    className={`p-4 rounded-xl border-2 transition-all ${userType === 'store'
                                                        ? 'border-blue-500 bg-blue-500/10'
                                                        : 'border-white/20 bg-white/5'
                                                        }`}
                                                >
                                                    <Store className="w-6 h-6 text-white mx-auto mb-2" />
                                                    <div className="text-white font-medium">Store Owner</div>
                                                    <div className="text-gray-400 text-sm">List my products</div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Email Input */}
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email address"
                                                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Adding you to the list...
                                                </div>
                                            ) : (
                                                <span className="flex items-center justify-center">
                                                    Get Early Access
                                                    <ArrowRight className="w-5 h-5 ml-2" />
                                                </span>
                                            )}
                                        </button>

                                        <p className="text-gray-400 text-sm text-center">
                                            No spam, ever. Unsubscribe anytime.
                                        </p>
                                    </form>
                                ) : (
                                    <div className="text-center space-y-6">
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                            <CheckCircle className="w-10 h-10 text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">You're on the list! 🎉</h3>
                                            <p className="text-gray-300">
                                                We'll notify you as soon as LocalMarket launches. Get ready for the future of local commerce!
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
                                            <p className="text-green-300 font-medium">
                                                Position #{Math.floor(Math.random() * 1000) + 500} in line
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Social Proof */}
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">2,847</div>
                                <div className="text-gray-400">people already joined</div>
                            </div>
                        </div>

                        {/* Right Column - Visual Elements */}
                        <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            {/* Coming Soon Features */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
                                <h4 className="text-white font-bold text-xl mb-6">What's Coming</h4>
                                <div className="space-y-4">
                                    {comingSoonFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Visual Card - Coming Soon Version */}
                            <div className="relative">
                                {/* Floating Cards */}
                                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <Store className="w-8 h-8 text-white mb-3" />
                                    <div className="text-white">
                                        <div className="font-bold text-lg">For Stores</div>
                                        <div className="text-purple-100 text-sm">Coming Soon</div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <Users className="w-8 h-8 text-white mb-3" />
                                    <div className="text-white">
                                        <div className="font-bold text-lg">For Shoppers</div>
                                        <div className="text-blue-100 text-sm">Coming Soon</div>
                                    </div>
                                </div>

                                {/* Center Preview */}
                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl mx-8 my-8 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl"></div>
                                    <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-2xl p-6 shadow-inner">
                                        <div className="text-center space-y-4">
                                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto flex items-center justify-center">
                                                <Bell className="w-8 h-8 text-white" />
                                            </div>
                                            <h4 className="text-gray-800 font-bold text-xl">App Preview</h4>
                                            <p className="text-gray-600">Coming Q4 2025</p>

                                            {/* Mock Interface Elements */}
                                            <div className="space-y-3 mt-6">
                                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature Pills */}
                    <div className="mt-20 flex flex-wrap justify-center gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 transform transition-all duration-500 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                            >
                                <feature.icon className="w-5 h-5 text-purple-400" />
                                <span className="text-white font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WaitingListHero;