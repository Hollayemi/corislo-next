import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';


const settings = {
  infinite: true,
  // centerMode: true,
  variableWidth: true,
  autoplaySpeed: 5000,
  slideToShow: 1,
  autoplay: true,
  adaptiveHeight: true,
  pauseOnHover: true,
};

const settings2 = {
  ...settings,
  variableWidth: false,
};
const configs = {
    1: settings,
    2: settings2
}


const ReactSlickSlider = ({ config = 1, children, noArrowStyle, hideArrow }) => {
  return (
    <Box className={`${!noArrowStyle && "custom-slider"} ${hideArrow && "hideArrow"}`}>
      <Slider {...configs[config]}>{children}</Slider>
    </Box>
  );
};

export default ReactSlickSlider