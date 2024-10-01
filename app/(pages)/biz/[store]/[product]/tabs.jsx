import { Box, Typography } from '@mui/material'

export const ProdDescription = ({ desc }) => {
  return (
    // <Box>
    //   <InfoCaption
    //     title="Product Title:"
    //     caption="Flangesio Ultra-Cool Design Men's Sneakers PU Leather Trend Casual
    //         Shoes EUR Size 39-48 New Arrival Leisure Runway Sneakers Cool
    //         Jogging Shoes Comfort Male Athletic Tennis Shoes Man Sport Training
    //         Footwear Black"
    //   />
    //   <InfoCaption title="Brand: " caption="Flangesio" />
    //   <br />
    //   <InfoCaption
    //     title="Product Description: "
    //     br
    //     caption="Elevate your style with the Flangesio Ultra-Cool Design Men's
    //         Sneakers. Crafted for those who appreciate the perfect blend of
    //         fashion and functionality, these sneakers are the epitome of trendy
    //         footwear. Whether you're stepping out for a casual day with friends,
    //         hitting the gym, or embracing your inner sports enthusiast, these
    //         sneakers are designed to provide unmatched comfort and style."
    //   />
    //   <InfoCaption
    //     title="Key Features: "
    //     br
    //     caption="Elevate your style with the Flangesio Ultra-Cool Design Men's
    //         Sneakers. Crafted for those who appreciate the perfect blend of
    //         fashion and functionality, these sneakers are the epitome of trendy
    //         footwear. Whether you're stepping out for a casual day with friends,
    //         hitting the gym, or embracing your inner sports enthusiast, these
    //         sneakers are designed to provide unmatched comfort and style."
    //   />
    // </Box>
    <Typography>{desc}</Typography>
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

export const Specifications = ({ otherVariations }) => {
  return (
    <Box>
      <Typography variant="body2" className="!font-bold !mb-2">
        Specifications
      </Typography>
      <Box className="flex items-center justify-center flex-wrap mb-5">
        {otherVariations?.map(
          (each, i) =>
            i < more.variation && (
              <Box key={i} className="flex items-center">
                <Typography variant="body2" className="!text-[12px] !mr-2">
                  {each.replaceAll('_', ' ')}:
                </Typography>
                <Typography variant="body2" className="!text-[12px] !mr-4">
                  {Object.values(product?.specifications?.variations || {})[i]},
                </Typography>
              </Box>
            )
        )}
      </Box>
    </Box>
  )
}
