import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 1200px;
  padding: 30px 100px 30px;
  margin: 0 auto;
  box-sizing: content-box;
`;

export const Header = styled.header`
  border-bottom: 2px solid #555555;
`;

export const CreateProductTitle = styled.h1`
  font-size: 38px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  margin-top: 15px;
`;

export const ProductInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductLabel = styled.label`
  width: 100px;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 0.7rem;
`;

export const ProductLocationMap = styled.div`
  width: 384px;
  height: 252px;
  z-index: -1;
`;

export const ProductInput = styled.input`
  width: 1200px;
  height: 56px;
  padding: 10px;
  border: 1px solid #ccc;
`;

export const ProductMapWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

export const ProductMapInner = styled.div`
  display: flex;
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
  padding: 10px;
  border: 1px solid #ccc;
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
  width: 802px;
  height: 56px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
`;

export const ProductPhotoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 40px 20px;
`;

export const ProductPhoto = styled.div`
  display: flex;
`;

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #555555;
  padding: 40px 20px;
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
  margin-top: 10px;
`;
