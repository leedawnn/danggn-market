// import Image from 'next/image';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: 'ease-in-out',
    useTransform: false,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        <SliderItem src='/2.jpeg' />
        <SliderItem src='/1.jpeg' />
      </Slider>
      <SlideContent>
        <ContentTitle>국내 최초 반려동물만을 위한 중고마켓</ContentTitle>
        <Content>
          중고 거래부터 반려동물 정보까지, 반려인과 함께해요.
          <br /> 내 새꾸 자랑도 하고 꿀팁도 얻어가세요 :)
        </Content>
        <Link href='/market/create'>
          <a>
            <MoveToMarketBtn>판매하기</MoveToMarketBtn>
          </a>
        </Link>
      </SlideContent>
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

const SlideContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: focus-in-expand-fwd 0.4s linear both;
  text-align: center;
`;

const ContentTitle = styled.span`
  color: #ffffff;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 3px;
`;

const Content = styled.p`
  color: #ffffff;
  margin: 1rem 0;
`;

const MoveToMarketBtn = styled.button`
  width: 120px;
  color: #ffffff;
  border: 1px solid #ffffff;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0);
  margin-top: 1rem;
  cursor: pointer;
`;
