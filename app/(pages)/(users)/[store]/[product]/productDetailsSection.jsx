import { useState } from 'react'
import { Box, Typography, Button, Rating, Chip } from '@mui/material'
import IconifyIcon from './IconifyIcon'
import { ProductSellerCard } from '@/app/components/cards/seller/product.sellercard'

const TitleValue = ({ title, value }) => (
  <Box className="w-1/2 mb-3">
    <Typography variant="caption" className="!text-gray-500 !block">
      {title}
    </Typography>
    <Typography variant="body2" className="!font-medium !text-black">
      {value || 'N/A'}
    </Typography>
  </Box>
)

const ColorSelector = ({ colors, selectedColors, onSelect }) => (
  <Box className="mb-6">
    <Typography variant="subtitle2" className="!font-semibold !mb-3">
      Color{selectedColors.length > 1 ? 's' : ''} Selected
    </Typography>
    <Box className="flex flex-wrap gap-2">
      {colors.map((color, i) => (
        <Box
          key={i}
          onClick={() => onSelect(color)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
            border-2 ${selectedColors.includes(color)
              ? 'border-blue-600'
              : 'border-transparent'
            }
            transition-all duration-200 hover:scale-105
          `}
          style={{ backgroundColor: color }}
        >
          {selectedColors.includes(color) && (
            <IconifyIcon icon="mdi:check" className="text-white text-lg" />
          )}
        </Box>
      ))}
    </Box>
  </Box>
)

const SizeSelector = ({ sizes, selectedSize, onSelect }) => (
  <Box className="mb-6">
    <Typography variant="subtitle2" className="!font-semibold !mb-3">
      Select Size
    </Typography>
    <Box className="flex flex-wrap gap-2">
      {sizes.map((size, i) => (
        <Chip
          key={i}
          label={size}
          onClick={() => onSelect(size)}
          className={`
            !rounded-md !px-3 !py-1 !cursor-pointer !transition-all
            ${selectedSize === size
              ? '!bg-blue-600 !text-white'
              : '!bg-gray-100 hover:!bg-gray-200'
            }
          `}
        />
      ))}
    </Box>
  </Box>
)

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => (
  <Box className="mb-6">
    <Typography variant="subtitle2" className="!font-semibold !mb-3">
      Quantity
    </Typography>
    <Box className="flex items-center border border-gray-300 rounded-md w-fit">
      <Button
        onClick={onDecrease}
        className="!min-w-0 !w-10 !h-10 !text-xl !text-gray-600"
        disabled={quantity <= 1}
      >
        -
      </Button>
      <Typography className="!w-10 !text-center !font-medium">
        {quantity}
      </Typography>
      <Button
        onClick={onIncrease}
        className="!min-w-0 !w-10 !h-10 !text-xl !text-gray-600"
      >
        +
      </Button>
    </Box>
  </Box>
)

const ProductDetailsSection = ({
  product,
  savedProds,
  saveProduct,
  payload,
  dispatch,
}) => {
  const [colors, setColors] = useState([])
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [moreVariations, setMoreVariations] = useState(false)

  const colorArray = product?.specifications?.color || []
  const sizeArray = product?.specifications?.size || []
  const otherVariations = Object.keys(product?.specifications?.variations || {})

  const toggleColor = (color) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
  }

  return (
    <Box className="w-full">
      {/* Product Title and Basic Info */}
      <Typography variant="h5" className="!font-bold !text-2xl !mb-4">
        {product.prodName}
      </Typography>

      {/* Rating and Wishlist */}
      <Box className="flex items-center justify-between mb-6">
        <Box className="flex items-center">
          <Rating
            value={product?.star || 0}
            precision={0.1}
            readOnly
            size="medium"
            className="!mr-2"
          />
          <Typography variant="body2" className="!text-gray-600">
            ({product?.totalReviews?.toLocaleString() || 0} reviews)
          </Typography>
        </Box>
        <Box
          className="flex items-center cursor-pointer hover:text-red-500 transition-colors"
          onClick={() => saveProduct(payload, dispatch)}
        >
          <IconifyIcon
            icon="tabler:heart"
            className={`!text-xl !mr-1 ${savedProds.includes(product?._id) ? '!text-red-500' : ''
              }`}
          />
          <Typography variant="body2">
            {savedProds.includes(product?._id) ? 'Saved' : 'Save'}
          </Typography>
        </Box>
      </Box>

      {/* Discount Badge */}
      {product.discount && (
        <Box className="bg-red-100 text-red-800 inline-flex items-center !px-3 py-1 rounded-full mb-6">
          <Typography variant="caption" className="!font-bold">
            {product.discount}% OFF - {product.discountTitle}
          </Typography>
        </Box>
      )}

      {/* Product Metadata */}
      <Box className="grid grid-cols-2 gap-4 mb-8">
        <TitleValue title="Collection" value={product.collectionName} />
        <TitleValue title="Category" value={product.category} />
        <TitleValue title="Sub-Category" value={product.subCollectionName} />
        <TitleValue title="Classes" value={product.group} />
      </Box>

      {/* Color Selection */}
      {colorArray.length > 0 && (
        <ColorSelector
          colors={colorArray}
          selectedColors={colors}
          onSelect={toggleColor}
        />
      )}

      {/* Size Selection */}
      {sizeArray.length > 0 && (
        <SizeSelector
          sizes={sizeArray}
          selectedSize={size}
          onSelect={setSize}
        />
      )}

      {/* Quantity Selector */}
      <QuantitySelector
        quantity={quantity}
        onIncrease={() => setQuantity((q) => q + 1)}
        onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
      />

      {/* Other Variations */}
      {otherVariations.length > 0 && (
        <Box className="mb-6">
          <Typography variant="subtitle2" className="!font-semibold !mb-3">
            Other Variations
          </Typography>
          <Box className="flex flex-wrap gap-4">
            {otherVariations
              .slice(0, moreVariations ? undefined : 3)
              .map((key, i) => (
                <Box key={i}>
                  <Typography
                    variant="body2"
                    className="!text-gray-600 !capitalize"
                  >
                    {key.replace(/_/g, ' ')}:
                  </Typography>
                  <Typography variant="body2" className="!font-medium">
                    {product.specifications.variations[key]}
                  </Typography>
                </Box>
              ))}
          </Box>
          {otherVariations.length > 3 && (
            <Button
              variant="text"
              size="small"
              onClick={() => setMoreVariations(!moreVariations)}
              className="!mt-2 !text-blue-600"
            >
              {moreVariations ? 'Show less' : 'Show more'}
            </Button>
          )}
        </Box>
      )}

      {/* Price and Action Buttons */}
      <Box className="bg-gray-50 p-4 rounded-lg">
        <Typography variant="h6" className="!font-bold !text-2xl !mb-4">
          NGN {product?.prodPrice?.toLocaleString()}
        </Typography>

        <Box className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="contained"
            color="primary"
            className="!rounded-full !py-3 !flex-1"
            onClick={() => addCartHandler(payload, dispatch)}
            startIcon={<IconifyIcon icon="tabler:shopping-cart" />}
          >
            {cartedProds.includes(product?._id)
              ? 'Remove from Cart'
              : 'Add to Cart'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="!rounded-full !py-3 !flex-1"
            startIcon={<IconifyIcon icon="tabler:wallet" />}
          >
            Buy Now
          </Button>
        </Box>
      </Box>

      {/* Seller Info */}
      {product?.branchId && (
        <Box className="mt-6">
          <ProductSellerCard branchId={product?.branchId} />
        </Box>
      )}
    </Box>
  )
}

export default ProductDetailsSection
