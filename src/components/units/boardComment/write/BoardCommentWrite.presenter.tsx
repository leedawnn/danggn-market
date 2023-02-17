import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';
import * as S from './BoardCommentWrite.styles';
import { IBoardCommentWriteUIProps } from './BoardCommentWrite.types';

export default function BoardCommentWriteUI(props: IBoardCommentWriteUIProps) {
  const [userInfo] = useRecoilState(userInfoState);

  return (
    <S.Wrapper>
      {!props.isEdit && (
        <>
          <S.CommentIcon />
          <span>댓글</span>
        </>
      )}
      <S.InputWrapper>
        <S.Input
          placeholder='작성자'
          defaultValue={userInfo ? userInfo?.name : ''}
          value={userInfo?.name || ''}
          readOnly={!!userInfo?.name}
          onChange={props.onChangeWriter}
        />
        <S.Input type='password' placeholder='비밀번호' onChange={props.onChangePassword} />
        <S.Star onChange={props.setStar} />
      </S.InputWrapper>
      <S.ContentsWrapper>
        <S.Contents
          maxLength={100}
          onChange={props.onChangeContents}
          placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
          value={props.isEdit ? props.contents || props.el?.contents : props.contents}
        />
        <S.BottomWrapper>
          <S.ContentsLength>
            {(props.contents ? props.contents.length : props.el?.contents.length) || 0}
            /100
          </S.ContentsLength>
          <S.Button onClick={props.isEdit ? props.onClickUpdate : props.onClickWrite}>
            {props.isEdit ? '수정하기' : '등록하기'}
          </S.Button>
        </S.BottomWrapper>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}
