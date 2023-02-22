import { useMutation, useQuery } from '@apollo/client';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { LikeState } from '../../../../commons/store';
import { accessTokenState } from '../../../../commons/store/Auth/accessToken';
import {
  IMutation,
  IMutationCreatePointTransactionOfBuyingAndSellingArgs,
  IMutationToggleUseditemPickArgs,
  IQuery,
  IQueryFetchUseditemArgs,
  IUseditem,
} from '../../../../commons/types/generated/types';
import DetailProductUI from './DetailProduct.presenter';
import {
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  FETCH_USED_ITEM,
  TOGGLE_USED_ITEM_PICK,
} from './DetailProduct.queries';
import { FETCH_USED_ITEMS } from '../../../../../pages/market/index';

declare const window: typeof globalThis & {
  kakao: any;
};

const DetailProductContainer = () => {
  const router = useRouter();

  const [accessToken] = useRecoilState(accessTokenState);
  const [isLike, setIsLike] = useRecoilState<boolean>(LikeState);

  const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);

  const { data } = useQuery<Pick<IQuery, 'fetchUseditem'>, IQueryFetchUseditemArgs>(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.productId) },
  });

  const [toggleUseditemPick] = useMutation<Pick<IMutation, 'toggleUseditemPick'>, IMutationToggleUseditemPickArgs>(
    TOGGLE_USED_ITEM_PICK
  );

  const [createPointTransactionOfBuyingAndSelling] = useMutation<
    Pick<IMutation, 'createPointTransactionOfBuyingAndSelling'>,
    IMutationCreatePointTransactionOfBuyingAndSellingArgs
  >(CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING);

  const handleImageError = (event: any) => {
    event.target.src = '/default.png';
  };

  const handleProfileImageError = (event: any) => {
    event.target.src = '/defaultProfile.png';
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

      setIsLike((prev) => !prev);
    } catch (error) {
      throw Error;
    }
  };

  const onClickPurchase = async () => {
    if (!accessToken) {
      Modal.info({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    if (typeof router.query.productId !== 'string') return;

    try {
      await createPointTransactionOfBuyingAndSelling({
        variables: { useritemId: router.query.productId },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS,
            variables: { page: 1 },
          },
        ],
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

    setCartModalOpen(true);

    const baskets: Pick<IUseditem, '_id' | 'name' | 'price' | 'contents' | 'images'>[] = JSON.parse(
      sessionStorage.getItem('baskets') || '[]'
    );

    const temp = baskets.filter((el) => el._id === basket._id);

    if (temp.length === 1) {
      setCartModalOpen(false);
      Modal.info({ content: '이미 담으신 물품입니다!' });
      return;
    }

    const { __typename, ...newBasket } = basket;
    baskets.push(newBasket);
    sessionStorage.setItem('baskets', JSON.stringify(baskets));
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d17f80ee36d1f0008465ee9f49c8b065&libraries=services';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const defaultLat = 37.484916;
        const defaultLng = 126.896119;

        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(defaultLat, defaultLng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();

        if (data?.fetchUseditem.useditemAddress?.address) {
          geocoder.addressSearch(data?.fetchUseditem.useditemAddress?.address, function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              const imageSrc = '/marker.png',
                imageSize = new window.kakao.maps.Size(64, 69),
                imageOption = { offset: new window.kakao.maps.Point(27, 69) };

              const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

              const marker = new window.kakao.maps.Marker({
                map,
                position: coords,
                image: markerImage,
              });

              map.panTo(coords);

              marker.setMap(map);
            }
          });
        }

        const imageSrc = '/marker.png',
          imageSize = new window.kakao.maps.Size(64, 69),
          imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
          markerPosition = new window.kakao.maps.LatLng(defaultLat, defaultLng);

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        const moveLatLon = new window.kakao.maps.LatLng(
          data?.fetchUseditem.useditemAddress?.lat || defaultLat,
          data?.fetchUseditem.useditemAddress?.lng || defaultLng
        );

        map.panTo(moveLatLon);

        marker.setMap(map);
      });
    };
  }, []);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('viewed') || '[]');

    const temp = viewed.filter((el: string) => el === router.query.productId);
    if (temp.length === 1) return;

    viewed.push(router.query.productId);
    if (viewed.length > 2) {
      viewed.shift();
    }

    localStorage.setItem('viewed', JSON.stringify(viewed));
  }, []);

  return (
    <DetailProductUI
      handleImageError={handleImageError}
      handleProfileImageError={handleProfileImageError}
      data={data}
      isLike={isLike}
      onClickDip={onClickDip}
      onClickBasket={onClickBasket}
      cartModalOpen={cartModalOpen}
      setCartModalOpen={setCartModalOpen}
      onClickPurchase={onClickPurchase}
    />
  );
};

export default DetailProductContainer;
