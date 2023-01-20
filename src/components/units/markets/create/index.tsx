import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from './CreateProduct.queries';
import { useMutation } from '@apollo/client';
import {
  IMutation,
  IMutationCreateUseditemArgs,
  IMutationUpdateUseditemArgs,
} from '../../../../commons/types/generated/types';
import { IProductcreateProps, IupdateUseditemInput } from './CreateProduct.types';
import Uploads01 from '../../../commons/uploads/01/Uploads01.container';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'antd';
import { useRouter } from 'next/router';

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

export default function CreateProducts(props: IProductcreateProps) {
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

  const onChangeAddressDetail = (event) => {
    setAddressDetail(event.target.value);
  };

  useEffect(() => {
    if (props.data?.fetchUseditem.images?.length) {
      setFileUrls([...props.data?.fetchUseditem.images]);
    }
  }, [props.data]);

  const onClickSubmit = async (data) => {
    if (!data.name && !data.remarks && !data.contents && !data.price) {
      Modal.info({ content: '필수 입력 사항입니다!' });
      return;
    }

    try {
      const result = await createUseditem({
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

  const onClickUpdate = async (data) => {
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

  return (
    <>
      <Wrapper>
        <Header>
          <h1>상품 {props.isEdit ? '수정' : '등록'}</h1>
        </Header>
        <Form onSubmit={handleSubmit(props.isEdit ? onClickUpdate : onClickSubmit)}>
          <ProductItem>
            <ProductLabel>상품명</ProductLabel>
            <ProductInput type='text' placeholder='상품명을 작성해주세요' {...register('name')} />
            <ValidErrorMsg>{formState.errors.name?.message}</ValidErrorMsg>
          </ProductItem>
          <ProductItem>
            <ProductLabel>상품 요약</ProductLabel>
            <ProductInput type='text' placeholder='상품 요약을 작성해주세요' {...register('remarks')} />
            <ValidErrorMsg>{formState.errors.remarks?.message}</ValidErrorMsg>
          </ProductItem>
          <ProductItem>
            <ProductLabel>상품 내용</ProductLabel>
            <ReactQuill
              placeholder='상품을 설명해주세요.'
              onChange={onChangeContents}
              style={{ width: '1117px', height: '431px', marginBottom: '40px' }}
            />
            <ValidErrorMsg>{formState.errors.contents?.message}</ValidErrorMsg>
          </ProductItem>
          <ProductItem>
            <ProductLabel>판매 가격</ProductLabel>
            <ProductInput type='text' placeholder='판매 가격을 입력해주세요' {...register('price')} />
            <ValidErrorMsg>{formState.errors.price?.message}</ValidErrorMsg>
          </ProductItem>
          <ProductItem>
            <ProductLabel>태그 입력</ProductLabel>
            <ProductInput type='text' placeholder='#태그 #태그 #태그' {...register('tags')} />
          </ProductItem>
          <ProductMapWrapper>
            <ProductMapLeft>
              <ProductLabel>거래 위치</ProductLabel>
              <ProductLocationMap id='map'></ProductLocationMap>
            </ProductMapLeft>
            <ProductMapRight>
              <ZipcodeWrapper>
                <ZipcodeInput type='text' placeholder='07250' defaultValue={zipcode || ''} />
                <ZipcodeSearchButton onClick={onToggleModal}>우편번호 검색</ZipcodeSearchButton>
                {isModalVisible && (
                  <Modal visible={true} onOk={onToggleModal} onCancel={onToggleModal}>
                    <DaumPostcodeEmbed onComplete={onCompletePostCode} />
                  </Modal>
                )}
              </ZipcodeWrapper>
              <ZipcodeInputWrapper>
                <AddressInput type='text' defaultValue={address || ''} />
                <AddressInput type='text' onChange={onChangeAddressDetail} />
              </ZipcodeInputWrapper>
            </ProductMapRight>
          </ProductMapWrapper>
          <ProductPhotoWrapper>
            <ProductPhoto>
              <ProductLabel>사진 첨부</ProductLabel>
              {fileUrls.map((el, index) => (
                <Uploads01 key={uuidv4()} index={index} fileUrl={el} onChangeFileUrls={onChangeFileUrls} />
              ))}
            </ProductPhoto>
          </ProductPhotoWrapper>
          <Footer>
            <FormButton isCancle={true}>취소</FormButton>
            <FormButton isCancle={false}>등록</FormButton>
          </Footer>
        </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 1200px;
  padding: 50px 100px 80px;
  margin: 0 auto;
  box-sizing: content-box;
`;

const Header = styled.header`
  border-bottom: 2px solid #555555;
  padding-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const ProductLabel = styled.label`
  width: 100px;
  font-size: 22px;
  font-weight: 500;
`;

const ProductLocationMap = styled.div`
  width: 384px;
  height: 252px;
  z-index: -1;
`;

const ProductInput = styled.input`
  width: 1117px;
  height: 56px;
  padding: 10px;
  background-color: #e9e9e9;
`;

const ProductMapWrapper = styled.div`
  display: flex;
  margin-top: 40px;
`;

const ProductMapLeft = styled.div`
  display: flex;
`;

const ProductMapRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const ZipcodeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
`;

const ZipcodeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ZipcodeInput = styled.input`
  width: 77px;
  height: 52px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #bdbdbd;
`;

const ZipcodeSearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 51px;
  color: #ffffff;
  background-color: #000000;
  cursor: pointer;
`;

const AddressInput = styled.input`
  width: 702px;
  height: 56px;
  background-color: #e9e9e9;
  margin-top: 20px;
  padding: 10px;
`;

const ProductPhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 20px 20px 0px;
`;

const ProductPhoto = styled.div`
  display: flex;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #555555;
  padding: 20px;
`;

interface IButtonProps {
  isCancle: boolean;
}

const FormButton = styled.button<IButtonProps>`
  width: 150px;
  height: 50px;
  color: ${(props) => (props.isCancle ? '#000000' : '#ffffff')};
  font-weight: 700;
  margin-left: 20px;
  background-color: ${(props) => (props.isCancle ? '#FFE004' : '#000000')};
  cursor: pointer;
`;

const ValidErrorMsg = styled.div`
  color: tomato;
`;
