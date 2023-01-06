import * as S from './DetailBoard.styles';
import { getDate } from '../../../../commons/libraries/utils';
import { IDetailBoardUIProps } from './DetailBoard.types';

const DetailBoardUI = (props: IDetailBoardUIProps) => {
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.UserInfo>
            <S.ProfileIcon />
            <S.PostInfo>
              <S.UserName>{props.data?.fetchBoard?.writer}</S.UserName>
              <S.CreatedDate>{getDate(props.data?.fetchBoard?.createdAt)}</S.CreatedDate>
            </S.PostInfo>
          </S.UserInfo>
          <S.BoardContents>
            <S.Title>{props.data?.fetchBoard?.title}</S.Title>
            <S.ImageWrapper>
              {props.data?.fetchBoard.images
                ?.filter((el: string) => el)
                .map((el: string) => (
                  <S.Image key={el} src={`https://storage.googleapis.com/${el}`} />
                ))}
            </S.ImageWrapper>
            <S.Content>{props.data?.fetchBoard?.contents}</S.Content>
          </S.BoardContents>
          <S.BoardLike>
            <S.LikesWrapper>
              <S.LikeIcon onClick={props.onClickLike} />
              <S.LikeCount>{props.data?.fetchBoard.likeCount}</S.LikeCount>
            </S.LikesWrapper>
            <S.LikesWrapper>
              <S.DisLikeIcon onClick={props.onClickDislike} />
              <S.DisLikeCount>{props.data?.fetchBoard.dislikeCount}</S.DisLikeCount>
            </S.LikesWrapper>
          </S.BoardLike>
        </S.Container>
        <S.BtnWrapper>
          <S.Button onClick={props.onClickMoveToBoards}>목록으로</S.Button>
          <S.Button onClick={props.onClickMoveToEdit}>수정하기</S.Button>
          <S.Button onClick={props.onClickDelete}>삭제하기</S.Button>
        </S.BtnWrapper>
      </S.Wrapper>
    </>
  );
};
export default DetailBoardUI;
