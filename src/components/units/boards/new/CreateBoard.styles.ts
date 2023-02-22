import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50px 100px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 4px 16px 0px #00000033;
  padding: 10px 100px;
`;

export const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 53px;
  color: #000000;
  font-size: 36px;
  padding-top: 30px;
`;

export const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  margin-bottom: 52px;
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 92px;
  margin-right: 24px;
`;

export const UserInput = styled.input`
  height: 52px;
  border: 1px solid #bdbdbd;
  padding: 16px;
`;

export const UserSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 12px;
`;

export const UserPw = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 92px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 92px;
  margin: 18px 0;
`;

export const TitleSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 12px;
`;

export const TitleInput = styled.input`
  height: 52px;
  border: 1px solid #bdbdbd;
  padding: 16px;
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 520px;
`;

export const ContentsSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 12px;
`;

export const ContentsInput = styled.textarea`
  height: 480px;
  padding: 16px;
  border: 1px solid #bdbdbd;
  ::placeholder {
    text-align: start;
  }
`;

export const AddressSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin: 16px 0px;
`;

export const AddressContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
`;

export const AddressNumber = styled.input`
  width: 77px;
  height: 52px;
  text-align: center;
  margin-right: 16px;
  border: 1px solid #bdbdbd;
`;

export const AddressBtn = styled.button`
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

export const AddressInput = styled.input`
  height: 52px;
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #bdbdbd;
`;

export const YoutubeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 92px;
  margin-bottom: 18px;
`;

export const YoutubeSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin: 16px 0px;
`;

export const YoutubeInput = styled.input`
  height: 52px;
  border: 1px solid #bdbdbd;
  padding: 16px;
`;

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 282px;
  height: 118px;
`;

export const PhotoSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin: 16px 0px;
`;

export const PhotoItems = styled.div`
  display: flex;
`;

export const PhotoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 78px;
  border: 2px dotted black;
  margin-right: 10px;
  cursor: pointer;
`;

export const MainSetting = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  margin-top: 30px;
`;

export const MainSettingSpan = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const SettingInputs = styled.div`
  display: flex;
  align-items: center;
`;

export const SettingRadioButton = styled.input`
  margin: 0 6px;

  :first-of-type {
    margin: 0 6px 0 0;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const RegisterBtn = styled.button`
  width: 179px;
  height: 52px;
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  background-color: #ffd600;
  cursor: pointer;
`;

export const ErrorMsg = styled.div`
  color: tomato;
  margin-top: 4px;
`;
