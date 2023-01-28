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
  const [viewedData, setViewedData] = useState<IUseditem[]>([]);

  const { data } = useQuery<Pick<IQuery, 'fetchUseditem'> | undefined, IQueryFetchUseditemArgs>(FETCH_USED_ITEM, {
    variables: { useditemId: productId },
  });

  useEffect(() => {
    setViewedData(data?.fetchUseditem);
  }, []);

  return (
    <>
      <div key={key}>
        <ProductImg
          src={`https://storage.googleapis.com/${data?.fetchUseditem.images?.[0]}`}
          alt={data?.fetchUseditem.name}
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
