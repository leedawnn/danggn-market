import * as S from './Cart.styles';

import { putOnComma } from '../../../../commons/libraries/utils';
import { IUseditem } from '../../../../commons/types/generated/types';

interface ICartUIProps {
  baskets: IUseditem[];
  handleImageError: (event: any) => void;
}

const CartUI = ({ baskets, handleImageError }: ICartUIProps) => {
  const isEmptyBaskets = baskets.length === 0;

  return (
    <S.Wrapper>
      <S.CartWrapper>
        <S.CartHeader>
          <h2>장바구니</h2>
        </S.CartHeader>
        <S.CartBody>
          {isEmptyBaskets ? (
            <S.EmptyCartWrapper>
              <S.EmptyCartIcon />
              <S.EmptyTitle>EMPTY</S.EmptyTitle>
              <S.DivideLine />
              <S.EmptyCartSpan>NO ITEM IN SHOPPING CART</S.EmptyCartSpan>
              <S.EmptyCartSpan>
                장바구니가 비어있습니다. <br />
                선택하신 상품을 장바구니에 담아주세요.
              </S.EmptyCartSpan>
            </S.EmptyCartWrapper>
          ) : (
            baskets.map((el) => (
              <S.Row key={el._id}>
                <S.ImageWrapper>
                  <S.ProductImage
                    key={el._id}
                    src={`https://storage.googleapis.com/${el.images?.[0]}`}
                    onError={handleImageError}
                  />
                </S.ImageWrapper>
                <S.Column>{el.name}</S.Column>
                <S.ProductPrice>{putOnComma(el.price)}원</S.ProductPrice>
                <S.Column>{el.remarks}</S.Column>
              </S.Row>
            ))
          )}
        </S.CartBody>
      </S.CartWrapper>
    </S.Wrapper>
  );
};

export default CartUI;
