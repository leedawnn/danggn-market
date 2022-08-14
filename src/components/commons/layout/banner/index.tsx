import Image from 'next/image';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  };
  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <Image src='/1.jpeg' layout='fill' />
        </div>
        <div>
          <Image src='/2.jpeg' layout='fill' />
        </div>
      </Slider>
    </Wrapper>
  );
};
export default Banner;

export const Wrapper = styled.div`
  height: 1200px;
`;
