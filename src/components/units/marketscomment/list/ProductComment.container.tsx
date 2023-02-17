import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ProductsCommentItem from './ProductsComment.presenter';
import { FETCH_USED_ITEM_QUESTIONS } from './ProductsCommentList.queries';

const ProductCommentListContainer = () => {
  const router = useRouter();

  if (typeof router.query.productId !== 'string') return;

  const { data } = useQuery(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: router.query.productId },
  });

  return <ProductsCommentItem data={data} />;
};

export default ProductCommentListContainer;
