import { useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CreateProductsComment from '../../marketsComment/create';
import CreateProductsCommentList from '../../marketsComment/list';
import {
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  FETCH_USED_ITEM,
  TOGGLE_USED_ITEM_PICK,
} from './DetailProduct.queries';
import { FaRegHeart, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import {
  IMutation,
  IMutationCreatePointTransactionOfBuyingAndSellingArgs,
  IMutationToggleUseditemPickArgs,
  IUseditem,
} from '../../../../commons/types/generated/types';
import { useEffect, useState } from 'react';
import { putOnComma } from '../../../../commons/libraries/utils';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../../../commons/store/Auth/accessToken';
import { Modal } from 'antd';

declare const window: typeof globalThis & {
  kakao: any;
};

const DetailProduct = () => {
  const router = useRouter();

  const [accessToken, _] = useRecoilState(accessTokenState);

  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.productId) },
  });

  const [toggleUseditemPick] = useMutation<Pick<IMutation, 'toggleUseditemPick'>, IMutationToggleUseditemPickArgs>(
    TOGGLE_USED_ITEM_PICK
  );

  const [baskets, setBaskets] = useState<IUseditem[]>([]);

  const [createPointTransactionOfBuyingAndSelling] = useMutation<
    Pick<IMutation, 'createPointTransactionOfBuyingAndSelling'>,
    IMutationCreatePointTransactionOfBuyingAndSellingArgs
  >(CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING);

  const handleImageError = (event: any) => {
    event.target.src = '/default.png';
  };

  const onClickDip = async () => {
    if (!accessToken) {
      Modal.info({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    if (typeof router.query.productId !== 'string') return;

    try {
      await toggleUseditemPick({
        variables: {
          useditemId: router.query.productId,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM,
            variables: { useditemId: router.query.productId },
          },
        ],
      });
    } catch (error) {
      throw Error;
    }
  };

  const onClickPurchase = async () => {
    if (!accessToken) {
      Modal.info({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    try {
      await createPointTransactionOfBuyingAndSelling({
        variables: { useritemId: String(router.query.productId) },
      });

      Modal.success({
        content: `${data?.fetchUseditem.name} 구매가 완료되었습니다.`,
      });
      router.replace('/market');
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickBasket = (basket: IUseditem) => () => {
    if (!accessToken) {
      Modal.info({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    console.log(basket);

    const baskets: Pick<IUseditem, '_id' | 'name' | 'price' | 'contents' | 'images'>[] = JSON.parse(
      localStorage.getItem('baskets') || '[]'
    );

    const temp = baskets.filter((el) => el._id === basket._id);

    if (temp.length === 1) {
      Modal.info({ content: '이미 담으신 물품입니다!' });
      return;
    }

    const { __typename, ...newBasket } = basket;
    baskets.push(newBasket);
    localStorage.setItem('baskets', JSON.stringify(baskets));

    const move = Modal.success({ content: '장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?' });
    if (move) {
      router.replace('/auth/cart');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d17f80ee36d1f0008465ee9f49c8b065';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.484916, 126.896119),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        const moveLatLon = new window.kakao.maps.LatLng(37.484916, 126.896119);

        map.panTo(moveLatLon);

        const markerPosition = new window.kakao.maps.LatLng(37.484916, 126.896119);

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    };
  }, []);

  return (
    <Wrapper>
      <ProductDetailWrapper>
        <ProductImg
          src={`https://storage.googleapis.com/${data?.fetchUseditem.images[0]}`}
          onError={handleImageError}
        />
        <ProductDescription>
          <ProductDetail1>
            <ProductName>{data?.fetchUseditem.name}</ProductName>
            <ProductPrice>
              {putOnComma(data?.fetchUseditem.price)}
              <PriceWon>원</PriceWon>
            </ProductPrice>
          </ProductDetail1>
          <ProductDetail2>
            <ProductRemarks>{data?.fetchUseditem.remarks}</ProductRemarks>
            {data?.fetchUseditem.tags[0] && (
              <ProductTags>
                {data?.fetchUseditem.tags?.map((el: string) => (
                  <ProductTag key={el}>
                    <TagSpan>#{el}</TagSpan>
                  </ProductTag>
                ))}
              </ProductTags>
            )}
          </ProductDetail2>
          <ProductsButtonWrapper>
            <DipButton onClick={onClickDip}>
              <FillHeartIcon />
              &nbsp;{data?.fetchUseditem.pickedCount}
            </DipButton>
            <BasketButton onClick={onClickBasket(data?.fetchUseditem)}>장바구니</BasketButton>
            <PurchaseButton onClick={onClickPurchase}>바로구매</PurchaseButton>
          </ProductsButtonWrapper>
        </ProductDescription>
      </ProductDetailWrapper>
      <ProductBodyWrapper>
        <ProductBodyLeftWrapper>
          <ProductBodySpan>상품정보</ProductBodySpan>
          <DivideLine />
          <ProductContents>{data?.fetchUseditem.contents}</ProductContents>
          <ProductMapWrapper>
            <ProductMapSpan>
              <FaMapMarkerAlt />
              거래지역
            </ProductMapSpan>
            <div id='map' style={{ width: '520px', height: '400px' }}></div>
          </ProductMapWrapper>
        </ProductBodyLeftWrapper>
        <ProductBodyRightWrapper>
          <ProductSellerWrapper>
            <ProductBodySpan>판매자명</ProductBodySpan>
            <DivideLine />
            <SellerProfileWrapper>
              <ProductSellerProfile />
              <ProductSellerName>{data?.fetchUseditem.seller.name}</ProductSellerName>
            </SellerProfileWrapper>
          </ProductSellerWrapper>
          <CreateProductsComment />
          <CreateProductsCommentList />
        </ProductBodyRightWrapper>
      </ProductBodyWrapper>
    </Wrapper>
  );
};
export default DetailProduct;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
  padding: 0px 200px;
  margin-top: 2.2rem;
`;

const ProductDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
`;

const ProductImg = styled.img`
  width: 400px;
  height: 400px;
`;

const ProductDetail1 = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 3px solid #555555;
`;

const ProductName = styled.span`
  color: #000000;
  font-size: 36px;
  font-weight: 700;
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 500;
`;

const PriceWon = styled.span`
  font-size: 20px;
  font-weight: 400;
`;

const ProductDetail2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #c0c0c0;
`;

const ProductRemarks = styled.p`
  font-size: 1rem;
  padding: 20px;
  cursor: auto;
`;

const ProductTags = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #c0c0c0;
`;

const ProductTag = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #000000;
  border: none;
  border-radius: 15px;
  padding: 5px;
  margin-right: 10px;
  background-color: #ffe004;
`;

const TagSpan = styled.span`
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ProductsButtonWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const DipButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 80px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  background-color: #c9c9c9;
  cursor: pointer;
`;

const FillHeartIcon = styled(FaHeart)`
  margin-right: 4px;
`;

const BasketButton = styled.button`
  width: 200px;
  height: 80px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  background-color: #a0a0a0;
  cursor: pointer;
`;

const PurchaseButton = styled.button`
  width: 200px;
  height: 80px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  background-color: #000000;
  cursor: pointer;
`;

const ProductBodyWrapper = styled.div`
  display: flex;
`;

const ProductBodyLeftWrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

const DivideLine = styled.hr`
  border-bottom: 2px solid #555555;
`;

const ProductContents = styled.p`
  margin-top: 1rem;
  overflow-y: scroll;
`;

const ProductBodySpan = styled.p`
  font-size: 28px;
  font-weight: 700;
  cursor: auto;
`;

const ProductMapWrapper = styled.div`
  margin-top: 60px;
`;

const ProductMapSpan = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const ProductBodyRightWrapper = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductSellerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #555555;
`;

const SellerProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
`;

const ProductSellerProfile = styled.div`
  display: flex;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 30px;
`;

const ProductSellerName = styled.span`
  display: flex;
  font-size: 26px;
  font-weight: 400;
  padding: 30px 0px;
`;
