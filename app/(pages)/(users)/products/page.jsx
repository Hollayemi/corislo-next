"use client"
import React, { useState, useEffect, use } from 'react';
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import UserWrapper from '@/app/components/view/user';
import { ProductCard, ProductCardList } from '../components/cards';
import { useGetAllProductsQuery } from '@/app/redux/user/slices/homeSlice';
import useGeolocation from '@/app/hooks/useGeolocation';
import { formatCurrency } from '@/app/utils/format';

const ProductListing = ({ searchParams }) => {
    const { search = '' } = use(searchParams) || {};
    const { coordinates } = useGeolocation()
    const { data: rawProducts, isLoading: fetchingProduct, refetch: refetchProduct } = useGetAllProductsQuery({
        lat: coordinates.latitude,
        lng: coordinates.longitude,
        search,
    })
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [sortBy, setSortBy] = useState('featured');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { result: products = [], price: prices =[] } = rawProducts?.data || {}
    const categories = [
        { id: 'all', name: 'All Products', count: products?.length },
        ...Object.values(
            products.reduce((acc, product) => {
                if (!acc[product.categoryId]) {
                    acc[product.categoryId] = {
                        id: product.categoryId,
                        name: product.category,
                        count: 0,
                    };
                }
                acc[product.categoryId].count += 1;
                return acc;
            }, {})
        )
    ];

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    const filteredProducts = products.filter(product => {
        const query = searchQuery?.toLowerCase();
        const matchesSearchInName = product.prodName?.toLowerCase()?.includes(query);
        // const matchesSearchInSpecs = Object.values(product.specifications || {}).some(spec => {
        //     if (Array.isArray(spec)) {
        //         return spec.some(item => item?.toLowerCase()?.includes(query));
        //     }
        //     return typeof spec === "string" && spec?.toLowerCase().includes(query);
        // });

        const matchesSearch = matchesSearchInName || matchesSearchInSpecs;
        const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
        const matchesPrice = product.prodPrice >= priceRange[0] && product.prodPrice <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low': return a.prodPrice - b.prodPrice;
            case 'price-high': return b.prodPrice - a.prodPrice;
            case 'rating': return b.rating - a.rating;
            case 'distance': return parseFloat(a.distance) - parseFloat(b.distance);
            default: return 0;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading amazing products...</p>
                </div>
            </div>
        );
    }

    return (
        <UserWrapper>
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-2 md:px-2 py-8">
                    <div className="flex md:gap-8">
                        {/* Sidebar Filters */}
                        <div className={`${showFilters ? 'block' : 'hidden'} fixed sm:static shadow z-30 lg:block w-80 flex-shrink-0`}>
                            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-26">
                                <h3 className="font-bold text-lg mb-6">Filters</h3>

                                {/* Categories */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Categories</h4>
                                    <div className="space-y-2">
                                        {categories.map(category => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-colors ${selectedCategory === category.id
                                                    ? 'bg-brand-50 text-brand-700 border border-brand-200'
                                                    : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span>{category.name}</span>
                                                <span className="text-sm text-gray-500">{category.count}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Price Range</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm text-gray-600">{formatCurrency(Math.min(...prices))}</span>
                                            <input
                                                type="range"
                                                min={Math.min(...prices) || 0}
                                                max={(Math.max(...prices) || 1000) + 1}
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                                className="flex-1"
                                            />
                                            <span className="text-sm text-gray-600">{formatCurrency(Math.max(...prices) || 1000)}</span>
                                        </div>
                                        <div className="text-center text-sm font-medium text-brand-600">
                                            {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                                        </div>
                                    </div>
                                </div>

                                {/* Sort */}
                                <div>
                                    <h4 className="font-semibold mb-3">Sort By</h4>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="distance">Nearest First</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        <div className="flex-1">
                            {/* Results Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                        {selectedCategory === 'all' ? 'Near Products' : categories.find(c => c.id === selectedCategory)?.prodName}
                                    </h2>
                                    <p className="text-md text-gray-600">
                                        {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
                                        {searchQuery && ` for "${searchQuery}"`}
                                    </p>
                                </div>
                                {/* View Toggle */}
                                <div className="flex  items-center space-x-4 ml-6">
                                    <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                                                }`}
                                        >
                                            <Grid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                                                }`}
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="flex items-center md:space-x-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                        <span className="hidden md:block">Filters</span>
                                    </button>
                                </div>
                            </div>

                            {/* Products */}
                            {sortedProducts.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                                    <p className="text-gray-600">Try adjusting your search or filters</p>
                                </div>
                            ) : (
                                <div className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2'
                                            : 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-2 space-y-6'
                                }>
                                    {sortedProducts.map(product =>
                                        viewMode === 'grid'
                                            ? <ProductCard key={product._id} product={product} />
                                            : <ProductCardList key={product._id} product={product} />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </UserWrapper>
    );
};

export default ProductListing;