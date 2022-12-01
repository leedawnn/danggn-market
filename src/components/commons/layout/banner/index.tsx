// import Image from 'next/image';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: 'linear',
  };
  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <SliderItem src='/1.jpeg' />
        </div>
        <div>
          <SliderItem src='/2.jpeg' />
        </div>
      </Slider>
    </Wrapper>
  );
};
export default Banner;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow-y: hidden;
`;

const SliderItem = styled.img`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  overflow: auto;
`;
