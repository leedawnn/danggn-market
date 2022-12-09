import styled from '@emotion/styled';
import Link from 'next/link';

interface IButtonProps {
  title: string;
  url?: string;
  onMoveToElement?: () => void;
}

const Button01 = (props: IButtonProps) => {
  return (
    <Button>
      {props.url ? (
        <ButtonText>
          <Link href={props.url}>
            <a>{props.title}</a>
          </Link>
        </ButtonText>
      ) : (
        <ButtonText onClick={props.onMoveToElement}>{props.title}</ButtonText>
      )}
    </Button>
  );
};
export default Button01;

const Button = styled.button`
  background-color: #f1f3f5;
  padding: 1.4rem 2rem;
  margin-top: 1.5rem;
  border-radius: 6px;
  cursor: pointer;

  :hover {
    background-color: #e9ecef;
  }
`;

const ButtonText = styled.span`
  color: #212529;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.47;
  letter-spacing: -0.3px;
`;
