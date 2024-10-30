import { Box, Typography } from '@mui/material'

export const ProdDescription = ({ desc }) => {
  return (
    <Box dan>
      {' '}
      <Typography variant='caption'>
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
