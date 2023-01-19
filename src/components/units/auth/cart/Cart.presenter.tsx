import { putOnComma } from '../../../../commons/libraries/utils';
import { IUseditem } from '../../../../commons/types/generated/types';
import * as S from './Cart.styles';

interface ICartUIProps {
  baskets: IUseditem[];
  handleImageError: (event: any) => void;
}

const CartUI = ({ baskets, handleImageError }: ICartUIProps) => {
  return (
    <S.Wrapper>
      <S.CartWrapper>
        <S.CartHeader>
          <h2>장바구니</h2>
        </S.CartHeader>
        <S.CartBody>
          {baskets.map((el) => (
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
          ))}
        </S.CartBody>
      </S.CartWrapper>
    </S.Wrapper>
  );
};

export default CartUI;
