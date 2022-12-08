// import Image from 'next/image';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-in-out',
    useTransform: false,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        <SliderItem src='/2.jpeg' />
        <SliderItem src='/1.jpeg' />
      </Slider>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div`
  width: 100%;
  overflow-y: hidden;
`;

const SliderItem = styled.img`
  width: 100%;
  height: 100vh;
`;
