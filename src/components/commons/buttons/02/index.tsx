import styled from '@emotion/styled';

interface IButton02Props {
  title: string;
  kakao: boolean;
  onClick: (() => Promise<void>) | (() => void);
}

const Button02 = ({ title, kakao, onClick }: IButton02Props) => {
  return (
    <Button onClick={onClick} kakao={kakao}>
      {title}
    </Button>
  );
};
export default Button02;

interface IButtonColorProps {
  kakao: boolean;
}

const Button = styled.button<IButtonColorProps>`
  width: 374px;
  height: 58px;
  margin-top: 1rem;
  font-size: 1rem;
  color: ${(props) => (props.kakao ? '#000000' : '#ffffff')};
  background-color: ${(props) => (props.kakao ? '#fef01b' : '#000000')};
  cursor: pointer;

  :hover {
    color: ${(props) => (props.kakao ? 'default' : '#000000')};
    background-color: ${(props) => (props.kakao ? 'default' : '#ffffff')};
    border: ${(props) => (props.kakao ? 'default' : '1px solid #000000')};
  }
`;
