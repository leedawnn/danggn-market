import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
  IMutationUploadFileArgs,
} from '../../../../commons/types/generated/types';
import { UPDATE_USER } from './Mypage.queries';
import * as S from './Mypage.styles';
import { UPLOAD_FILE } from '../../../commons/uploads/01/Uploads01.queries';
import { message } from 'antd';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../../../commons/store/Auth/accessToken';
import { CREATE_POINT_TRANSACTION_OF_LOADING } from '../../../commons/sideBar';
import { FETCH_USER_LOGGED_IN } from '../signin/Signin.queries';

declare const window: typeof globalThis & {
  IMP: any;
};

interface IUserInfo {
  email: string;
  name: string;
  picture: string;
  userPoint: number;
}

interface MypageProps {
  userInfo: IUserInfo | undefined;
  handleImageError: (event: any) => void;
}

interface IUpdateUserInput {
  email?: string;
  name?: string;
  picture?: string;
}

const MypageUI = ({ userInfo, handleImageError }: MypageProps) => {
  const router = useRouter();

  const [accessToken] = useRecoilState(accessTokenState);

  const [updateUser] = useMutation<Pick<IMutation, 'updateUser'>>(UPDATE_USER);
  const [uploadFile] = useMutation<Pick<IMutation, 'uploadFile'>, IMutationUploadFileArgs>(UPLOAD_FILE);

  const [createPointTransactionOfLoading] = useMutation<
    Pick<IMutation, 'createPointTransactionOfLoading'>,
    IMutationCreatePointTransactionOfLoadingArgs
  >(CREATE_POINT_TRANSACTION_OF_LOADING);

  const [inputs, setInputs] = useState({ email: '', name: '', picture: '' });
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [charged, setCharged] = useState<boolean>(false);

  const onClickPointCharge = () => {
    if (!accessToken) {
      message.info({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    setModalIsOpen(true);
  };

  const onChangeInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });
  };

  const handleUpdateProfilePhoto = async () => {
    const { data } = await uploadFile({
      variables: { url: inputs.picture },
    });

    if (!data) {
      message.error({ content: '이미지 업로드에 실패했습니다. 다시 시도해주세요.' });
    }

    updateUserInput.picture = data?.uploadFile;
  };

  // 저장 버튼
  const handleUpdateUser = async () => {
    if (!userInfo) return;

    const updateUserInput: IUpdateUserInput = {};

    if (inputs.email !== userInfo.email) updateUserInput.email = inputs.email;
    if (inputs.name !== userInfo.name) updateUserInput.name = inputs.name;
    if (inputs.picture !== userInfo.picture) updateUserInput.picture = inputs.picture;

    try {
      // 이미지 업로드

      const result = await updateUser({
        variables: { ...inputs },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSelect = (event: any) => {
    setSelectedAmount(event.target.value);
    if (!event.target.value) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const onClickChargePoint = () => {
    if (!accessToken) {
      message.info({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    const IMP = window.IMP;
    IMP.init('imp49910675');

    IMP.request_pay(
      {
        pg: 'nice',
        pay_method: 'card',
        name: '포인트 충전',
        amount: selectedAmount,
        buyer_email: userInfo?.email || '',
        buyer_name: userInfo?.name || '',
        m_redirect_url: `http://localhost:3000/`,
      },
      async (rsp: any) => {
        if (rsp.success) {
          try {
            await createPointTransactionOfLoading({
              variables: { impUid: rsp.imp_uid },
              refetchQueries: [{ query: FETCH_USER_LOGGED_IN }],
            });

            setModalIsOpen(false);
            setCharged(true);
            router.push(`/auth/mypage`);
            message.success('결제가 완료되었습니다.');
          } catch (error) {
            if (error instanceof Error) message.error(error.message);
          }
        } else {
          message.error('결제에 실패했습니다. 다시 시도해주세요.');
        }
      }
    );
  };

  useEffect(() => {
    setCharged(Boolean(accessToken));
  }, [charged]);

  return (
    <S.Wrapper>
      <S.MyPageWrapper>
        <S.UserInfoWrapper>
          <S.UserWrapper>
            <S.UserPhoto src={userInfo?.picture} onError={handleImageError} alt='프로필 이미지' />
            <S.UserPointWrapper>
              <S.UserDetailWrapper>
                <S.UserDetails>{userInfo?.name}님, &nbsp;</S.UserDetails>
                <S.UserDetails>{userInfo?.userPoint} Point</S.UserDetails>
              </S.UserDetailWrapper>
              {/* TODO: 포인트 충전 모달 컴포넌트 분리 */}
              <S.ModalPointChargeBtn onClick={onClickPointCharge}>포인트 충전하기</S.ModalPointChargeBtn>
              <S.ModalStyle isOpen={modalIsOpen}>
                <S.ModalCloseButton onClick={() => setModalIsOpen(false)}>
                  <AiOutlineClose style={{ fontSize: '16px' }} />
                </S.ModalCloseButton>
                <S.ModalTitle>충전하실 금액을 선택해주세요!</S.ModalTitle>
                <S.ModalSelect value={selectedAmount} onChange={onChangeSelect}>
                  <option value=''>포인트 선택</option>
                  <option value='100'>100 Point</option>
                  <option value='500'>500 Point</option>
                  <option value='2000'>2,000 Point</option>
                  <option value='5000'>5,000 Point</option>
                  <option value='10000'>10,000 Point</option>
                </S.ModalSelect>
                <S.ModalButton isActive={isActive} onClick={onClickChargePoint}>
                  충전하기
                </S.ModalButton>
              </S.ModalStyle>
            </S.UserPointWrapper>
          </S.UserWrapper>
          <S.UserProfileWrapper>
            <S.UserProfileHeader>
              <S.UserProfileIcon />
              <S.UserTitle>유저 관리</S.UserTitle>
            </S.UserProfileHeader>
            <S.UserMenuWrapper>
              <S.UserMenuUl>
                <Link href='/auth/mypage/profile'>
                  <a>
                    <S.UserMenuLi>프로필 수정</S.UserMenuLi>
                  </a>
                </Link>
                <S.UserMenuLi>비밀번호 변경</S.UserMenuLi>
              </S.UserMenuUl>
            </S.UserMenuWrapper>
          </S.UserProfileWrapper>
        </S.UserInfoWrapper>
        <S.UserManageWrapper>
          <S.MarketManageWrapper>
            <S.MarketHeader>
              <S.MarketIcon />
              <S.MarketTitle>중고거래</S.MarketTitle>
            </S.MarketHeader>
            <S.MarketMenuWrapper>
              <S.MarketMenuUl>
                <S.MarketMenuLi>판매한 상품</S.MarketMenuLi>
                <S.MarketMenuLi>구매한 상품</S.MarketMenuLi>
                <S.MarketMenuLi>장바구니</S.MarketMenuLi>
              </S.MarketMenuUl>
            </S.MarketMenuWrapper>
          </S.MarketManageWrapper>
          <S.BoardManageWrapper>
            <S.BoardHeader>
              <S.BoardIcon />
              <S.BoardTitle>게시판</S.BoardTitle>
            </S.BoardHeader>
            <S.MarketMenuWrapper>
              <S.MarketMenuUl>
                <S.MarketMenuLi>내 게시글 보기</S.MarketMenuLi>
              </S.MarketMenuUl>
            </S.MarketMenuWrapper>
          </S.BoardManageWrapper>
        </S.UserManageWrapper>
      </S.MyPageWrapper>
    </S.Wrapper>
  );
};

export default MypageUI;
