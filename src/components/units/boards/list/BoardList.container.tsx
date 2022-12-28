import { useQuery } from '@apollo/client';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from '../../../../commons/types/generated/types';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from './BoardList.queries';
import BoardListUI from './BoardList.presenter';
import _ from 'lodash';

const BoardList = () => {
  const router = useRouter();

  const [size, setSize] = useState<SizeType>('large');

  const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS);
  const { data: dataBoardsCount, refetch: refetchBoardsCount } = useQuery<
    Pick<IQuery, 'fetchBoardsCount'>,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const [keyword, setKeyword] = useState<string>('');

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
