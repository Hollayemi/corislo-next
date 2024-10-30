import { Box, Button } from '@mui/material'
import Icon from '@/app/components/icon'

const BreadcrumbEle = () => {
    return (
      <Box className="flex items-center">
        <Icon icon="tabler:download" />

        <Icon icon="tabler:download" />
      </Box>
    );
}

export default BreadcrumbEle