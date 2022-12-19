import styled from '@emotion/styled';

const NotFoundPage = () => {
  return (
    <Wrapper>
      <Header>페이지를 찾을 수 없습니다 🥲</Header>
      <ErrorImg src='/404.png' />
    </Wrapper>
  );
};
export default NotFoundPage;

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
  background-color: #ecedf1;
`;

const Header = styled.h2`
  font-size: 36px;
`;

const ErrorImg = styled.img`
  width: 50%;
  height: 50%;
`;
