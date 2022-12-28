import styled from '@emotion/styled';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;
`;

export const Table = styled.section`
  display: flex;
  flex-direction: column;
  width: 1300px;
  margin: 10px 100px 100px 100px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
  cursor: pointer;

  :hover {
    color: #ffa000;
  }
`;

export const ColumnHeaderBasic = styled.div`
  width: 20%;
  font-weight: 700;
  text-align: center;
`;

export const ColumnHeaderTitle = styled.div`
  width: 50%;
  font-weight: 700;
  text-align: center;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 2px solid gray;
`;

export const ColumnBasic = styled.div`
  width: 20%;
  text-align: center;
`;

export const ColumnTitle = styled.div`
  width: 50%;
  text-align: center;
  cursor: pointer;

  :hover {
    color: orange;
  }
`;

interface IPageProps {
  isActive?: boolean;
}

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Page = styled.span<IPageProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  color: ${(props) => (props.isActive ? 'orange' : 'default')};
  font-weight: ${(props) => (props.isActive ? '800' : 'default')};
  cursor: pointer;
`;

export const SearchWrapper = styled.div`
  position: relative;
`;

export const SearchBarIcon = styled(SearchOutlined)`
  position: absolute;
  top: 12px;
  left: 15px;
  font-size: 16px;
`;

export const SearchBar = styled.input`
  width: 300px;
  height: 40px;
  padding: 0px 40px;
  border: none;
  border-radius: 5px;
  background-color: #ededed;

  :focus {
    outline: none;
  }
`;

interface IkeywordProps {
  isSearch: boolean;
}

export const FindKeyword = styled.span<IkeywordProps>`
  color: ${(props) => (props.isSearch ? 'tomato' : 'default')};
`;

export const CreatePostButton = styled(Button)`
  display: flex;
  justify-content: right;
  align-items: center;
`;
