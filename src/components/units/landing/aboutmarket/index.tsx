import styled from '@emotion/styled';
import Button01 from '../../../commons/buttons/01';

const AboutMarket = (props: any) => {
  return (
    <Wrapper>
      <MarketWrapper>
        <MarketInner>
          <MarketTitle>
            오로지, <br />
            댕냥이를 위한 중고마켓
          </MarketTitle>
          <MarketSpan>반려인들과의 따듯한 거래를 지금 경험해보세요 🤗 </MarketSpan>
          <ButtonWrapper>
            <Button01 title='인기 매물 보기' onMoveToElement={props.onMoveToElement} />
            <Button01 url='/market' title='믿을 수 있는 중고거래' />
          </ButtonWrapper>
        </MarketInner>
        <MarketImage src='/2.jpeg' alt='반려동물 중고마켓 소개 이미지' />
      </MarketWrapper>
    </Wrapper>
  );
};

export default AboutMarket;

const Wrapper = styled.section`
  width: 100vw;
  background-color: #ffffff;
  padding: 5rem 10rem;
`;

const MarketWrapper = styled.div`
  width: 1172px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const MarketInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const MarketImage = styled.img`
  width: 500px;
  height: 500px;
`;

const MarketTitle = styled.h1`
  font-size: 4rem;
`;

const MarketSpan = styled.span`
  margin-bottom: 0.2rem;
`;

const ButtonWrapper = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
`;
