const { Box, Typography, ClickAwayListener } = require('@mui/material')

const MyAutocomplete = ({
  searchComponents,
  viewOption,
  options,
  onClick,
  open,
  closeFunc,
  label,
}) => {
  return (
    <ClickAwayListener onClickAway={closeFunc}>
      <Box className="relative w-full">
        {label && (
          <Typography variant="body2" className="!text-[13px] !text-gray-500 !mb-1.5">
            {label}
          </Typography>
        )}
        {searchComponents}
        {open && (
          <Box className="absolute left-0 top-full z-50 shadow-xl overflowStyle rounded-md w-full h-[200px] bg-white overflow-auto">
            {options?.map((x, i) => (
              <Box
                key={i}
                onClick={() => {
                  onClick(x)
                  closeFunc()
                }}
                className="py-2 !px-4 cursor-pointer"
              >
                <Typography variant="body2" className="text-black !text-[15px]">
                  {viewOption(x)}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  )
}

export default MyAutocomplete
