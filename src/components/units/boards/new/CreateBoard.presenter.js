import * as S from './CreateBoard.styles.js';

const CreateBoardUI = (props) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>게시물 등록</S.Title>
        <S.PostForm>
          <S.UserContainer>
            <S.UserName>
              <S.UserSpan>
                작성자<span> *</span>
              </S.UserSpan>
              <S.UserInput type='text' placeholder='이름을 적어주세요.' onChange={props.onChangeWriter} />
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
            <S.TitleInput type='text' placeholder='제목을 작성해주세요.' onChange={props.onChangeTitle} />
            <S.ErrorMsg>{props.titleError}</S.ErrorMsg>
          </S.TitleContainer>
          <S.ContentsContainer>
            <S.ContentsSpan>내용</S.ContentsSpan>
            <S.ContentsInput type='text' placeholder='내용을 작성해주세요.' onChange={props.onChangeContents} />
            <S.ErrorMsg>{props.contentError}</S.ErrorMsg>
          </S.ContentsContainer>
          <S.AddressSpan>주소</S.AddressSpan>
          <S.AddressContainer>
            <S.AddressNumber placeholder='07250' />
            <S.AddressBtn>우편번호 검색</S.AddressBtn>
          </S.AddressContainer>
          <S.AddressInput />
          <S.AddressInput />
          <S.YoutubeContainer>
            <S.YoutubeSpan>유튜브</S.YoutubeSpan>
            <S.YoutubeInput type='text' placeholder='링크를 복사해주세요.' />
          </S.YoutubeContainer>
          <S.PhotoContainer>
            <S.PhotoSpan>사진 첨부</S.PhotoSpan>
            <S.PhotoItems>
              <S.PhotoItem />
              <S.PhotoItem />
              <S.PhotoItem />
            </S.PhotoItems>
          </S.PhotoContainer>
          <S.MainSetting>
            <S.MainSettingSpan>메인 설정</S.MainSettingSpan>
            <S.SettingInputs>
              <input type='radio' /> 유튜브
              <input type='radio' /> 사진
            </S.SettingInputs>
          </S.MainSetting>
          <S.BtnContainer>
            <S.RegisterBtn type='button' onClick={props.onClickValidation}>
              등록하기
            </S.RegisterBtn>
          </S.BtnContainer>
        </S.PostForm>
      </S.Container>
    </S.Wrapper>
  );
};
export default CreateBoardUI;
