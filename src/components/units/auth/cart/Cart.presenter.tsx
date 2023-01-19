import { IUseditem } from '../../../../commons/types/generated/types';
import * as S from './Cart.styles';

interface ICartUIProps {
  baskets: IUseditem[];
  handleImageError: (event: any) => void;
}

const CartUI = ({ baskets, handleImageError }: ICartUIProps) => {
  return (
    <S.Wrapper>
      <h2>장바구니</h2>
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
          <S.Column>{el.price}</S.Column>
          <S.Column>{el.remarks}</S.Column>
        </S.Row>
      ))}
    </S.Wrapper>
  );
};

export default CartUI;
