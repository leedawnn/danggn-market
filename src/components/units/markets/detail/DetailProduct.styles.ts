import styled from '@emotion/styled';
import { IoHeartOutline } from 'react-icons/io5';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
  padding: 0px 200px;
  margin-top: 2.2rem;
`;

export const ProductDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
`;

export const ProductImg = styled.img`
  width: 400px;
  height: 400px;
`;

export const ProductDetail1 = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 3px solid #555555;
`;

export const ProductName = styled.span`
  color: #000000;
  font-size: 36px;
  font-weight: 700;
`;

export const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 500;
`;

export const PriceWon = styled.span`
  font-size: 20px;
  font-weight: 400;
`;

export const ProductDetail2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #c0c0c0;
`;

export const ProductRemarks = styled.p`
  font-size: 1rem;
  padding: 20px;
  cursor: auto;
`;

export const ProductTags = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const ProductTag = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #000000;
  border: none;
  border-radius: 15px;
  padding: 5px;
  margin-right: 10px;
  background-color: #ffe004;
`;

export const TagSpan = styled.span`
  width: 100px;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
`;

export const ProductsButtonWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

interface isLikeToggle {
  isLike: boolean;
}

export const DipButton = styled.button<isLikeToggle>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 80px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  background-color: ${(props) => (props.isLike ? '#f00' : '#c9c9c9')};
  cursor: pointer;
`;

export const FillHeartIcon = styled(IoHeartOutline)`
  font-size: 32px;
  margin-right: 4px;
`;

export const BasketButton = styled.button`
  width: 200px;
  height: 80px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  background-color: #a0a0a0;
  cursor: pointer;
`;

export const PurchaseButton = styled.button`
  width: 200px;
  height: 80px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  background-color: #000000;
  cursor: pointer;
`;

export const ProductBodyWrapper = styled.div`
  display: flex;
`;

export const ProductBodyLeftWrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

export const DivideLine = styled.hr`
  border-bottom: 2px solid #555555;
`;

export const ProductContents = styled.p`
  margin-top: 1rem;
  overflow-y: scroll;
`;

export const ProductBodySpan = styled.p`
  font-size: 28px;
  font-weight: 700;
  cursor: auto;
`;

export const ProductMapWrapper = styled.div`
  margin-top: 60px;
`;

export const ProductMapSpan = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

export const ProductBodyRightWrapper = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductSellerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #555555;
`;

export const SellerProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
`;

export const ProductSellerProfile = styled.div`
  display: flex;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 30px;
`;

export const ProductSellerName = styled.span`
  display: flex;
  font-size: 26px;
  font-weight: 400;
  padding: 30px 0px;
`;
