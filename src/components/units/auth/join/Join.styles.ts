import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  margin-top: 12px;
`;

export const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 348px;
  max-width: 350px;
  padding: 20px;
  border: 1px solid #c9c9c9;
  margin: 0 0 10px;
`;

export const JoinHeader = styled.header`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: left;
  align-items: center;
`;

export const JoinTitle = styled.h2`
  color: #5f5f5f;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
`;

// TODO: 카카오에서 버튼 제공하기 때문에 디자인 x
export const KakaoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  font-size: 14px;
  width: 300px;
  height: 30px;
  background-color: #fef01b;
  padding: 5px 9px;
  cursor: pointer;
`;

export const DivideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

export const DivideLine = styled.hr`
  border: none;
  border-top: 1px solid #cccccc;
  background-color: #cccccc;
  height: 1px;
  width: 40%;
  line-height: 13px;
`;

export const DivideText = styled.span`
  color: #5f5f5f;
  font-size: 13px;
  margin: 0 18px;
`;

export const JoinSubtitle = styled.span`
  font-size: 24px;
  font-weight: 400;
  margin-left: 12px;
`;

export const JoinBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;

export const JoinInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

export const JoinInput = styled.input`
  width: 300px;
  height: 36px;
  background-color: #f6f6f6;
  padding: 10px;
  margin: 10px 0px 0px 5px;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

interface activeBtnProps {
  isValid: boolean;
}

export const JoinButton = styled.button<activeBtnProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 14px;
  width: 300px;
  height: 30px;
  background-color: ${(props) => (props.isValid ? '#000000' : '#c9c9c9')};
  padding: 5px 9px;
  cursor: ${(props) => (props.isValid ? 'pointer' : 'default')};
`;

export const JoinFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 348px;
  max-width: 350px;
  padding: 20px 0;
  border: 1px solid #c9c9c9;
  margin: 0 0 10px;
`;

export const FooterSpan = styled.span`
  margin-right: 10px;
  color: #888888;
`;

export const MovetoLoginSpan = styled.span`
  font-weight: 500;
  text-decoration: underline;
`;

export const ErrorMessage = styled.div`
  color: tomato;
  font-size: 12px;
  margin: 2px 0 0 5px;
`;
