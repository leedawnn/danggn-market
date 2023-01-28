import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { IQuery, IQueryFetchUseditemArgs, IUseditem } from '../../../commons/types/generated/types';
import { FETCH_USED_ITEM } from '../../units/markets/detail/DetailProduct.queries';

interface IProductProps {
  key: any;
  productId: any;
}

const ViewedProduct = ({ key, productId }: IProductProps) => {
  const [_, setViewedData] = useState<IUseditem[]>([]);

  const { data } = useQuery<Pick<IQuery, 'fetchUseditem'> | undefined, IQueryFetchUseditemArgs>(FETCH_USED_ITEM, {
    variables: { useditemId: productId },
  });

  const handleImageError = (event: any) => {
    event.target.src = '/default.png';
  };

  useEffect(() => {
    setViewedData(data?.fetchUseditem);
  }, []);

  return (
    <>
      <div key={key}>
        <ProductImg
          src={`https://storage.googleapis.com/${data?.fetchUseditem.images?.[0]}`}
          alt={data?.fetchUseditem.name}
          onError={handleImageError}
        />
      </div>
    </>
  );
};

export default ViewedProduct;

const ProductImg = styled.img`
  width: 70px;
  height: 70px;

  :first-child {
    margin-bottom: 4px;
  }
`;
