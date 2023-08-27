import { useQuery } from '@apollo/client';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from '../../../../commons/types/generated/types';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from './BoardList.queries';
import BoardListUI from './BoardList.presenter';
import useDebounce from '../../../../commons/libraries/useDebounce';

const BoardList = () => {
  const router = useRouter();

  const [size] = useState<SizeType>('large');

  const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);
  const { data: dataBoardsCount, refetch: refetchBoardsCount } = useQuery<
    Pick<IQuery, 'fetchBoardsCount'>,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const [keywordInputValue, setKeywordInputValue] = useState<string>('');
  const keyword = useDebounce(keywordInputValue);

  const [startPage, setStartPage] = useState<number>(1);
  const [activePage, setActivePage] = useState<number>(1);
  const lastPage = Math.ceil(Number(dataBoardsCount?.fetchBoardsCount) / 10);

  const onClickMoveToDetail = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/board/${event.target.id}`);
  };

  const onClickMoveToCreate = () => {
    router.push('/board/new');
  };

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    const activePage = Number(event.target.id);
    setActivePage(activePage);
    refetch({ page: activePage });
  };

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

  const onChangeSearchbar = (event: ChangeEvent<HTMLInputElement>) => {
    setKeywordInputValue(event.target.value);
  };

  useEffect(() => {
    refetch({ search: keyword });
    refetchBoardsCount({ search: keyword });
  }, [keyword]);

  return (
    <BoardListUI
      data={data}
      onClickMoveToDetail={onClickMoveToDetail}
      keyword={keyword}
      onClickPrevPage={onClickPrevPage}
      startPage={startPage}
      lastPage={lastPage}
      activePage={activePage}
      onClickPage={onClickPage}
      onClickNextPage={onClickNextPage}
      onChangeSearchbar={onChangeSearchbar}
      size={size}
      onClickMoveToCreate={onClickMoveToCreate}
    />
  );
};

export default BoardList;
