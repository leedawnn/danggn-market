import { useMutation, gql } from '@apollo/client';
import styled from '@emotion/styled';
import { message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../commons/store/Auth/UserInfoState';
import { IMutation, IMutationCreatePointTransactionOfLoadingArgs } from '../../../commons/types/generated/types';
import { AiOutlineClose } from 'react-icons/ai';
import Head from 'next/head';
import { accessTokenState } from '../../../commons/store/Auth/accessToken';
import Script from 'next/script';
import Modal from 'react-modal';

declare const window: typeof globalThis & {
  IMP: any;
};

export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      amount
    }
  }
`;

const SideBar = () => {
  const router = useRouter();

  const [accessToken] = useRecoilState(accessTokenState);
  const [userInfo] = useRecoilState(userInfoState);

  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [charged, setCharged] = useState<boolean>(false);
  const [view, setView] = useState(['', '']);

  // const ls = localStorage.getItem('viewed');
  // const lsArr = JSON.parse(ls).reverse();

  // useEffect(() => {
  //   let arr = JSON.parse(ls)

  //   if (!arr.includes(product[0].id))
  // }, [])

  useEffect(() => {
    setCharged(Boolean(accessToken));
  }, [charged]);

  const [createPointTransactionOfLoading] = useMutation<
    Pick<IMutation, 'createPointTransactionOfLoading'>,
    IMutationCreatePointTransactionOfLoadingArgs
  >(CREATE_POINT_TRANSACTION_OF_LOADING);

  const onClickPointMenu = () => {
    if (!accessToken) {
      message.info({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    setModalIsOpen(true);
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
    IMP.init('imp87153765');

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
            const { data } = await createPointTransactionOfLoading({
              variables: { impUid: rsp.imp_uid },
            });
            console.log('결제ㅔㅔㅔㅔㅔㅔㅔㅔ', data);
            setModalIsOpen(false);
            setCharged(true);
            router.push('/market');
            message.success('결제가 완료되었습니다.');
          } catch (error) {
            if (error instanceof Error) message.error(error.message);
          }
        }
      }
    );
  };

  // TODO: 랜딩페이지용 상단바 따로 만들기
  const onClickmoveToTop = () => (document.documentElement.scrollTop = 0);

  return (
    <>
      <Head>
        <Script type='text/javascript' src='https://code.jquery.com/jquery-1.12.4.min.js' />
        <Script type='text/javascript' src='https://cdn.iamport.kr/js/iamport.payment-1.1.5.js' />
      </Head>

      <MenuWrapper>
        <Link href='/market/create'>
          <a>
            <SellMenu>판매하기</SellMenu>
          </a>
        </Link>
        <ViewedProductMenu>
          {/* TODO: 최근 본 상품이 없을 경우 => 없다는 문구 / 최대 2개 보여주기 */}
          <ViewedProductTitle>최근 본 상품</ViewedProductTitle>
          <DivideLine />
          <ViewedProducts></ViewedProducts>
        </ViewedProductMenu>
        <PointMenu onClick={onClickPointMenu}>
          <PointTitle>포인트 충전</PointTitle>
          <PointIcon />
        </PointMenu>
        <ModalStyle isOpen={modalIsOpen}>
          <ModalCloseButton onClick={() => setModalIsOpen(false)}>
            <AiOutlineClose style={{ width: '16px', height: '16px' }} />
          </ModalCloseButton>
          <ModalTitle>충전하실 금액을 선택해주세요!</ModalTitle>
          <ModalSelect value={selectedAmount} onChange={onChangeSelect}>
            <option value=''>포인트 선택</option>
            <option value='100'>100 Point</option>
            <option value='500'>500 Point</option>
            <option value='2000'>2,000 Point</option>
            <option value='5000'>5,000 Point</option>
            <option value='10000'>10,000 Point</option>
          </ModalSelect>
          <ModalButton isActive={isActive} onClick={onClickChargePoint}>
            충전하기
          </ModalButton>
        </ModalStyle>
        <TopButton onClick={onClickmoveToTop}>TOP</TopButton>
        {/* TODO: 배포 후 챗봇 연결 - 컴포넌트 분리하기 */}
        {/* <ChatBot>챗봇</ChatBot> */}
      </MenuWrapper>
    </>
  );
};
export default SideBar;

const MenuWrapper = styled.aside`
  position: fixed;
  top: 7rem;
  width: 90px;
  height: 300px;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SellMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  color: rgb(102, 102, 102);
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgb(102, 102, 102);
  cursor: pointer;
`;

const ViewedProductMenu = styled.div`
  height: 30px;
  padding: 10px;
  height: 150px;
  border: 1px solid rgb(204, 204, 204);
`;

const ViewedProductTitle = styled.div`
  color: rgb(102, 102, 102);
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2px;
`;

const DivideLine = styled.div`
  border-bottom: 2px dotted rgb(102, 102, 102); ;
`;

const ViewedProducts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const PointMenu = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(204, 204, 204);
  cursor: pointer;
`;

const PointTitle = styled.span`
  font-size: 11px;
`;

const PointIcon = styled(RiMoneyDollarCircleLine)`
  color: rgb(112, 110, 110);
  font-size: 18px;
`;

const TopButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  color: rgb(102, 102, 102);
  font-size: 13px;
  font-weight: 700;
  border: 1px solid #b4b4b4;
  background-color: transparent;
  cursor: pointer;
`;

const ChatBot = styled.button`
  cursor: pointer;
`;

// 포인트 충전 모달
const ModalStyle = styled(Modal)`
  width: 464px;
  height: 316px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background-color: #ffffff;
  margin-top: 200px !important;
  margin: 0 auto;
`;

const ModalCloseButton = styled.button`
  width: 16px;
  height: 16px;

  background-color: transparent;
  border: none;
  margin: 20px 0px 20px 400px;
  cursor: pointer;
`;

const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 464px;
  height: 29px;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
`;

const ModalSelect = styled.select`
  width: 384px;
  height: 50px;
  border: none;
  border-bottom: 2px solid #000000;
  margin-bottom: 30px;
  outline: none;

  ::placeholder {
    font-weight: 400;
    font-size: 16px;
    color: #828282;
  }
`;

interface ModalButtonProps {
  isActive: boolean;
}

const ModalButton = styled.button<ModalButtonProps>`
  width: 384px;
  height: 51px;
  background-color: ${(props) => (props.isActive ? 'black' : '#bdbdbd')};
  border: none;
  color: white;
  border-radius: 10px;
  padding: 14px 16px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`;
