import { useCart } from '@/app/context/CartContext';
import { useUserData } from '@/app/hooks/useData';
import { formatCurrency, formatDistance, mySubstring, reshapePrice } from '@/app/utils/format';
import { Star, MapPin, Heart, ShoppingCart, Store, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';


const getBadgeColor = (badge) => {
    switch (badge) {
        case 'Sale': return 'bg-red-500';
        case 'New': return 'bg-green-500';
        case 'Bestseller': return 'bg-brand-500';
        case 'Limited': return 'bg-orange-500';
        case 'Eco-Friendly': return 'bg-emerald-500';
        default: return 'bg-blue-500';
    }
};

export const ProductCard = ({ product }) => {
    const router = useRouter()
    const { cartedProducts, addToCart } = useCart()
    const { savedProds, saveItem, refetchSavedItems } = useUserData()
    const cartItem = {
        product: {
            _id: product._id,
            prodName: product.prodName,
            prodPrice: product.prodPrice,
            image: product?.images?.[0],
            collectionName: product.collectionName
        },
        store: product.store,
        branch: product.branch,
        quantity: 1,
    };

    return (
        <div className="group bg-white cursor-pointer rounded-md md:rounded-md shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-brand-200">
            {/* Image Container */}
            <div onClick={() => router.push(`/${product.store}/${product.urlKey}`)} className="relative overflow-hidden">
                <img
                    src={product?.images?.[0]}
                    alt={product.prodName}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge */}
                {product.badge && (
                    <div className={`absolute top-3 left-3 ${getBadgeColor(product.badge)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                        {product.badge}
                    </div>
                )}

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => saveItem({
                            store: product.store,
                            productId: product._id,
                            branch: product.branch,
                        }).then(() => refetchSavedItems())}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${cartedProducts.includes(product._id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${savedProds.includes(product._id) ? 'fill-current' : ''}`} />
                    </button>
                    <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-brand-600 transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                </div>

                {/* Stock Status */}
                {!product.totInStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold bg-black/70 px-4 py-2 rounded-lg">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="px-2 pt-6 min-h-44 relative">
                {/* Store Info */}
                <div onClick={() => router.push(`/${product.store}-${product.branch}`)} className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Store className="w-4 h-4" />
                        <span>{product.store}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{formatDistance(product.distance)}</span>
                    </div>
                </div>

                {/* Product Name */}
                <h3 onClick={() => router.push(`/${product.store}/${product.urlKey}`)} className="text-gray-900 mb-2 text-sm md:text-base group-hover:text-brand-600 transition-colors">
                    {mySubstring(product.prodName, 40)}
                </h3>

                {/* Rating */}
                {product.reviews && <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-700">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>}

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">{reshapePrice(product.prodPrice)}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                    {product.originalPrice && (
                        <span className="text-sm text-green-600 font-semibold">
                            {/* Save ${(product.originalPrice - product.price).toFixed(2)} */}
                        </span>
                    )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {Object.values(product.specifications || {})
                        .flatMap((val) => Array.isArray(val) ? val : [val])
                        .slice(0, 3)
                        .map((tag, index) => !tag.toString().includes("[") && (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                            >
                                {tag.toString()}
                            </span>
                        ))}
                </div>

                {/* Add to Cart Button */}
            </div>
            <div className='p-2'>
                <button
                    onClick={() => addToCart(cartItem)}
                    disabled={!product.totInStock}
                    className={`w-full ! left-0 !mx-auto  bottom-2 py-2.5 rounded md:rounded font-semibold transition-all duration-200 ${product.totInStock > 0
                        ? 'bg-gradient-to-r from-brand-600 to-blue-600 text-white hover:scale-105 hover:shadow-lg'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {product.totInStock ? (
                        <span className="flex items-center text-sm md:text-md justify-center">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {cartedProducts.includes(product._id) ? "Remove From Cart" : "Add to Cart"}
                        </span>
                    ) : (
                        'Out of Stock'
                    )}
                </button>
            </div>
        </div>
    )
};

export const ProductCardList = ({ product }) => {
    const { cartedProducts, addToCart } = useCart()
    const { savedProds, saveItem, refetchSavedItems } = useUserData()
    console.log({ savedProds })
    const cartItem = {
        product: {
            _id: product._id,
            prodName: product.prodName,
            prodPrice: product.prodPrice,
            image: product?.images?.[0],
            collectionName: product.collectionName
        },
        store: product.store,
        branch: product.branch,
        quantity: 1,
    };

    return (
        <div className="bg-white rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-brand-200 p-6">
            <div className="flex space-x-6">
                {/* Image */}
                <div onClick={() => router.push(`/${product.store}/${product.urlKey}`)} className="relative flex-shrink-0">
                    <img
                        src={product.images[0]}
                        alt={product.prodName}
                        className="w-32 h-32 object-cover rounded-xl"
                    />
                    {product.badge && (
                        <div className={`absolute -top-2 -right-2 ${getBadgeColor(product.badge)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                            {product.badge}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 onClick={() => router.push(`/${product.store}/${product.urlKey}`)} className="text-md text-gray-900 hover:text-brand-600 transition-colors">
                                {mySubstring(product.prodName, 40)}
                            </h3>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <Store className="w-4 h-4" />
                                    <span>{product.store}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{formatDistance(product.distance)}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => saveItem({
                                store: product.store,
                                productId: product._id,
                                branch: product.branch,
                            }).then(() => refetchSavedItems())}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${cartedProducts.includes(product.id)
                                ? 'bg-red-100 text-red-500'
                                : 'bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${savedProds.includes(product._id) ? 'fill-current' : ''}`} />
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="ml-1 font-medium text-gray-700">{product.rating}</span>
                            </div>
                            <span className="text-gray-500">({product.reviews} reviews)</span>
                        </div>

                        {/* <div className="flex flex-wrap gap-1">
                            {Object.values(product.specifications || {})
                                // flatten values so both strings & arrays become a flat array
                                .flatMap((val) => Array.isArray(val) ? val : [val])
                                .slice(0, 3)
                                .map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}

                        </div> */}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-semibold text-gray-900">{reshapePrice(product.prodPrice)}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-gray-500 line-through">{product.originalPrice}</span>
                                    <span className="text-green-600 font-semibold">
                                        {/* Save ${(product.originalPrice - product.price).toFixed(2)} */}
                                    </span>
                                </>
                            )}
                        </div>

                        <div className=''>
                            <button
                                onClick={() => addToCart(cartItem)}
                                disabled={!product.totInStock}
                                className={`w-full ! left-0 !mx-auto  bottom-2 py-2.5 rounded md:rounded font-semibold transition-all duration-200 ${product.totInStock > 0
                                    ? 'bg-gradient-to-r from-brand-600 to-blue-600 text-white hover:scale-105 hover:shadow-lg'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {product.totInStock ? (
                                    <span className="flex items-center text-sm md:text-xs px-2 justify-center">
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        {cartedProducts.includes(product._id) ? "Remove From Cart" : "Add to Cart"}
                                    </span>
                                ) : (
                                    'Out of Stock'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};