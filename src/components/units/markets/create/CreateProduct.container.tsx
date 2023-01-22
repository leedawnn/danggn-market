import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  ICreateUseditemInput,
  IMutation,
  IMutationCreateUseditemArgs,
  IMutationUpdateUseditemArgs,
  IUpdateUseditemInput,
} from '../../../../commons/types/generated/types';
import CreateProductUI from './CreateProduct.presenter';
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from './CreateProduct.queries';
import { IProductcreateProps, IupdateUseditemInput } from './CreateProduct.types';

declare const window: typeof globalThis & {
  kakao: any;
};

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

const schema = yup.object({
  name: yup.string().required('상품명을 입력해주세요.'),
  remarks: yup.string().required('상품 요약을 입력해주세요.'),
  price: yup.number().required('판매 가격을 입력해주세요.'),
  contents: yup.string().required('상품 내용을 입력해주세요.'),
});

const CreateProductContainer = (props: IProductcreateProps) => {
  const router = useRouter();

  const [createUseditem] = useMutation<Pick<IMutation, 'createUseditem'>, IMutationCreateUseditemArgs>(
    CREATE_USED_ITEM
  );

  const [updateUseditem] = useMutation<Pick<IMutation, 'updateUseditem'>, IMutationUpdateUseditemArgs>(
    UPDATE_USED_ITEM
  );

  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileUrls, setFileUrls] = useState(['', '']);

  // reset 기능 알아보기
  const { register, formState, handleSubmit, setValue, trigger } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onChangeContents = (value: string) => {
    setValue('contents', value === '<p><br></p>' ? '' : value);
    trigger('contents');
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

  const onChangeFileUrls = (fileUrl: string, index: number) => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  const onToggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const onCompletePostCode = (data: any) => {
    setZipcode(data.zonecode);
    setAddress(data.address);
    onToggleModal();
  };

  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  useEffect(() => {
    if (props.data?.fetchUseditem.images?.length) {
      setFileUrls([...props.data?.fetchUseditem.images]);
    }
  }, [props.data]);

  const onClickSubmit = async (data: ICreateUseditemInput | any) => {
    if (!data.name && !data.remarks && !data.contents && !data.price) {
      Modal.info({ content: '필수 입력 사항입니다!' });
      return;
    }

    try {
      await createUseditem({
        variables: {
          createUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: data.price,
            tags: data.tags,
            useditemAddress: {
              zipcode,
              address,
              addressDetail,
            },
            images: [...fileUrls],
          },
        },
      });
      router.push('/market');
      Modal.success({ content: '상품 등록이 완료되었습니다!' });
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickUpdate = async (data: IUpdateUseditemInput) => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchUseditem.images);
    const isChangedFiles = currentFiles !== defaultFiles;

    if (
      !data.name &&
      !data.remarks &&
      !data.contents &&
      !data.price &&
      !data.tags &&
      !zipcode &&
      !address &&
      !addressDetail &&
      !isChangedFiles
    ) {
      Modal.info({ content: '수정한 내용이 없습니다.' });
      return;
    }

    const updateUseditemInput: IupdateUseditemInput = {};
    if (data.name) updateUseditemInput.name = data.name;
    if (data.remarks) updateUseditemInput.remarks = data.remarks;
    if (data.contents) updateUseditemInput.contents = data.contents;
    if (zipcode || address || addressDetail) {
      updateUseditemInput.useditemAddress = {};
      if (zipcode) updateUseditemInput.useditemAddress.zipcode = zipcode;
      if (address) updateUseditemInput.useditemAddress.address = address;
      if (addressDetail) updateUseditemInput.useditemAddress.addressDetail = addressDetail;
    }
    if (isChangedFiles) updateUseditemInput.images = fileUrls;

    try {
      if (typeof router.query.productId !== 'string') return;
      const result = await updateUseditem({
        variables: {
          updateUseditemInput,
          useditemId: router.query.productId,
        },
      });
      router.push(`/products/${result.data?.updateUseditem._id}`);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickCancleForm = () => {
    router.push('/market');
  };

  return (
    <CreateProductUI
      isEdit={props.isEdit}
      ReactQuill={ReactQuill}
      handleSubmit={handleSubmit}
      register={register}
      formState={formState}
      onClickUpdate={onClickUpdate}
      onClickSubmit={onClickSubmit}
      onChangeContents={onChangeContents}
      zipcode={zipcode}
      onToggleModal={onToggleModal}
      isModalVisible={isModalVisible}
      onCompletePostCode={onCompletePostCode}
      address={address}
      onChangeAddressDetail={onChangeAddressDetail}
      fileUrls={fileUrls}
      onChangeFileUrls={onChangeFileUrls}
      onClickCancleForm={onClickCancleForm}
    />
  );
};

export default CreateProductContainer;
