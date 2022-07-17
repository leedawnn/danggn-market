import styled from '@emotion/styled';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const newBoards = () => {
  // 게시글 등록 api
  const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
      createBoard(createBoardInput: $createBoardInput) {
        _id
        writer
        title
        contents
      }
    }
  `;

  const router = useRouter();

  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  // form 검증 에러메시지
  const [writerError, setWriterError] = useState('');
  const [PwError, setPwError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentsError] = useState('');

  // graphql에 게시글 등록 api 등록
  const [createBoard] = useMutation(CREATE_BOARD);

  // input 감지 이벤트
  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };

  const onChangePw = (event) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  // 폼 유효성 검사
  const onClickValidation = async () => {
    let isCheck = true;

    if (!writer) {
      isCheck = false;
      setWriterError('올바른 이름을 입력해주세요.');
    } else {
      setWriterError('');
    }

    if (!password) {
      isCheck = false;
      setPwError('설정하실 비밀번호를 입력해주세요.');
    } else {
      setPwError('');
    }

    if (!title) {
      isCheck = false;
      setTitleError('제목을 입력해주세요.');
    } else {
      setTitleError('');
    }

    if (contents.length < 10) {
      isCheck = false;
      setContentsError('10자 이상의 내용을 입력해주세요.');
    }

    if (isCheck) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password,
              title,
              contents,
            },
          },
        });
        router.push(`/boards/${result.data.createBoard._id}`);
        Swal.fire('등록 완료!', '게시물이 등록되었습니다.', 'success');
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
      }
    }
  };
  return (
    <Wrapper>
      <Container>
        <Title>게시물 등록</Title>
        <PostForm>
          <UserContainer>
            <UserName>
              <UserSpan>
                작성자<span> *</span>
              </UserSpan>
              <UserInput type='text' placeholder='이름을 적어주세요.' onChange={onChangeWriter} />
              <ErrorMsg>{writerError}</ErrorMsg>
            </UserName>
            <UserPw>
              <UserSpan>비밀번호</UserSpan>
              <UserInput type='password' placeholder='비밀번호를 입력해주세요.' onChange={onChangePw} />
              <ErrorMsg>{PwError}</ErrorMsg>
            </UserPw>
          </UserContainer>
          <TitleContainer>
            <TitleSpan>제목</TitleSpan>
            <TitleInput type='text' placeholder='제목을 작성해주세요.' onChange={onChangeTitle} />
            <ErrorMsg>{titleError}</ErrorMsg>
          </TitleContainer>
          <ContentsContainer>
            <ContentsSpan>내용</ContentsSpan>
            <ContentsInput type='text' placeholder='내용을 작성해주세요.' onChange={onChangeContents} />
            <ErrorMsg>{contentError}</ErrorMsg>
          </ContentsContainer>
          <AddressSpan>주소</AddressSpan>
          <AddressContainer>
            <AddressNumber placeholder='07250' />
            <AddressBtn>우편번호 검색</AddressBtn>
          </AddressContainer>
          <AddressInput />
          <AddressInput />
          <YoutubeContainer>
            <YoutubeSpan>유튜브</YoutubeSpan>
            <YoutubeInput type='text' placeholder='링크를 복사해주세요.' />
          </YoutubeContainer>
          <PhotoContainer>
            <PhotoSpan>사진 첨부</PhotoSpan>
            <PhotoItems>
              <PhotoItem />
              <PhotoItem />
              <PhotoItem />
            </PhotoItems>
          </PhotoContainer>
          <MainSetting>
            <MainSettingSpan>메인 설정</MainSettingSpan>
            <SettingInputs>
              <input type='radio' /> 유튜브
              <input type='radio' /> 사진
            </SettingInputs>
          </MainSetting>
          <BtnContainer>
            <RegisterBtn type='button' onClick={onClickValidation}>
              등록하기
            </RegisterBtn>
          </BtnContainer>
        </PostForm>
      </Container>
    </Wrapper>
  );
};
export default newBoards;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 100px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1200px;
  border: 1px solid black;
  box-shadow: 0px 4px 20px 0px #00000033;
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 53px;
  color: #000000;
  font-size: 36px;
  padding-top: 30px;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 100px;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  margin-bottom: 52px;
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  width: 486px;
  height: 92px;
  margin-right: 24px;
`;

const UserInput = styled.input`
  width: 486px;
  height: 52px;
  border: 1px solid #bdbdbd;
  padding: 16px;
`;

const UserSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const UserPw = styled.div`
  display: flex;
  flex-direction: column;
  width: 486px;
  height: 92px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 92px;
  margin-bottom: 18px;
`;

const TitleSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const TitleInput = styled.input`
  width: 996px;
  height: 52px;
  border: 1px solid #bdbdbd;
  padding: 16px;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 996px;
  height: 520px;
`;

const ContentsSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 12px;
`;

const ContentsInput = styled.textarea`
  width: 996px;
  height: 480px;
  padding: 16px;
  border: 1px solid #bdbdbd;
  ::placeholder {
    text-align: start;
  }
`;

const AddressSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin: 16px 0px;
`;

const AddressContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
`;

const AddressNumber = styled.input`
  width: 77px;
  height: 52px;
  text-align: center;
  margin-right: 16px;
  border: 1px solid #bdbdbd;
`;

const AddressBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 52px;
  color: #ffffff;
  background-color: #000000;
  border: 1px solid #000000;
  cursor: pointer;
`;

const AddressInput = styled.input`
  width: 996px;
  height: 52px;
  margin-bottom: 16px;
  border: 1px solid #bdbdbd;
`;

const YoutubeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 92px;
  margin-bottom: 18px;
`;

const YoutubeSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const YoutubeInput = styled.input`
  width: 996px;
  height: 52px;
  border: 1px solid #bdbdbd;
  padding: 16px;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 282px;
  height: 118px;
`;

const PhotoSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const PhotoItems = styled.div`
  display: flex;
`;

const PhotoItem = styled.div`
  width: 78px;
  height: 78px;
  background-color: gray;
  margin-right: 10px;
`;

const MainSetting = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  margin-bottom: 30px;
`;

const MainSettingSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const SettingInputs = styled.div`
  display: flex;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RegisterBtn = styled.button`
  width: 179px;
  height: 52px;
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #000000;
  background-color: #ffd600;
  cursor: pointer;
`;

const ErrorMsg = styled.div`
  color: tomato;
`;
