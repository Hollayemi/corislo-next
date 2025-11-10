"use client"
import React, { useState, useEffect } from 'react';
import { Search, Store, Users, TrendingUp, ArrowRight, Play, Star, MapPin, MenuIcon, StoreIcon } from 'lucide-react';
import Image from 'next/image';
import ModernFooter from './footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetStoresNearbyQuery } from '@/app/redux/user/slices/storeSlice';
import { formatDistance, mySubstring } from '@/app/utils/format';

const Corisio = () => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState(false);


  const { data, isLoading } = useGetStoresNearbyQuery()

  const nearStores = data?.data || []

  const openProductSearch = (e) => {
    console.log(e)
    if (e.key === "Enter") {
      router.push(`/products?search=${search}`)
    }
  }

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

  const testimonials = [
    "Increased my sales by 200% in just 2 months",
    "Found amazing local products I never knew existed",
    "Perfect platform for small business growth"
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-brand-700 to-slate-900  overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute home-bg inset-0 opacity-20"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20 pb-16">
        {/* Navigation Hint */}
        <nav className="flex sticky top-0 justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Image src="/images/logo/horizontal/hor-logo-4.png" alt='Logo' width={150} height={100} />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" ><button className="cursor-pointer text-gray-300 hover:text-white transition-colors">For Stores</button></Link>
            <Link href="/products" ><button className="cursor-pointer text-gray-300 hover:text-white transition-colors">For Shoppers</button></Link>
            <button className="bg-gradient-to-r from-brand-500 to-brand-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform">
              Get Started
            </button>
          </div>
          {/* D */}
          <div className="flex items-center md:hidden space-x-6">
            <StoreIcon onClick={() => router.push("/dashboard")} className='text-white' size={25} />
            <Search onClick={() => router.push("/products")} className='text-white' size={25} />
            <button className="  bg-gradient-to-r from-brand-500 to-brand-500 text-white p-2 hover:scale-105 transition-transform">
              <MenuIcon />
            </button>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-2 text-brand-300">
              <Star className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Trusted by 10,000+ local stores</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Connect
                <span className="bg-gradient-to-r from-brand-400 via-brand-400 to-accent-400 bg-clip-text text-transparent"> Local</span>
                <br />
                Commerce
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Bridge the gap between local stores and community shoppers.
                Discover amazing products nearby or showcase your inventory to local customers.
              </p>
            </div>

            {/* Dynamic Testimonial */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl w-full p-6 ">
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-300 text-sm">4.9/5 rating</span>
              </div>
              <p className="text-white font-medium text-lg">
                "{testimonials[currentSlide]}"
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-brand-500 to-brand-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-brand-500/25">
                <span className="flex items-center justify-center">
                  List Your Store
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                <span className="flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8  border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-gray-400 text-sm">Active Stores</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-gray-400 text-sm">Products Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100K+</div>
                <div className="text-gray-400 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className={`relative transform transition-all mt-0 md:-mt-20 duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {/* Main Visual Card */}
            <div className="relative">
              {/* Floating Cards */}
              <div className="absolute -top-8 -left-14 bg-gradient-to-r from-brand-500 to-accent-600 p-6 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <Store className="w-8 h-8 text-white mb-3" />
                <div className="text-white">
                  <div className="font-bold text-lg">Store Owners</div>
                  <div className="text-brand-100 text-sm">Reach local customers</div>
                </div>
              </div>

              <div className="absolute -bottom-16 -right-10 bg-gradient-to-r from-brand-500 to-cyan-600 p-6 rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <Users className="w-8 h-8 text-white mb-3" />
                <div className="text-white">
                  <div className="font-bold text-lg">Shoppers</div>
                  <div className="text-blue-100 text-sm">Discover local gems</div>
                </div>
              </div>

              {/* Center Phone Mockup */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-2 md:p-8 shadow-2xl md:mx-8 my-8">
                <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-6 shadow-inner">
                  {/* Phone Interface */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-brand-600" />
                        <span className="text-gray-800 font-medium">Nearby Stores</span>
                      </div>
                      <div className="text-gray-600">2.3km</div>
                    </div>

                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={openProductSearch}
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>

                    {/* Mock Product Cards */}
                    <div className="space-y-3">
                      {isLoading && [1, 2, 3].map((item, i) => (
                        <div key={item} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-accent-400 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
                            <div className="h-2 bg-gray-200 rounded w-16"></div>
                          </div>
                          <div className="text-brand-600 font-bold">₦ 0</div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {nearStores.length > 1 && nearStores.slice(0, 4).map((item, i) => (
                        <div key={item} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                          {/* <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-accent-400 rounded-lg"></div> */}
                          <img src={item.profile_image} alt="profile" className="w-12 h-12 rounded-lg" />
                          <div className="flex-1">
                            <h5>{item.businessName}</h5>
                            <h5 className="text-xs">{mySubstring(item.about_store, 50)}</h5>
                          </div>
                          <div className="text-brand-600 font-bold">{formatDistance(item.distance)}</div>
                        </div>
                      ))}
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
              <feature.icon className="w-5 h-5 text-brand-400" />
              <span className="text-white font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
      <ModernFooter />
    </div >
  );
};

export default Corisio;