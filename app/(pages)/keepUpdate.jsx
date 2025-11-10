import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, Star, ArrowRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const ShoeEcommerce = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    { id: 1, name: 'Nike Air Max', price: 129, image: '/api/placeholder/300/200', rating: 4.5, category: 'nike' },
    { id: 2, name: 'Adidas Ultra Boost', price: 149, image: '/api/placeholder/300/200', rating: 4.8, category: 'adidas' },
    { id: 3, name: 'Puma RS-X', price: 89, image: '/api/placeholder/300/200', rating: 4.3, category: 'puma' },
    { id: 4, name: 'New Balance 990', price: 179, image: '/api/placeholder/300/200', rating: 4.7, category: 'newbalance' },
    { id: 5, name: 'Converse Chuck Taylor', price: 65, image: '/api/placeholder/300/200', rating: 4.4, category: 'converse' },
    { id: 6, name: 'Vans Old Skool', price: 75, image: '/api/placeholder/300/200', rating: 4.6, category: 'vans' }
  ];

  const newArrivals = [
    { id: 7, name: 'Nike Dunk Low', price: 110, image: '/api/placeholder/250/180', isNew: true },
    { id: 8, name: 'Jordan 1 Retro', price: 170, image: '/api/placeholder/250/180', isNew: true },
    { id: 9, name: 'Yeezy Boost 350', price: 220, image: '/api/placeholder/250/180', isNew: true },
    { id: 10, name: 'Balenciaga Triple S', price: 895, image: '/api/placeholder/250/180', isNew: true },
    { id: 11, name: 'Golden Goose', price: 495, image: '/api/placeholder/250/180', isNew: true }
  ];

  const bestSellers = [
    { id: 12, name: 'Nike Air Force 1', price: 90, image: '/api/placeholder/200/150', rating: 4.9 },
    { id: 13, name: 'Adidas Stan Smith', price: 80, image: '/api/placeholder/200/150', rating: 4.7 },
    { id: 14, name: 'Converse All Star', price: 55, image: '/api/placeholder/200/150', rating: 4.5 },
    { id: 15, name: 'Vans Authentic', price: 50, image: '/api/placeholder/200/150', rating: 4.6 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">Shoesly</div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Shop</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
              <ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
              <User className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
              <Menu className="w-6 h-6 text-gray-600 cursor-pointer md:hidden" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20">
        <div className="max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  NIKE SAVALEOS
                </h1>
                <h2 className="text-2xl lg:text-3xl text-gray-700">
                  Weightlifting Shoes
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-blue-600">$125</span>
                  <span className="text-xl text-gray-500 line-through">$150</span>
                  <span className="bg-red-500 text-white !px-3 py-1 rounded-full text-sm font-semibold">
                    Save 17%
                  </span>
                </div>
              </div>
              <button className="bg-blue-600 text-white !px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-gray-600">Shop Smart. Every Step Counts.</p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-200 to-blue-200 rounded-full w-96 h-96 mx-auto relative overflow-hidden">
                <img
                  src="/api/placeholder/400/300"
                  alt="Nike Savaleos"
                  className="absolute inset-0 w-full h-full object-contain p-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $100</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure checkout</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-orange-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">New Arrivals</h2>
            <button className="text-orange-400 hover:text-orange-300 flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {newArrivals.map((product) => (
              <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs !px-2 py-1 rounded">
                      New
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2">{product.name}</h3>
                  <p className="text-orange-400 font-bold">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Best Seller</h2>
            <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 cursor-pointer">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                  </div>
                  <p className="text-xl font-bold text-blue-600">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Discounted Items</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Featured Collection</h3>
                  <p className="text-gray-300 mb-6">Discover our premium selection of athletic footwear</p>
                  <button className="bg-white text-gray-900 !px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Shop Collection
                  </button>
                </div>
                <img
                  src="/api/placeholder/300/200"
                  alt="Featured shoe"
                  className="absolute right-0 top-0 h-full object-cover opacity-30"
                />
              </div>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-4">
                  <img src="/api/placeholder/80/60" alt="Shoe" className="w-16 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Premium Sneaker {item}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500 font-bold">$89</span>
                      <span className="text-gray-400 line-through text-sm">$120</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">2,800+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1,200+</div>
              <div className="text-gray-400">Products Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">"Amazing quality and fast shipping. Love my new sneakers!"</p>
              <div className="flex items-center">
                <img src="/api/placeholder/40/40" alt="Customer" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="text-white font-medium">Sarah Johnson</p>
                  <p className="text-gray-400 text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">"Great selection and excellent customer service. Highly recommend!"</p>
              <div className="flex items-center">
                <img src="/api/placeholder/40/40" alt="Customer" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="text-white font-medium">Mike Chen</p>
                  <p className="text-gray-400 text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Recommended Items */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">All Recommended</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(25)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img src="/api/placeholder/200/150" alt={`Shoe ${index + 1}`} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Shoe Model {index + 1}</h3>
                  <p className="text-blue-600 font-bold text-sm">${89 + (index * 10)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white !px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto !px-4 sm:!px-6 lg:!px-8 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Stay up and enjoy 40% off your first order. Join over 5,000+ users, delivered to your inbox.</h2>
            <p className="text-blue-100">Get exclusive access to new arrivals, sales, and special offers.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 !px-6 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            />
            <button className="bg-white text-blue-600 !px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto !px-4 sm:!px-6 lg:!px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to our newsletter to get updates to our latest collections</h3>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 !px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white !px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">Shoesly</div>
              <p className="text-gray-400 mb-4">Your trusted partner for premium footwear. Quality shoes for every occasion.</p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Men's Shoes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Women's Shoes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kids' Shoes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Athletic</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Shoesly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShoeEcommerce;