import * as S from './DetailProduct.styles';
import { Modal, Tooltip } from 'antd';
import { putOnComma } from '../../../../commons/libraries/utils';
import { IUseditem } from '../../../../commons/types/generated/types';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import DOMPurify from 'dompurify';
import ProductCommentList from '../../marketsComment/list/ProductComment.container';
import ProductCommentCreate from '../../marketsComment/create';
import Head from 'next/head';

interface IDetailProductProps {
  handleImageError: (event: any) => void;
  handleProfileImageError: (event: any) => void;
  onClickDip: () => Promise<void>;
  data: any;
  isLike: boolean;
  onClickBasket: (basket: IUseditem) => () => void;
  cartModalOpen: boolean;
  setCartModalOpen: Dispatch<SetStateAction<boolean>>;
  onClickPurchase: () => Promise<void>;
}

const DetailProductUI = ({
  handleImageError,
  handleProfileImageError,
  data,
  isLike,
  onClickDip,
  onClickBasket,
  cartModalOpen,
  setCartModalOpen,
  onClickPurchase,
}: IDetailProductProps) => {
  const router = useRouter();

  // TODO: img태그 max-width 설정
  const isIncludeImages = data?.fetchUseditem.contents.includes(`<img`);

  return (
    <S.Wrapper>
      <S.ProductDetailWrapper>
        <S.ProductImg
          src={`https://storage.googleapis.com/${data?.fetchUseditem.images[0]}`}
          onError={handleImageError}
        />
        <S.ProductDescription>
          <S.ProductDetail1>
            <S.ProductName>{data?.fetchUseditem.name}</S.ProductName>
            <S.ProductPrice>
              {putOnComma(data?.fetchUseditem.price)}
              <S.PriceWon>원</S.PriceWon>
            </S.ProductPrice>
          </S.ProductDetail1>
          <S.ProductDetail2>
            <S.ProductRemarks>{data?.fetchUseditem.remarks}</S.ProductRemarks>
            {data?.fetchUseditem.tags[0] && (
              <S.ProductTags>
                {data?.fetchUseditem.tags?.map((el: string) => (
                  <S.ProductTag key={el}>
                    <Tooltip title={el}>
                      <S.TagSpan>#{el}</S.TagSpan>
                    </Tooltip>
                  </S.ProductTag>
                ))}
              </S.ProductTags>
            )}
          </S.ProductDetail2>
          <S.ProductsButtonWrapper>
            <S.DipButton onClick={onClickDip}>
              <S.FillHeartIcon />
              &nbsp;{data?.fetchUseditem.pickedCount}
            </S.DipButton>
            <S.BasketButton onClick={onClickBasket(data?.fetchUseditem)}>장바구니</S.BasketButton>
            <Modal
              title='장바구니 이동'
              open={cartModalOpen}
              onOk={() => router.push('/auth/cart')}
              onCancel={() => setCartModalOpen(false)}
            >
              <p>장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?</p>
            </Modal>
            <S.PurchaseButton onClick={onClickPurchase}>바로구매</S.PurchaseButton>
          </S.ProductsButtonWrapper>
        </S.ProductDescription>
      </S.ProductDetailWrapper>
      <S.ProductBodyWrapper>
        <S.ProductBodyLeftWrapper>
          <S.ProductBodySpan>상품 정보</S.ProductBodySpan>
          <S.DivideLine />
          {typeof window !== 'undefined' && (
            <S.ProductContents
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(data?.fetchUseditem.contents)),
              }}
            />
          )}
          <S.ProductMapWrapper>
            <S.MapTitleWrapper>
              <S.ProductmapIcon />
              <S.ProductMapSpan>거래지역</S.ProductMapSpan>
            </S.MapTitleWrapper>
            <div id='map' style={{ width: '520px', height: '400px' }}></div>
          </S.ProductMapWrapper>
        </S.ProductBodyLeftWrapper>
        <S.ProductBodyRightWrapper>
          <S.ProductSellerWrapper>
            <S.ProductBodySpan>판매자명</S.ProductBodySpan>
            <S.DivideLine />
            <S.SellerProfileWrapper>
              <S.ProductSellerProfile
                src={`https://storage.googleapis.com/${data?.fetchUseditem.seller.picture}`}
                onError={handleProfileImageError}
              />
              <S.ProductSellerName>{data?.fetchUseditem.seller.name}</S.ProductSellerName>
            </S.SellerProfileWrapper>
          </S.ProductSellerWrapper>
          <ProductCommentCreate />
          <ProductCommentList />
        </S.ProductBodyRightWrapper>
      </S.ProductBodyWrapper>
    </S.Wrapper>
  );
};

export default DetailProductUI;
