import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { IQuery } from '../../../../commons/types/generated/types';
import { FETCH_USED_ITEMS_OF_THE_BEST } from './bestUsedItems.queries';

const BestUsedItems = () => {
  const { data } = useQuery<Pick<IQuery, 'fetchUseditemsOfTheBest'>>(FETCH_USED_ITEMS_OF_THE_BEST);
  console.log(data);
  return (
    <Wrapper>
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
    </Wrapper>
  );
};
export default BestUsedItems;

const Wrapper = styled.section`
  width: 100vw;
  background-color: #e5f2e5;
  padding: 10rem 10rem;
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
  height: 250px;
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
