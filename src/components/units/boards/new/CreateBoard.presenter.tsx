import * as S from './CreateBoard.styles';
import { ICreateBoardUIprops } from './CreateBoard.types';
import Uploads01 from '../../../commons/uploads/01/Uploads01.container';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';

const CreateBoardUI = (props: ICreateBoardUIprops) => {
  const [userInfo] = useRecoilState(userInfoState);

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>게시물 {props.isEdit ? '수정' : '등록'}</S.Title>
        <S.PostForm>
          <S.UserContainer>
            <S.UserName>
              <S.UserSpan>작성자</S.UserSpan>
              <S.UserInput
                type='text'
                placeholder='이름을 적어주세요.'
                onChange={props.onChangeWriter}
                value={userInfo?.name || ''}
                defaultValue={userInfo?.name || ''}
                readOnly={!!userInfo?.name}
              />
              <S.ErrorMsg>{props.writerError}</S.ErrorMsg>
            </S.UserName>
            <S.UserPw>
              <S.UserSpan>비밀번호</S.UserSpan>
              <S.UserInput type='password' placeholder='비밀번호를 입력해주세요.' onChange={props.onChangePw} />
              <S.ErrorMsg>{props.PwError}</S.ErrorMsg>
            </S.UserPw>
          </S.UserContainer>
          <S.TitleContainer>
            <S.TitleSpan>제목</S.TitleSpan>
            <S.TitleInput
              type='text'
              placeholder='제목을 작성해주세요.'
              onChange={props.onChangeTitle}
              defaultValue={props.data?.fetchBoard.title}
            />
            <S.ErrorMsg>{props.titleError}</S.ErrorMsg>
          </S.TitleContainer>
          <S.ContentsContainer>
            <S.ContentsSpan>내용</S.ContentsSpan>
            <S.ContentsInput
              placeholder='내용을 작성해주세요.'
              onChange={props.onChangeContents}
              defaultValue={props.data?.fetchBoard.contents}
            />
            <S.ErrorMsg>{props.contentError}</S.ErrorMsg>
          </S.ContentsContainer>
          <S.AddressSpan>주소</S.AddressSpan>
          <S.AddressContainer>
            <S.AddressNumber
              placeholder='07250'
              value={props.zipcode || props.data?.fetchBoard.boardAddress?.zipcode || ''}
            />
            <S.AddressBtn onClick={props.onClickAddressSearch}>우편번호 검색</S.AddressBtn>
          </S.AddressContainer>
          <S.AddressInput
            type='text'
            placeholder='주소'
            defaultValue={props.data?.fetchBoard.boardAddress?.address || ''}
          />
          <S.AddressInput
            type='text'
            placeholder='상세 주소'
            defaultValue={props.data?.fetchBoard.boardAddress?.addressDetail || ''}
          />
          <S.YoutubeContainer>
            <S.YoutubeSpan onChange={props.onChangeYoutubeUrl}>유튜브</S.YoutubeSpan>
            <S.YoutubeInput
              type='text'
              placeholder='링크를 복사해주세요.'
              defaultValue={props.data?.fetchBoard.youtubeUrl || ''}
            />
          </S.YoutubeContainer>
          <S.PhotoContainer>
            <S.PhotoSpan>사진 첨부</S.PhotoSpan>
            <S.PhotoItems>
              {props.fileUrls.map((el, index) => (
                <Uploads01 key={uuidv4()} index={index} fileUrl={el} onChangeFileUrls={props.onChangeFileUrls} />
              ))}
            </S.PhotoItems>
          </S.PhotoContainer>
          <S.MainSetting>
            <S.MainSettingSpan>메인 설정</S.MainSettingSpan>
            <S.SettingInputs>
              <S.SettingRadioButton type='radio' id='youtube' name='chk_main' checked /> 유튜브
              <S.SettingRadioButton type='radio' id='image' name='chk_main' /> 사진
            </S.SettingInputs>
          </S.MainSetting>
          <S.BtnContainer>
            <S.RegisterBtn type='button' onClick={props.isEdit ? props.onClickUpdate : props.onClickCreateBoard}>
              {props.isEdit ? '수정' : '등록'}하기
            </S.RegisterBtn>
          </S.BtnContainer>
        </S.PostForm>
      </S.Container>
    </S.Wrapper>
  );
};
export default CreateBoardUI;
