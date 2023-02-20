import { putOnComma } from '../../../../commons/libraries/utils';
import { IQuery } from '../../../../commons/types/generated/types';
import * as S from './Like.styles';

interface ILikeUIProps {
  data: Pick<IQuery, 'fetchUseditemsIPicked'> | undefined;
  IPickedCountData: Pick<IQuery, 'fetchUseditemsCountIPicked'> | undefined;
}

const LikeUI = ({ data, IPickedCountData }: ILikeUIProps) => {
  const isEmptyIPicked = IPickedCountData?.fetchUseditemsCountIPicked === 0;

  const handleImageError = (event: any) => {
    event.target.src = '/default.png';
  };

  return (
    <S.Wrapper>
      <S.Title>찜한 상품</S.Title>
      {isEmptyIPicked ? (
        <h1>찜한 상품이 없습니다.</h1>
      ) : (
        <S.Table>
          <S.TableRow>
            <S.ColumnHeaderNumber>번호</S.ColumnHeaderNumber>
            <S.ColumnHeaderTitle>상품명</S.ColumnHeaderTitle>
            <S.ColumnHeaderBasic>판매자</S.ColumnHeaderBasic>
            <S.ColumnHeaderBasic>상품 이미지</S.ColumnHeaderBasic>
            <S.ColumnHeaderBasic>가격</S.ColumnHeaderBasic>
            <S.ColumnHeaderNumber>관심</S.ColumnHeaderNumber>
          </S.TableRow>
          {data?.fetchUseditemsIPicked.map((el, index) => (
            <S.Row key={el._id}>
              <S.ColumnNumber>{index + 1}</S.ColumnNumber>
              <S.ColumnTitle>{el.name}</S.ColumnTitle>
              <S.ColumnBasic>{el.seller?.name}</S.ColumnBasic>
              <S.ColumnBasic>
                <S.ColumnImage
                  src={`https://storage.googleapis.com/${el.images?.[0]}`}
                  alt='찜한 상품 이미지'
                  onError={handleImageError}
                />
              </S.ColumnBasic>
              <S.ColumnBasic>{putOnComma(el.price)}</S.ColumnBasic>
              <S.ColumnNumber>{el.pickedCount}</S.ColumnNumber>
            </S.Row>
          ))}
        </S.Table>
      )}
    </S.Wrapper>
  );
};

export default LikeUI;
