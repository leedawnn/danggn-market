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
  height: 800px;
  overflow-x: hidden;
`;

const SliderItem = styled.img`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 960px;
  margin: auto;
  overflow: auto;
`;
