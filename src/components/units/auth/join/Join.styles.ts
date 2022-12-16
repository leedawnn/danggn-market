import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 742px;
  height: 700px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.07);
`;

export const JoinHeader = styled.header`
  display: flex;
  width: 80%;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #c9c9c9;
  padding: 30px 30px 30px 0px;
`;

export const JoinTitle = styled.span`
  font-size: 40px;
  font-weight: 700;
`;

export const JoinSubtitle = styled.span`
  font-size: 28px;
  font-weight: 400;
  margin-left: 12px;
`;

export const JoinBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const JoinInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const JoinLabel = styled.label`
  font-size: 20px;
  font-weight: 400;
`;

export const JoinInput = styled.input`
  width: 600px;
  height: 50px;
  background-color: #f6f6f6;
  padding: 15px;
  margin: 20px 0px 0px 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

interface IButtonProps {
  isCancle: boolean;
}

export const FormButton = styled.button<IButtonProps>`
  width: 150px;
  height: 50px;
  color: ${(props) => (props.isCancle ? '#000000' : '#ffffff')};
  font-weight: 700;
  margin-left: 20px;
  background-color: ${(props) => (props.isCancle ? '#FFE004' : '#000000')};
  cursor: pointer;
`;

export const JoinFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
`;
