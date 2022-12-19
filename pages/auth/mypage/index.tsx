import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { IUseditem } from '../../../src/commons/types/generated/types';
import { v4 as uuidv4 } from 'uuid';

export default function MyPage() {
  const [baskets, setBaskets] = useState<IUseditem[]>([]);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('baskets') || '[]');
    setBaskets(result);
  }, []);

  return (
    <Wrapper>
      {baskets.map((el) => (
        <Row key={uuidv4()}>
          <ImageWrapper>
            {el.images?.[0] ? (
              el.images
                ?.filter((el: string) => el)
                .map((el: string) => <ProductImage key={el} src={`https://storage.googleapis.com/${el}`} />)
            ) : (
              <ProductImage src='/default.png' />
            )}
          </ImageWrapper>
          <Column>{el._id}</Column>
          <Column>{el.name}</Column>
          <Column>{el.price}</Column>
          <Column>{el.contents}</Column>
          <Column>{el.seller?.name}</Column>
        </Row>
      ))}
    </Wrapper>
  );
}

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
