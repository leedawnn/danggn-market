import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const router = useRouter();

  const isHome = router.asPath === '/' ? true : false;

  return (
    <Wrapper isHome={isHome}>
      <FooterHeader>
        <HeaderUl>
          <HeaderLi>회사소개</HeaderLi>
          <HeaderLi>이용약관</HeaderLi>
          <HeaderLi>개인정보처리방침</HeaderLi>
          <HeaderLi>이용안내</HeaderLi>
          <HeaderLi>사업자정보확인</HeaderLi>
        </HeaderUl>
      </FooterHeader>
      <FooterSection>
        <FooterDiscription>
          상호 : 주식회사 댕근마켓 대표 : 이지혜 개인정보 보호 책임자 : 이지혜 TEL : 010-####-$$$$ EMAIL :
          dev.leedawn@gamil.com <br />
          사업자등록번호 : 170-xx-@@@@@[사업자정보보기] 통신판매업신고 : 2022-서울강남-xxxxx 주소 : 호그와트 그리핀도르
          기숙사 휴게실
        </FooterDiscription>
        <FooterDiscription>COPYRIGHT(C) ALL RIGHTS RESERVED.</FooterDiscription>
      </FooterSection>
      <FooterBottom>
        <Link href='https://www.instagram.com/kkimiiskkimi/'>
          <a>
            <FooterInstagramIcon />
          </a>
        </Link>
        <FooterInstagram>kkimi is cute.</FooterInstagram>
      </FooterBottom>
    </Wrapper>
  );
};
export default Footer;

interface IsHomeProps {
  isHome: boolean;
}

const Wrapper = styled.footer<IsHomeProps>`
  position: relative;
  height: 154px;
  padding: ${(props) => (props.isHome ? '100px 0' : '50px 0')};
`;

const FooterHeader = styled.header`
  display: flex;
  justify-content: center;
`;

const HeaderUl = styled.ul`
  display: flex;
`;

const HeaderLi = styled.li`
  margin-right: 1rem;
`;

const FooterSection = styled.div`
  text-align: center;
`;

const FooterDiscription = styled.p`
  color: #8b8b8b;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterInstagramIcon = styled(FiInstagram)`
  color: #8b8b8b;
  margin-top: 5px;
`;

const FooterInstagram = styled.span`
  margin-left: 2px;
  color: #8b8b8b;
`;
