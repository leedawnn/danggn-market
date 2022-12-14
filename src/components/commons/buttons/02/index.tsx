import styled from '@emotion/styled';

interface IButton02Props {
  title: string;
  onClickLogin?: () => Promise<void>;
}

const Button02 = ({ title, onClickLogin }: IButton02Props) => {
  return <Button onClick={onClickLogin}>{title}</Button>;
};
export default Button02;

const Button = styled.button`
  width: 374px;
  height: 58px;
  margin-top: 1rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: #000000;
  cursor: pointer;

  :hover {
    color: #000000;
    background-color: #ffffff;
    border: 1px solid #000000;
  }
`;
