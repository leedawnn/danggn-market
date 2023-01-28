import styled from '@emotion/styled';
import { GiShoppingCart } from 'react-icons/gi';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100%;
  padding-bottom: 154px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const CartHeader = styled.div`
  border-bottom: 2px solid #808080;
`;

export const CartWrapper = styled.div`
  width: 90%;
  height: 100%;
`;

export const CartBody = styled.div`
  margin-top: 0.2rem;
`;

export const Row = styled.div`
  display: flex;
  border-bottom: 1px solid rgb(238, 238, 238);
  padding: 1rem 0;
`;

export const ImageWrapper = styled.div``;

export const Column = styled.div`
  width: 25%;
`;

export const ProductPrice = styled.div`
  width: 25%;
  font-weight: 700;
`;

export const ProductImage = styled.img`
  width: 180px;
  height: 180px;
`;

export const EmptyCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const EmptyCartIcon = styled(GiShoppingCart)`
  color: #000000d9;
  font-size: 120px;
  margin-bottom: 1rem;
`;

export const EmptyTitle = styled.h2`
  color: #a0a0a0;
  font-size: 32px;
  letter-spacing: 0.5rem;
`;

export const DivideLine = styled.hr`
  width: 50%;
  margin-bottom: 1rem;
`;

export const EmptyCartSpan = styled.span`
  color: #000000d9;
  font-size: 22px;
  text-align: center;
  margin-bottom: 2rem;
`;
