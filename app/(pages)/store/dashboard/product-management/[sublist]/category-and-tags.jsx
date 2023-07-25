import { Box, Typography } from '@mui/material';

const CategoryAndTags = () => {
    return (
        <Box>
            <Typography className="font-bold">Categories</Typography>
            <Typography className="text-xs mt-3 leading-5" variant="body1" color="custom.bodyGray">
                This section is dedicated to efficiently managing your product categories across all store branches. As the administrator, you have full control over every aspect 
                of your product categories, ensuring seamless organization and a delightful shopping experience for your customers.
            </Typography>
            
        </Box>
    )
}

export default CategoryAndTags