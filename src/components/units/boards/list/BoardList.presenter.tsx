import { ChangeEvent, MouseEvent } from 'react';
import { IQuery } from '../../../../commons/types/generated/types';
import * as S from './BoardList.styles';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../../../../commons/libraries/utils';
import { EditOutlined } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

interface IBoardListProps {
  data: Pick<IQuery, 'fetchBoards'> | undefined;
  keyword: string;
  startPage: number;
  lastPage: number;
  activePage: number;
  size: SizeType;
  onClickMoveToDetail: (event: MouseEvent<HTMLDivElement>) => void;
  onClickPrevPage: () => void;
  onClickPage: (event: MouseEvent<HTMLSpanElement>) => void;
  onClickNextPage: () => void;
  onChangeSearchbar: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickMoveToCreate: () => void;
}

const BoardListUI = ({
  data,
  keyword,
  startPage,
  lastPage,
  activePage,
  size,
  onClickMoveToDetail,
  onClickPrevPage,
  onClickPage,
  onClickNextPage,
  onChangeSearchbar,
  onClickMoveToCreate,
}: IBoardListProps) => {
  const autoIncrementNumber = (startNum: number) => {
    const init = startNum;
  };

  return (
    <>
      <S.Wrapper>
        <S.BoardTitle>통합 자유게시판</S.BoardTitle>
        {/* </S.BoardHeader> */}
        <S.Table>
          <S.TableRow>
            <S.ColumnHeaderNumber>번호</S.ColumnHeaderNumber>
            <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
            <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
            <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
            <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
            <S.ColumnHeaderNumber>좋아요 수</S.ColumnHeaderNumber>
          </S.TableRow>
          {data?.fetchBoards.map((el, index) => (
            <S.Row key={el._id}>
              <S.ColumnNumber>{index + 1}</S.ColumnNumber>
              <S.ColumnBasic>{String(el._id).slice(-4).toUpperCase()}</S.ColumnBasic>
              <S.ColumnTitle id={el._id} onClick={onClickMoveToDetail}>
                {el.title
                  .replaceAll(keyword, `@#$%${keyword}@#$%`)
                  .split('@#$%')
                  .map((el) => (
                    <S.FindKeyword key={uuidv4()} isSearch={keyword === el}>
                      {el}
                    </S.FindKeyword>
                  ))}
              </S.ColumnTitle>
              <S.ColumnBasic>{el.writer}</S.ColumnBasic>
              <S.ColumnBasic>{getDate(el.createdAt)}</S.ColumnBasic>
              <S.ColumnNumber>{el.likeCount}</S.ColumnNumber>
            </S.Row>
          ))}
          <S.Footer>
            <S.Page onClick={onClickPrevPage}>{`<`}</S.Page>
            {Array(10)
              .fill(1)
              .map(
                (_, index) =>
                  startPage + index <= lastPage && (
                    <S.Page
                      key={startPage + index}
                      id={String(startPage + index)}
                      onClick={onClickPage}
                      isActive={startPage + index === activePage}
                    >
                      {startPage + index}
                    </S.Page>
                  )
              )}
            <S.Page onClick={onClickNextPage}>{`>`}</S.Page>
            <S.SearchWrapper>
              <S.SearchBarIcon />
              <S.SearchBar placeholder='검색어를 입력해 주세요.' onChange={onChangeSearchbar} />
            </S.SearchWrapper>
            <S.CreatePostButton
              type='primary'
              shape='round'
              icon={<EditOutlined />}
              size={size}
              onClick={onClickMoveToCreate}
            >
              게시물 등록하기
            </S.CreatePostButton>
          </S.Footer>
        </S.Table>
      </S.Wrapper>
    </>
  );
};

export default BoardListUI;
