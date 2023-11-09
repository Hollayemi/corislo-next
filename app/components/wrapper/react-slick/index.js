import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';


const settings = {
    infinite: true,
    // centerMode: true,
    variableWidth: true,
    autoplaySpeed: 5000,
    // slidesToScroll: 1,
    slideToShow: 1,
    autoplay: true,
    pauseOnHover: true,
};
const configs = {
    1: settings
}


const ReactSlickSlider = ({ config = 1, children }) => {
    return (
      <Box className="custom-slider">
        <Slider {...configs[config]}>{children}</Slider>
      </Box>
    );
}

export default ReactSlickSlider