import InfiniteScroll from 'react-infinite-scroller';
import { IQuery } from '../../../../commons/types/generated/types';
import ProductsCommentListUIItem from './ProductsComment.presenterItem';

interface IProductCommentListProps {
  data?: Pick<IQuery, 'fetchUseditemQuestions'> | undefined;
  // onLoadMore: () => void;
}

const ProductsCommentListUI = ({ data }: IProductCommentListProps) => {
  if (!data) return <div />;

  return (
    <div style={{ maxHeight: '700px', overflow: 'auto' }}>
      {/* <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}> */}
      {data?.fetchUseditemQuestions.map((el) => (
        <ProductsCommentListUIItem key={el._id} el={el} />
      ))}
      {/* </InfiniteScroll> */}
    </div>
  );
};
export default ProductsCommentListUI;
