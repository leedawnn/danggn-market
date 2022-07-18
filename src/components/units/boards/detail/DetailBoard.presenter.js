import * as S from './DetailBoard.styles';

const DetailBoardUI = (props) => {
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.UserInfo>
            <S.ProfileIcon />
            <S.PostInfo>
              <S.UserName>{props.data?.fetchBoard?.writer}</S.UserName>
              <S.CreatedDate>{props.data?.fetchBoard?.createdAt}</S.CreatedDate>
            </S.PostInfo>
          </S.UserInfo>
          <S.BoardContents>
            <S.Title>{props.data?.fetchBoard?.title}</S.Title>
            <S.Content>{props.data?.fetchBoard?.contents}</S.Content>
          </S.BoardContents>
          <S.BoardLike>
            {/* <Image src='/public/images/thumbsUp.svg' width={20} height={20} />
        <Image src='/public/images/thumbsDown.svg' width={20} height={20} /> */}
          </S.BoardLike>
        </S.Container>
        <S.BtnWrapper>
          <S.Button>목록으로</S.Button>
          <S.Button onClick={props.onClickMoveToEdit}>수정하기</S.Button>
          <S.Button>삭제하기</S.Button>
        </S.BtnWrapper>
      </S.Wrapper>
    </>
  );
};
export default DetailBoardUI;
