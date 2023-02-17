import ProductsCommentListUIItem from './ProductsComment.presenterItem';

const ProductsCommentItem = (props: any) => {
  return (
    <>
      {props.data?.fetchUseditemQuestions.map((el: any) => (
        <ProductsCommentListUIItem key={el._id} el={el} />
      ))}
    </>
  );
};
export default ProductsCommentItem;
