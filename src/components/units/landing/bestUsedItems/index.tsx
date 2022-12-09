import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Link from 'next/link';
import { IQuery } from '../../../../commons/types/generated/types';
import { FETCH_USED_ITEMS_OF_THE_BEST } from './bestUsedItems.queries';

const BestUsedItems = (props: any) => {
  const { data } = useQuery<Pick<IQuery, 'fetchUseditemsOfTheBest'>>(FETCH_USED_ITEMS_OF_THE_BEST);

  return (
    <Wrapper ref={props.element}>
      <Title>베스트 중고 거래</Title>
      <BestUsedItemsWrapper>
        {data?.fetchUseditemsOfTheBest.map((el, index) => (
          <BestUsedItem key={index}>
            <ItemPhoto src={`https://storage.googleapis.com/${el.images?.[0]}`} alt={el.remarks} />
            <ItemName>{el.name}</ItemName>
            <ItemPrice>{el.price}원</ItemPrice>
            <ItemPickedCount>좋아요 {el.pickedCount}</ItemPickedCount>
          </BestUsedItem>
        ))}
      </BestUsedItemsWrapper>
      <Link href='/market'>
        <a>
          <MoveToMarketSpan>더 많은 중고 거래 보러가기</MoveToMarketSpan>
        </a>
      </Link>
    </Wrapper>
  );
};
export default BestUsedItems;

const Wrapper = styled.section`
  width: 100vw;
  background-color: #e5f2e5;
  padding: 8rem 8rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 7rem;
`;

const BestUsedItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 300px;
  justify-content: space-around;
`;

const BestUsedItem = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ItemPhoto = styled.img`
  width: 210px;
  height: 210px;
  border-radius: 12px;
  box-shadow: inset 0px 0px 0px 1px rgb(0 0 0 / 15%);
`;

const ItemName = styled.span`
  color: #212529;
  font-size: 1rem;
  font-weight: lighter;
`;

const ItemPrice = styled.span`
  font-size: 0.8rem;
  font-weight: 800;
`;

const ItemPickedCount = styled.span`
  color: #868e96;
`;

const MoveToMarketSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  text-decoration: underline !important;
  cursor: pointer;
`;
