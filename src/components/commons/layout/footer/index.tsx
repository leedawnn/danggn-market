import styled from '@emotion/styled';
import { FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <Wrapper>
      <FooterHeader>
        <HeaderUl>
          <HeaderLi>회사소개</HeaderLi>
          <HeaderLi>이용약관</HeaderLi>
          <HeaderLi>개인정보처리방침</HeaderLi>
          <HeaderLi>이용안내</HeaderLi>
          <HeaderLi>사업자정보확인</HeaderLi>
        </HeaderUl>
      </FooterHeader>
      <FooterBottom>
        <FiInstagram />
      </FooterBottom>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  width: 100%;
`;

const FooterHeader = styled.header``;

const HeaderUl = styled.ul``;

const HeaderLi = styled.li``;

const FooterBottom = styled.div``;
