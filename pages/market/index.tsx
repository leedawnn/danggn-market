import styled from '@emotion/styled';
import { gql, useQuery } from '@apollo/client';
import { IQuery, IQueryFetchUseditemsArgs } from '../../src/commons/types/generated/types';
import { getDate } from '../../src/commons/libraries/utils';
import InfiniteScroll from 'react-infinite-scroller';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { Button } from 'antd';
import Link from 'next/link';

// TODO: 중고 상품 검색 기능 구현
const FETCH_USED_ITEMS = gql`
  query fetchUseditems($page: Int) {
    fetchUseditems(page: $page) {
      _id
      name
      images
      price
      createdAt
      pickedCount
    }
  }
`;

export default function Home() {
  const router = useRouter();

  const { data, fetchMore } = useQuery<Pick<IQuery, 'fetchUseditems'>, IQueryFetchUseditemsArgs>(FETCH_USED_ITEMS);

  const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: { page: Math.ceil(data?.fetchUseditems.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditems) return { fetchUseditems: [...prev.fetchUseditems] };

        return {
          fetchUseditems: [...prev.fetchUseditems, ...fetchMoreResult.fetchUseditems],
        };
      },
    });
  };

  const handleImageError = (event: any) => {
    event.target.src = '/default.png';
  };

  const onClickMoveToDetail = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.currentTarget instanceof HTMLDivElement)) return;
    router.push(`/market/${event.currentTarget.id}`);
  };

  const putOnComma = (price: number | null | undefined) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true || false}>
      <Wrapper>
        <Link href='/market/create'>
          <a>
            <Button>판매하기</Button>
          </a>
        </Link>
        {data ? (
          data?.fetchUseditems.map((el) => (
            <ProductCard key={el._id} id={el._id} onClick={onClickMoveToDetail}>
              <ProductImage src={`https://storage.googleapis.com/${el.images?.[0]}`} onError={handleImageError} />
              <ProductDetailWrapper>
                <ProductTitle>{el.name}</ProductTitle>
                <ProductPrice>{putOnComma(el.price)}원</ProductPrice>
                <ProductBottom>
                  {getDate(el.createdAt)} · 관심 {el.pickedCount}
                </ProductBottom>
              </ProductDetailWrapper>
            </ProductCard>
          ))
        ) : (
          <></>
        )}
      </Wrapper>
    </InfiniteScroll>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  row-gap: 20px;
  padding-left: 25px;
`;

const ProductCard = styled.div`
  width: 250px;
  height: 320px;
  border: 1px solid rgb(238, 238, 238);
  background-color: #ffffff;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 248px;
  height: 221px;
`;

const ProductDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
`;

const ProductTitle = styled.span`
  font-weight: 700;
  color: #000000;
  margin-bottom: 4px;
`;

const ProductPrice = styled.span`
  color: #000000;
`;

const ProductBottom = styled.span`
  color: #a9a9a9;
`;
