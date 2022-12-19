import styled from '@emotion/styled';
import { IoIosArrowUp } from 'react-icons/io';

const SideBar = () => {
  const onClickmoveToTop = () => (document.documentElement.scrollTop = 0);

  return (
    <Wrapper>
      <SideBarWrapper>
        <TopBar onClick={onClickmoveToTop}>
          <ArrowUpIcon />
        </TopBar>
        {/* TODO: 배포 후 챗봇 연결 */}
        {/* <ChatBot>챗봇</ChatBot> */}
      </SideBarWrapper>
    </Wrapper>
  );
};
export default SideBar;

const Wrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`;

const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.button`
  background-color: transparent;
  cursor: pointer;
`;

const ArrowUpIcon = styled(IoIosArrowUp)`
  width: 2.8rem;
  height: 2.8rem;
  color: #2c2929;
  font-size: 32px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const ChatBot = styled.button`
  cursor: pointer;
`;
