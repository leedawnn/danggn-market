import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { CREATE_USED_ITEM_QUESTION } from './ProductsComment.queries';
import { FETCH_USED_ITEM_QUESTIONS } from '../list/ProductsCommentList.queries';

export default function CreateProductsComment() {
  const router = useRouter();

  const [contents, setContents] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [createUseditemQuestion] = useMutation(CREATE_USED_ITEM_QUESTION);

  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onClickCreateComment = async () => {
    await createUseditemQuestion({
      variables: {
        createUseditemQuestionInput: {
          contents,
        },
        useditemId: String(router.query.productId),
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM_QUESTIONS,
          variables: { useditemId: String(router.query.productId) },
        },
      ],
    });
    setContents('');
  };

  return (
    <Wrapper>
      <CommentTitle>댓글</CommentTitle>
      <DivideLine />
      <CommentInput type='text' value={contents} onChange={onChangeComment} />
      <CreateCommentButton onClick={onClickCreateComment}>작성하기</CreateCommentButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 2rem;
`;

const DivideLine = styled.hr`
  border-bottom: 2px solid #555555;
`;

const CommentTitle = styled.span`
  font-size: 28px;
  font-weight: 700;
  padding: 20px 0px;
`;

const CommentInput = styled.input`
  height: 147px;
  background-color: #e9e9e9;
  border: none;
  padding: 10px;
  margin-top: 20px;
  :focus {
    outline: none;
  }
`;

const CreateCommentButton = styled.button`
  width: 116px;
  height: 42px;
  color: #000000;
  font-size: 20px;
  font-weight: 700;
  background-color: #ffe004;
  margin-top: 20px;
  cursor: pointer;
`;
