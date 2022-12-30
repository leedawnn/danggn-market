import styled from '@emotion/styled';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SideBar = () => {
  const [view, setView] = useState(['', '']);

  // const ls = localStorage.getItem('viewed');
  // const lsArr = JSON.parse(ls).reverse();

  // useEffect(() => {
  //   let arr = JSON.parse(ls)

  //   if (!arr.includes(product[0].id))
  // }, [])

  const onClickmoveToTop = () => (document.documentElement.scrollTop = 0);

  return (
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
      <LikeMenu>찜한 상품</LikeMenu>
      <TopButton onClick={onClickmoveToTop}>TOP</TopButton>
      {/* TODO: 배포 후 챗봇 연결 - 컴포넌트 분리하기 */}
      {/* <ChatBot>챗봇</ChatBot> */}
    </MenuWrapper>
  );
};
export default SideBar;

const MenuWrapper = styled.aside`
  position: fixed;
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

const LikeMenu = styled.div`
  height: 50px;
  border: 1px solid rgb(204, 204, 204);
  cursor: pointer;
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
