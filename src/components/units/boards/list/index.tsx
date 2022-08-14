import styled from '@emotion/styled';
import { gql, useQuery } from '@apollo/client';
import { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from '../../../../commons/types/generated/types';
import { getDate } from '../../../../commons/libraries/utils';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      createdAt
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

const ListBoard = (event) => {
  const router = useRouter();

  const [size, setSize] = useState<SizeType>('large');

  const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);
  const { data: dataBoardsCount, refetch: refetchBoardsCount } = useQuery<
    Pick<IQuery, 'fetchBoardsCount'>,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const [keyword, setKeyword] = useState('');

  const [startPage, setStartPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const lastPage = Math.ceil(dataBoardsCount?.fetchBoardsCount / 10);

  const onClickMoveToDetail = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/boards/${event.target.id}`);
  };

  const onClickMoveToCreate = () => {
    router.push('/boards/new');
  };

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    const activePage = Number(event.target.id);
    setActivePage(activePage);
    refetch({ page: activePage });
  };

  const getDebounce = _.debounce((value: string) => {
    refetch({ search: value, page: 1 });
    refetchBoardsCount({ search: value });
    onChangeKeyword(value);
  }, 200);

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  function onChangeSearchbar(event: ChangeEvent<HTMLInputElement>) {
    getDebounce(event.target.value);
  }

  const onClickPrevPage = () => {
    if (startPage <= 1) return;
    setStartPage((prev) => prev - 10);
    setActivePage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 > lastPage) return;
    setStartPage((prev) => prev + 10);
    setActivePage(startPage + 10);
    refetch({ page: startPage + 10 });
  };

  return (
    <>
      <Wrapper>
        <Table>
          <TableRow>
            <ColumnHeaderBasic>ID</ColumnHeaderBasic>
            <ColumnHeaderTitle>제목</ColumnHeaderTitle>
            <ColumnHeaderBasic>작성자</ColumnHeaderBasic>
            <ColumnHeaderBasic>날짜</ColumnHeaderBasic>
          </TableRow>
          {data?.fetchBoards.map((el) => (
            <Row key={el._id}>
              <ColumnBasic>{String(el._id).slice(-4).toUpperCase()}</ColumnBasic>
              <ColumnTitle id={el._id} onClick={onClickMoveToDetail}>
                {el.title
                  .replaceAll(keyword, `@#$%${keyword}@#$%`)
                  .split('@#$%')
                  .map((el) => (
                    <FindKeyword key={uuidv4()} isSearch={keyword === el}>
                      {el}
                    </FindKeyword>
                  ))}
              </ColumnTitle>
              <ColumnBasic>{el.writer}</ColumnBasic>
              <ColumnBasic>{getDate(el.createdAt)}</ColumnBasic>
            </Row>
          ))}
          {/* TODO: prev, next 아이콘으로 바꾸기 */}
          <Footer>
            <Page onClick={onClickPrevPage}>{`<`}</Page>
            {Array(10)
              .fill(1)
              .map(
                (_, index) =>
                  startPage + index <= lastPage && (
                    <Page
                      key={startPage + index}
                      id={String(startPage + index)}
                      onClick={onClickPage}
                      isActive={startPage + index === activePage}
                    >
                      {startPage + index}
                    </Page>
                  )
              )}
            <Page onClick={onClickNextPage}>{`>`}</Page>
            <SearchWrapper>
              <SearchBarIcon />
              <SearchBar placeholder='검색어를 입력해 주세요.' onChange={onChangeSearchbar} />
            </SearchWrapper>
            <CreatePostButton
              type='primary'
              shape='round'
              icon={<EditOutlined />}
              size={size}
              onClick={onClickMoveToCreate}
            >
              게시물 등록하기
            </CreatePostButton>
          </Footer>
        </Table>
      </Wrapper>
    </>
  );
};
export default ListBoard;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;
`;

const Table = styled.section`
  display: flex;
  flex-direction: column;
  width: 1300px;
  margin: 100px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
  cursor: pointer;

  :hover {
    color: orange;
  }
`;

const ColumnHeaderBasic = styled.div`
  width: 20%;
  font-weight: 700;
  text-align: center;
`;

const ColumnHeaderTitle = styled.div`
  width: 50%;
  font-weight: 700;
  text-align: center;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 2px solid gray;
`;

const ColumnBasic = styled.div`
  width: 20%;
  text-align: center;
`;

const ColumnTitle = styled.div`
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

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Page = styled.span<IPageProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  font-weight: ${(props) => (props.isActive ? '700' : 'default')};
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchBarIcon = styled(SearchOutlined)`
  position: absolute;
  top: 12px;
  left: 15px;
  font-size: 16px;
`;

const SearchBar = styled.input`
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

const FindKeyword = styled.span<IkeywordProps>`
  color: ${(props) => (props.isSearch ? 'tomato' : 'default')};
`;

const CreatePostButton = styled(Button)`
  display: flex;
  justify-content: right;
  align-items: center;
`;
