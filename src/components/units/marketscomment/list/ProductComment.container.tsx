import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { IQuery, IQueryFetchUseditemQuestionsArgs } from '../../../../commons/types/generated/types';
import ProductsCommentListUI from './ProductsComment.presenter';
import { FETCH_USED_ITEM_QUESTIONS } from './ProductsCommentList.queries';

const ProductCommentList = () => {
  const router = useRouter();

  const { data, fetchMore } = useQuery<Pick<IQuery, 'fetchUseditemQuestions'>, IQueryFetchUseditemQuestionsArgs>(
    FETCH_USED_ITEM_QUESTIONS,
    {
      variables: { useditemId: String(router.query.productId) },
    }
  );

  // const onLoadMore = () => {
  //   if (!data) return;

  //   fetchMore({
  //     variables: {
  //       page: Math.ceil(data.fetchUseditemQuestions.length / 10) + 1,
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult.fetchUseditemQuestions)
  //         return { fetchUseditemQuestions: [...prev.fetchUseditemQuestions] };

  //       return {
  //         fetchUseditemQuestions: [...prev.fetchUseditemQuestions, ...fetchMoreResult.fetchUseditemQuestions],
  //       };
  //     },
  //   });
  // };

  return <ProductsCommentListUI data={data} />;
};

export default ProductCommentList;
