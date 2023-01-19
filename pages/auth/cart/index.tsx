import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { withAuth } from '../../../src/commons/libraries/withAuth';
import { IUseditem } from '../../../src/commons/types/generated/types';
import { CartState } from '../../../src/commons/store';
import { useRecoilState } from 'recoil';

const CartPage = () => {
  const [bucketIsActive] = useRecoilState(CartState);

  const [baskets, setBaskets] = useState<IUseditem[]>([]);

  const handleImageError = (event: any) => {
    event.target.src = '/default.png';
  };

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('baskets') || '[]');
    setBaskets(result);
  }, []);

  return (
    <Wrapper>
      {baskets.map((el) => (
        <Row key={el._id}>
          <ImageWrapper>
            <ProductImage
              key={el._id}
              src={`https://storage.googleapis.com/${el.images?.[0]}`}
              onError={handleImageError}
            />
          </ImageWrapper>
          <Column>{el.name}</Column>
          <Column>{el.price}</Column>
          <Column>{el.remarks}</Column>
        </Row>
      ))}
    </Wrapper>
  );
};
export default withAuth(CartPage);

const Wrapper = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div``;

const Column = styled.div`
  width: 25%;
`;

const ProductImage = styled.img`
  width: 180px;
  height: 180px;
`;
