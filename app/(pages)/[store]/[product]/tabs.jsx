import { Box, Typography } from '@mui/material'

export const ProdDescription = ({ desc }) => {
  return (
    <Box dan>
      {' '}
      <Typography variant="caption">
        <div dangerouslySetInnerHTML={{ __html: desc }} />
      </Typography>
    </Box>
  )
}

const InfoCaption = ({ title, caption, br }) => {
  return (
    <Typography className="!text-gray-400 !text-[13px] !my-2 !leading-9">
      <span className="!text-black w-28">{title}</span>{' '}
      <br className={`${!br && 'hidden'}`} /> {caption}
    </Typography>
  )
}

export const Specifications = ({ specifications = {} }) => {
  // Use the provided otherVariations or fall back to default data
  // const product = {
  //   colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'],
  //   sizes: ['S', 'M', 'L', 'XL'],
  //   specification: {
  //     Type: 'Soft Drink',
  //     Flavors: 'Orange',
  //     Packaging: 'Bottle',
  //     Sugar_Content: 'Sugar-Free',
  //     Caffeine_Content: 'Decaffeinated',
  //     Sizes: '330ml',
  //   },
  // }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg  overflow-hidden">
      <div className="px-3 md:p-6 space-y-8">
        {/* Colors Section - Only shown if colors exist */}
        {specifications.colors && specifications.colors.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Available Colors
            </h3>
            <div className="flex flex-wrap gap-4">
              {specifications.colors.map((color) => (
                <div key={color} className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full border border-gray-200 shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className="mt-2 text-sm text-gray-600 capitalize">
                    {typeof color === 'string'
                      ? color.replace('#', '').toLowerCase()
                      : color}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sizes Section - Only shown if sizes exist */}
        {specifications.sizes && specifications.sizes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Available Sizes
            </h3>
            <div className="flex flex-wrap gap-3">
              {specifications.sizes.map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Specifications Section */}
        {specifications.variations && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Product Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications.variations).map(([key, value]) => (
                <div key={key} className="mb-3">
                  <h4 className="text-sm font-medium text-gray-500 capitalize">
                    {key.replace(/_/g, ' ')}
                  </h4>
                  <p className="text-lg font-normal text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
