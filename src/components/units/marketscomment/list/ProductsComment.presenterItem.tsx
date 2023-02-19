import styled from '@emotion/styled';
import { message, Modal } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FETCH_USED_ITEM_QUESTIONS, DELETE_USED_ITEM_QUESTION } from './ProductsCommentList.queries';
import { getDate } from '../../../../commons/libraries/utils';
import { IUpdateCommentProps, IUpdateUseditemQuestionInput } from './ProductsCommentList.types';
import { MouseEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';
import { IMutation } from '../../../../commons/types/generated/types';
import ProductCommentCreate from '../create';

const ProductsCommentListUIItem = ({ el }: IUpdateCommentProps) => {
  const router = useRouter();

  const [userInfo] = useRecoilState(userInfoState);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [deleteUseditemQuestion] = useMutation<Pick<IMutation, 'deleteUseditemQuestion'>>(DELETE_USED_ITEM_QUESTION);

  const onClickDelete = async (event: MouseEvent) => {
    if (!userInfo) return;

    if (isEdit) {
      setIsEdit?.(false);
      return;
    }

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
      message.success({ content: '댓글이 성공적으로 삭제되었습니다!' });
    } catch (error) {
      if (error instanceof Error) message.error({ content: error.message });
    }
  };

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const handleImageError = (event: any) => {
    event.target.src = '/defaultProfile.png';
  };

  return (
    <>
      {!isEdit && (
        <Wrapper>
          <CommentWrapper key={el?._id}>
            <CommentHeader>
              <CommentProfileWrapper>
                <CommentProfile
                  src={`https://storage.googleapis.com/${el?.user?.picture}`}
                  onError={handleImageError}
                />
                <CommentUser>
                  <CommentUserName>{el?.user.name}</CommentUserName>
                  <CommentCreateAt>{getDate(el?.createdAt)}</CommentCreateAt>
                </CommentUser>
              </CommentProfileWrapper>
              <CommentRight>
                <CommentEdit src='/pencil.svg' id={el?._id} onClick={onClickEdit} />
                <CommentDelete src='/delete.svg' id={el?._id} onClick={onClickDelete} />
              </CommentRight>
            </CommentHeader>
            <CommentBody>
              <CommentContents>{el?.contents}</CommentContents>
            </CommentBody>
          </CommentWrapper>
        </Wrapper>
      )}
      {isEdit && <ProductCommentCreate isEdit={true} setIsEdit={setIsEdit} el={el} />}
    </>
  );
};

export default ProductsCommentListUIItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px 0px;
  border-bottom: 1px solid #ededed;
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

const CommentInput = styled.textarea`
  height: 120px;
  background-color: #e9e9e9;
  border: none;
  padding: 10px;
  margin-top: 20px;
  :focus {
    outline: none;
  }
`;

const UpdateButton = styled.button`
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
