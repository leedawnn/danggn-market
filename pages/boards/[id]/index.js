import styled from '@emotion/styled';
import Image from 'next/image';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const detailBoards = () => {
  const router = useRouter();

  // 게시물 조회 api
  const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
      fetchBoard(boardId: $boardId) {
        _id
        writer
        title
        contents
        createdAt
        likeCount
        dislikeCount
      }
    }
  `;

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.id },
  });

  console.log(data);

  return (
    <>
      <Wrapper>
        <Container>
          <UserInfo>
            <Image src='/public/profile.png' width={46} height={46} />
            <LeftInfo>
              <UserName>{data?.fetchBoard?.writer}</UserName>
              <CreatedDate>{data?.fetchBoard?.createdAt}</CreatedDate>
            </LeftInfo>
            <RightInfo>
              <Image src='/public/images/link.svg' width={26} height={13} />
              <Image src='/public/images/location.svg' width={26} height={13} />
            </RightInfo>
          </UserInfo>
          <BoardContents>
            <Title>{data?.fetchBoard?.title}</Title>
            <Content>{data?.fetchBoard?.contents}</Content>
          </BoardContents>
          <BoardLike>
            <Image src='/public/images/thumbsUp.svg' width={20} height={20} />
            <Image src='/public/images/thumbsDown.svg' width={20} height={20} />
          </BoardLike>
        </Container>
        <BtnWrapper>
          <Button>목록으로</Button>
          <Button>수정하기</Button>
          <Button>삭제하기</Button>
        </BtnWrapper>
      </Wrapper>
    </>
  );
};
export default detailBoards;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 100px;
  flex-wrap: wrap;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1200px;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 4px 20px 0px #00000033;
  padding: 50px 100px;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #bdbdbd;
`;

const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const UserName = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const CreatedDate = styled.span`
  color: #828282;
  font-size: 12px;
  font-weight: 400;
`;

const RightInfo = styled.div`
  display: flex;
`;

const BoardContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 700px;
  padding: 50px 0px;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 700;
`;

const Content = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

const BoardLike = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const BtnWrapper = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #bdbdbd;
  margin: 80px 0px;
  padding-bottom: 80px;
`;

const Button = styled.button`
  width: 180px;
  height: 45px;
  font-weight: 500;
  margin-right: 10px;
  border: 1px solid #bdbdbd;
  background-color: #ffffff;
  cursor: pointer;
`;
