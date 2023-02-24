import Head from 'next/head';
import BoardList from '../../src/components/units/boards/list/BoardList.container';

export default function BoardsPage() {
  return (
    <>
      <Head>
        <title>댕근마켓 | 통합 자유게시판</title>
      </Head>

      <BoardList />
    </>
  );
}
