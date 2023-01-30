import * as S from './Mypage.styles';
import { message } from 'antd';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
  IQuery,
} from '../../../../commons/types/generated/types';
import { UPDATE_USER } from './Mypage.queries';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { accessTokenState } from '../../../../commons/store/Auth/accessToken';
import { CREATE_POINT_TRANSACTION_OF_LOADING } from '../../../commons/sideBar';
import { FETCH_USER_LOGGED_IN } from '../signin/Signin.queries';
import Script from 'next/script';
// import { UpdateUserState } from '../../../../commons/store';
import Uploads02 from '../../../commons/uploads/02/Uploads02';

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
  setUserInfo: SetterOrUpdater<IUserInfo | undefined>;
}

interface IUpdateUserInput {
  name?: string;
  picture?: string;
}

const MypageUI = ({ userInfo, setUserInfo }: MypageProps) => {
  const router = useRouter();

  console.log(userInfo);

  const [accessToken] = useRecoilState(accessTokenState);

  const [updateUser] = useMutation<Pick<IMutation, 'updateUser'>>(UPDATE_USER);

  const { data: fetchUserData } = useQuery<Pick<IQuery, 'fetchUserLoggedIn'>>(FETCH_USER_LOGGED_IN);

  const [createPointTransactionOfLoading] = useMutation<
    Pick<IMutation, 'createPointTransactionOfLoading'>,
    IMutationCreatePointTransactionOfLoadingArgs
  >(CREATE_POINT_TRANSACTION_OF_LOADING);

  const [name, setName] = useState<string>('');

  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [pointModalIsOpen, setPointModalIsOpen] = useState<boolean>(false);
  const [profileEditModalIsOpen, setProfileEditModalIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [charged, setCharged] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>('');

  const onClickPointCharge = () => {
    if (!accessToken) {
      message.info({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    setPointModalIsOpen(true);
  };

  const onChangeProfilePhoto = (fileUrl: string) => {
    const newFileUrl = fileUrl;
    setFileUrl(newFileUrl);
  };

  console.log('uuuurrrrllllllll', userInfo?.picture);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleUpdateUser = async () => {
    if (!userInfo) return;

    const currentFile = JSON.stringify(fileUrl);
    const defaultFile = JSON.stringify(userInfo.picture);
    const isChangedFiles = currentFile !== defaultFile;

    if (name === '') return;

    const updateUserInput: IUpdateUserInput = {};

    if (name !== userInfo.name) updateUserInput.name = name;
    if (isChangedFiles) updateUserInput.picture = fileUrl;

    try {
      const result = await updateUser({
        variables: {
          updateUserInput,
        },
      });

      console.log('프로필 수정: ', result);
      setProfileEditModalIsOpen(false);

      setUserInfo({
        ...userInfo,
        picture: fileUrl,
      });

      message.success({ content: '프로필 수정이 완료되었습니다!' });
    } catch (error) {
      message.error({ content: '프로필 수정이 완료되지 않았습니다. 다시 시도해주세요.' });
      throw Error;
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

            setPointModalIsOpen(false);
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

  const onClickProfileEdit = () => {
    if (!accessToken) return;

    setProfileEditModalIsOpen(true);
  };

  useEffect(() => {
    setCharged(Boolean(accessToken));
  }, [charged]);

  // useEffect(() => {
  //   if (fetchUserData?.fetchUserLoggedIn.picture) {
  //     setUserInfo({
  //       ...userInfo,
  //       picture: fileUrl,
  //     });
  //   }
  // }, [fileUrl]);

  return (
    <>
      <Script type='text/javascript' src='https://code.jquery.com/jquery-1.12.4.min.js' />
      <Script type='text/javascript' src='https://cdn.iamport.kr/js/iamport.payment-1.2.0.js' />

      <S.Wrapper>
        <S.MyPageWrapper>
          <S.UserInfoWrapper>
            <S.UserWrapper>
              <S.UserPhoto src={`https://storage.googleapis.com/${userInfo?.picture}`} alt='프로필 이미지' />
              <S.UserPointWrapper>
                <S.UserDetailWrapper>
                  <S.UserDetails>{userInfo?.name}님, &nbsp;</S.UserDetails>
                  <S.UserDetails>{userInfo?.userPoint} Point</S.UserDetails>
                </S.UserDetailWrapper>
                {/* TODO: 포인트 충전 모달 컴포넌트 분리 */}
                <S.ModalPointChargeBtn onClick={onClickPointCharge}>포인트 충전하기</S.ModalPointChargeBtn>
                <S.ModalStyle isOpen={pointModalIsOpen}>
                  <S.ModalCloseButton onClick={() => setPointModalIsOpen(false)}>
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
                  <S.UserMenuLi onClick={onClickProfileEdit}>프로필 수정</S.UserMenuLi>
                  <S.ProfileModalStyle isOpen={profileEditModalIsOpen}>
                    <S.ModalHeader>
                      <S.ProfileModalCloseButton onClick={() => setProfileEditModalIsOpen(false)}>
                        <AiOutlineClose style={{ fontSize: '16px' }} />
                      </S.ProfileModalCloseButton>
                      <S.ProfileModalTitle>프로필 수정</S.ProfileModalTitle>
                      <S.ProfileSaveButton onClick={handleUpdateUser}>저장</S.ProfileSaveButton>
                    </S.ModalHeader>
                    <S.ProfileBody>
                      <S.ProfilePhotoWrapper>
                        <Uploads02 fileUrl={fileUrl} onChangeProfilePhoto={onChangeProfilePhoto} />
                      </S.ProfilePhotoWrapper>
                      <S.ProfileDetailWrapper>
                        <S.ProfileDetailLabel>이메일</S.ProfileDetailLabel>
                        <S.ProfileDetailInput
                          defaultValue={userInfo?.email}
                          disabled
                          style={{ backgroundColor: '#ebebeb' }}
                        />
                        <S.ProfileDetailLabel>닉네임</S.ProfileDetailLabel>
                        <S.ProfileDetailInput defaultValue={userInfo?.name} onChange={onChangeName} />
                      </S.ProfileDetailWrapper>
                    </S.ProfileBody>
                  </S.ProfileModalStyle>
                  {/* TODO: 비밀번호 변경 모달 */}
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
                  <Link href='/auth/cart'>
                    <a>
                      <S.MarketMenuLi>장바구니</S.MarketMenuLi>
                    </a>
                  </Link>
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
    </>
  );
};

export default MypageUI;
