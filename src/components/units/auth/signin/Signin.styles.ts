import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  height: 100%;
  margin: 0px auto;
  padding: 150px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 400px;
  border: 1px solid #e9e9e9;
  border-top: 2px solid black;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 2rem;
`;

export const LoginHeader = styled.div``;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LoginInput = styled.input`
  width: 374px;
  height: 48px;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 6px;

  ::placeholder {
    font-size: 0.8rem;
    color: #adadad;
  }
`;

export const FormDescription = styled.p`
  font-size: 10px;
  color: #adadad;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 198px;
`;

export const UserSignin = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 2rem;
`;

export const FormError = styled.span`
  color: tomato;
`;
