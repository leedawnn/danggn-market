import styled from '@emotion/styled';
import { Modal } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  FETCH_USED_ITEM_QUESTIONS,
  DELETE_USED_ITEM_QUESTION,
  UPDATE_USED_ITEM_QUESTION,
} from './ProductsCommentList.queries';
import { getDate } from '../../../../commons/libraries/utils';
import { IProductsCommentCreateProps, IUpdateUseditemQuestionInput } from './ProductsCommentList.types';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';

const CreateProductsCommentList = (props: IProductsCommentCreateProps) => {
  const router = useRouter();

  const [userInfo] = useRecoilState(userInfoState);

  const [isEdit, setIsEdit] = useState(false);
  const [contents, setContents] = useState('');
  const [comment, setComment] = useState('');

  const { data } = useQuery(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: String(router.query.productId) },
  });

  const [updateUseditemQuestion] = useMutation(UPDATE_USED_ITEM_QUESTION);
  const [deleteUseditemQuestion] = useMutation(DELETE_USED_ITEM_QUESTION);

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const onClickEdit = async (event: MouseEvent) => {
    if (!userInfo) return;

    if (isEdit) {
      const updateUseditemQuestionInput: IUpdateUseditemQuestionInput = {};
      if (!contents) updateUseditemQuestionInput.contents = contents;

      try {
        await updateUseditemQuestion({
          variables: {
            updateUseditemQuestionInput,
            useditemQuestionId: String(event.currentTarget.id),
          },
          refetchQueries: [
            {
              query: FETCH_USED_ITEM_QUESTIONS,
              variables: { useditemId: router.query.productId },
            },
          ],
        });
        setIsEdit(true);
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    } else {
      const updateUseditemQuestionInput: IUpdateUseditemQuestionInput = {};
      if (!comment) updateUseditemQuestionInput.contents = comment;

      try {
        await updateUseditemQuestion({
          variables: {
            updateUseditemQuestionInput,
            useditemQuestionId: String(event.currentTarget.id),
          },
          refetchQueries: [
            {
              query: FETCH_USED_ITEM_QUESTIONS,
              variables: { useditemId: router.query.productId },
            },
          ],
        });
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    }
  };

  const onClickDelete = async (event: MouseEvent) => {
    if (!userInfo) return;

    try {
      await deleteUseditemQuestion({
        variables: { useditemQuestionId: String(event.currentTarget.id) },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: String(router.query.productId) },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const handleImageError = (event: any) => {
    event.target.src = '/defaultProfile.png';
  };

  return (
    <Wrapper>
      {data?.fetchUseditemQuestions.map((el) => (
        <CommentWrapper key={el._id}>
          <CommentHeader>
            <CommentProfileWrapper>
              <CommentProfile src={`https://storage.googleapis.com/${el.user?.picture}`} onError={handleImageError} />
              <CommentUser>
                <CommentUserName>{el.user.name}</CommentUserName>
                <CommentCreateAt>{getDate(el.createdAt)}</CommentCreateAt>
              </CommentUser>
            </CommentProfileWrapper>
            <CommentRight>
              <CommentEdit src='/pencil.svg' id={el._id} onClick={onClickEdit} />
              <CommentDelete src='/delete.svg' id={el._id} onClick={onClickDelete} />
            </CommentRight>
          </CommentHeader>
          {!isEdit ? (
            <CommentBody>
              <CommentContents onChange={onChangeContents}>{el.contents}</CommentContents>
            </CommentBody>
          ) : (
            <CommentInput type='text' value={comment} onChange={onChangeComment} />
          )}
        </CommentWrapper>
      ))}
    </Wrapper>
  );
};

export default CreateProductsCommentList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 2rem;
`;

const CommentUser = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentUserName = styled.span`
  font-size: 22px;
  font-weight: 400;
`;

const CommentCreateAt = styled.span`
  font-size: 15px;
  font-weight: 400;
`;

const CommentContents = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

const CommentRight = styled.div`
  display: flex;
`;

const CommentEdit = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`;

const CommentDelete = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CommentBody = styled.div`
  padding: 20px;
`;

const CommentInput = styled.input`
  width: 346px;
  height: 100px;
  background-color: #e9e9e9;
  border: none;
  padding: 10px;
  margin-top: 20px;
  :focus {
    outline: none;
  }
`;
