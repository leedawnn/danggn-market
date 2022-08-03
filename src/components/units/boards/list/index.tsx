import styled from '@emotion/styled';
import { gql, useQuery } from '@apollo/client';
import { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from '../../../../commons/types/generated/types';
import { getDate } from '../../../../commons/libraries/utils';
import { useRouter } from 'next/router';

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

  const { data } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery<Pick<IQuery, 'fetchBoardsCount'>, IQueryFetchBoardsCountArgs>(
    FETCH_BOARDS_COUNT
  );

  const onClickMoveToEdit = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/boards/${event.target.id}`);
  };

  return (
    <>
      <Wrapper>
        <TableRow>
          <ColumnHeaderBasic>ID</ColumnHeaderBasic>
          <ColumnHeaderTitle>제목</ColumnHeaderTitle>
          <ColumnHeaderBasic>작성자</ColumnHeaderBasic>
          <ColumnHeaderBasic>날짜</ColumnHeaderBasic>
        </TableRow>
        {data?.fetchBoards.map((el) => (
          <Row key={el._id}>
            <ColumnBasic>{String(el._id).slice(-4).toUpperCase()}</ColumnBasic>
            <ColumnTitle id={el._id} onClick={onClickMoveToEdit}>
              {el.title}
            </ColumnTitle>
            <ColumnBasic>{el.writer}</ColumnBasic>
            <ColumnBasic>{getDate(el.createdAt)}</ColumnBasic>
          </Row>
        ))}
      </Wrapper>
    </>
  );
};
export default ListBoard;

const Wrapper = styled.div`
  position: absolute;
  width: 1000px;
  height: 583px;
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
