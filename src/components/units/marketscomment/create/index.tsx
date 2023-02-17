import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { CREATE_USED_ITEM_QUESTION, UPDATE_USED_ITEM_QUESTION } from './ProductsComment.queries';
import { FETCH_USED_ITEM_QUESTIONS } from '../list/ProductsCommentList.queries';
import { message } from 'antd';
import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
  IUseditemQuestion,
} from '../../../../commons/types/generated/types';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';

interface IMarketCommentProps {
  el?: IUseditemQuestion;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
}

const CreateProductsComment = ({ el, isEdit, setIsEdit }: IMarketCommentProps) => {
  const router = useRouter();

  const [userInfo] = useRecoilState(userInfoState);

  const [contents, setContents] = useState('');

  const [createUseditemQuestion] = useMutation<
    Pick<IMutation, 'createUseditemQuestion'>,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USED_ITEM_QUESTION);

  const [updateUseditemQuestion] = useMutation<Pick<IMutation, 'updateUseditemQuestion'>>(UPDATE_USED_ITEM_QUESTION);

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onClickCreateComment = async () => {
    if (typeof router.query.productId !== 'string') return;

    if (!userInfo) {
      message.error({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    if (!contents) {
      message.error({ content: '내용을 입력해주세요!' });
      return;
    }

    try {
      await createUseditemQuestion({
        variables: {
          createUseditemQuestionInput: {
            contents,
          },
          useditemId: router.query.productId,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: router.query.productId },
          },
        ],
      });
      setContents('');
    } catch (error) {
      if (error instanceof Error) message.error({ content: error.message });
    }
  };

  const onClickUpdateComment = async () => {
    if (!userInfo) {
      message.error({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    if (!contents) {
      message.error({ content: '내용이 수정되지 않았습니다!' });
      return;
    }

    try {
      if (typeof el?._id !== 'string') return;

      await updateUseditemQuestion({
        variables: {
          updateUseditemQuestionInput: {
            contents,
          },
          useditemQuestionId: el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemQuestionId: el?._id },
          },
        ],
      });
      setIsEdit?.(false);
      message.success({ content: '댓글이 성공적으로 수정되었습니다!' });
    } catch (error) {
      if (error instanceof Error) message.error({ content: error.message });
    }
  };

  return (
    <Wrapper>
      {!isEdit && (
        <>
          <CommentTitle>댓글</CommentTitle>
          <DivideLine />
        </>
      )}
      <CommentTextarea
        placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
        value={isEdit ? contents || el?.contents : contents}
        onChange={onChangeContents}
      />
      <CreateCommentButton onClick={isEdit ? onClickUpdateComment : onClickCreateComment}>
        {isEdit ? '수정하기' : '등록하기'}
      </CreateCommentButton>
    </Wrapper>
  );
};
export default CreateProductsComment;

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

const CommentTextarea = styled.textarea`
  height: 120px;
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

  :hover {
    border: 1px solid #ffe004;
    background-color: #ffffff;
  }
`;
