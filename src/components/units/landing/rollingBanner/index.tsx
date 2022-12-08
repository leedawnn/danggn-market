import styled from '@emotion/styled';

const RollingBanner = () => {
  return (
    <Wrapper>
      <SlideTextInner>
        {Array(10)
          .fill(1)
          .map((_, index) => index <= 9 && <SlideText>NICE TO MEET YOU / DANGGEN</SlideText>)}
      </SlideTextInner>
    </Wrapper>
  );
};
export default RollingBanner;

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
  height: 26px;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
`;

const SlideTextInner = styled.div`
  white-space: nowrap;
  will-change: transform;
  animation: slideText 20s linear infinite;

  @keyframes slideText {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }
`;

const SlideText = styled.span`
  margin: 0 1rem;
`;
