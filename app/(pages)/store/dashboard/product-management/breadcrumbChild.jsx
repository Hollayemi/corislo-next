import { Box, Button } from '@mui/material'
import Icon from '@/app/components/icon'

const BreadcrumbEle = () => {
    return(
        <Box className="flex items-center">
            <Button variant='contained' color='primary' className="mr-4"  startIcon={<Icon icon='tabler:plus' />}>
                Add New Product
            </Button>

            <Button variant='contained' color='primary' startIcon={<Icon icon='tabler:download' />}>
                Export as CSV
            </Button>
        </Box>
    )
}

export default BreadcrumbEle