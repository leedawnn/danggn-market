import styled from '@emotion/styled';
import { gql, useQuery } from '@apollo/client';
import { IQuery, IQueryFetchUseditemsArgs } from '../../src/commons/types/generated/types';
import { getDate } from '../../src/commons/libraries/utils';
import InfiniteScroll from 'react-infinite-scroller';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { Button } from 'antd';
import Link from 'next/link';

const FETCH_USED_ITEMS = gql`
  query fetchUseditems($page: Int) {
    fetchUseditems(page: $page) {
      _id
      name
      images
      price
      createdAt
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
                <ProductPrice>{el.price}</ProductPrice>
                <ProductCreatedAt>{getDate(el.createdAt)}</ProductCreatedAt>
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
  border: 1px solid #555555;
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
`;

const ProductTitle = styled.span`
  font-weight: 500;
  color: #000000;
`;

const ProductPrice = styled.span`
  color: #000000;
`;

const ProductCreatedAt = styled.span`
  color: #a9a9a9;
`;
