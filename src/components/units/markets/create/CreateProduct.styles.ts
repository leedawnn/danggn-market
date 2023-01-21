import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 1200px;
  padding: 50px 100px 80px;
  margin: 0 auto;
  box-sizing: content-box;
`;

export const Header = styled.header`
  border-bottom: 2px solid #555555;
  padding-bottom: 20px;
`;

export const CreateProductTitle = styled.h1`
  font-size: 38px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export const ProductLabel = styled.label`
  width: 100px;
  font-size: 22px;
  font-weight: 500;
`;

export const ProductLocationMap = styled.div`
  width: 384px;
  height: 252px;
  z-index: -1;
`;

export const ProductInput = styled.input`
  width: 1117px;
  height: 56px;
  padding: 10px;
  background-color: #e9e9e9;
`;

export const ProductMapWrapper = styled.div`
  display: flex;
  margin-top: 40px;
`;

export const ProductMapLeft = styled.div`
  display: flex;
`;

export const ProductMapRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export const ZipcodeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
`;

export const ZipcodeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ZipcodeInput = styled.input`
  width: 77px;
  height: 52px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #bdbdbd;
`;

export const ZipcodeSearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 51px;
  color: #ffffff;
  background-color: #000000;
  cursor: pointer;
`;

export const AddressInput = styled.input`
  width: 702px;
  height: 56px;
  background-color: #e9e9e9;
  margin-top: 20px;
  padding: 10px;
`;

export const ProductPhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 20px 20px 0px;
`;

export const ProductPhoto = styled.div`
  display: flex;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #555555;
  padding: 20px;
`;

export interface IButtonProps {
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

export const ValidErrorMsg = styled.div`
  color: tomato;
`;
