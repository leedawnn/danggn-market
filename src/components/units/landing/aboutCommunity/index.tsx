import styled from '@emotion/styled';
import Button01 from '../../../commons/buttons/01';

const AboutCommunity = () => {
  return (
    <>
      <Wrapper>
        <CommunityWrapper>
          <CommunityImage src='/1.jpeg' alt='반려동물 커뮤니티 소개 이미지' />
          <CommunityInner>
            <CommunityTitle>
              반려동물과 <br /> 함께하는 커뮤니티
            </CommunityTitle>
            <CommunitySpan>매일 업데이트되는 인기글!</CommunitySpan>
            <CommunitySpan>내새꾸 자랑부터 궁금증까지 재밌게 소통해요 🐶</CommunitySpan>
            <Button01 url='/board' title='커뮤니티 바로가기' />
          </CommunityInner>
        </CommunityWrapper>
      </Wrapper>
    </>
  );
};
export default AboutCommunity;

const Wrapper = styled.section`
  width: 100vw;
  background-color: #fbf7f2;
  padding: 5rem 10rem;
`;

const CommunityWrapper = styled.div`
  width: 1172px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const CommunityImage = styled.img`
  width: 500px;
  height: 500px;
`;

const CommunityInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommunityTitle = styled.h1`
  font-size: 4rem;
`;

const CommunitySpan = styled.span`
  margin-bottom: 0.2rem;
`;
