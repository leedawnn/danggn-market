import * as S from './CreateProduct.styles';
import 'react-quill/dist/quill.snow.css';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { FieldValues, FormState, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { ChangeEvent, ComponentType } from 'react';
import { ICreateUseditemInput, IUpdateUseditemInput } from '../../../../commons/types/generated/types';
import Uploads01 from '../../../commons/uploads/01/Uploads01.container';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'antd';
import ReactQuill from 'react-quill';

interface ICreateProductProps {
  isEdit: Boolean;
  zipcode: string;
  address: string;
  fileUrls: string[];
  isModalVisible: boolean;
  ReactQuill: ComponentType<ReactQuill.ReactQuillProps>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  formState: FormState<FieldValues>;
  onClickUpdate: (data: IUpdateUseditemInput) => Promise<void>;
  onClickSubmit: (data: ICreateUseditemInput | any) => Promise<void>;
  onChangeContents: (value: string) => void;
  onToggleModal: () => void;
  onCompletePostCode: (data: any) => void;
  onChangeAddressDetail: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeFileUrls: (fileUrl: string, index: number) => void;
  onClickCancleForm: () => void;
}

const CreateProductUI = ({
  isEdit,
  ReactQuill,
  handleSubmit,
  register,
  formState,
  onClickUpdate,
  onClickSubmit,
  onChangeContents,
  zipcode,
  address,
  onToggleModal,
  isModalVisible,
  onCompletePostCode,
  onChangeAddressDetail,
  fileUrls,
  onChangeFileUrls,
  onClickCancleForm,
}: ICreateProductProps) => {
  return (
    <>
      <S.Wrapper>
        <S.Header>
          <S.CreateProductTitle>상품 {isEdit ? '수정' : '등록'}</S.CreateProductTitle>
        </S.Header>
        <S.Form onSubmit={handleSubmit(isEdit ? onClickUpdate : onClickSubmit)}>
          <S.ProductItem>
            <S.ProductLabel>상품명</S.ProductLabel>
            <S.ProductInput type='text' placeholder='상품명을 작성해주세요' {...register('name')} />
            <S.ValidErrorMsg>{formState.errors.name?.message}</S.ValidErrorMsg>
          </S.ProductItem>
          <S.ProductItem>
            <S.ProductLabel>상품 요약</S.ProductLabel>
            <S.ProductInput type='text' placeholder='상품 요약을 작성해주세요' {...register('remarks')} />
            <S.ValidErrorMsg>{formState.errors.remarks?.message}</S.ValidErrorMsg>
          </S.ProductItem>
          <S.ProductItem>
            <S.ProductLabel>상품 내용</S.ProductLabel>
            <ReactQuill
              placeholder='상품을 설명해주세요.'
              onChange={onChangeContents}
              style={{ width: '1200px', height: '431px', marginBottom: '40px' }}
            />
            <S.ValidErrorMsg>{formState.errors.contents?.message}</S.ValidErrorMsg>
          </S.ProductItem>
          <S.ProductItem>
            <S.ProductLabel>판매 가격</S.ProductLabel>
            <S.ProductInput type='text' placeholder='판매 가격을 입력해주세요' {...register('price')} />
            <S.ValidErrorMsg>{formState.errors.price?.message}</S.ValidErrorMsg>
          </S.ProductItem>
          <S.ProductItem>
            <S.ProductLabel>태그 입력</S.ProductLabel>
            <S.ProductInput type='text' placeholder='#태그 #태그 #태그' {...register('tags')} />
          </S.ProductItem>
          <S.ProductMapWrapper>
            <S.ProductLabel>거래 위치</S.ProductLabel>
            <S.ProductMapInner>
              <S.ProductMapLeft>
                <S.ProductLocationMap id='map'></S.ProductLocationMap>
              </S.ProductMapLeft>
              <S.ProductMapRight>
                <S.ZipcodeWrapper>
                  <S.ZipcodeInput type='text' placeholder='07250' defaultValue={zipcode || ''} />
                  <S.ZipcodeSearchButton onClick={onToggleModal}>우편번호 검색</S.ZipcodeSearchButton>
                  {isModalVisible && (
                    <Modal visible={true} onOk={onToggleModal} onCancel={onToggleModal}>
                      <DaumPostcodeEmbed onComplete={onCompletePostCode} />
                    </Modal>
                  )}
                </S.ZipcodeWrapper>
                <S.ZipcodeInputWrapper>
                  <S.AddressInput type='text' defaultValue={address || ''} placeholder='주소' />
                  <S.AddressInput type='text' onChange={onChangeAddressDetail} placeholder='상세 주소' />
                </S.ZipcodeInputWrapper>
              </S.ProductMapRight>
            </S.ProductMapInner>
          </S.ProductMapWrapper>
          <S.ProductPhotoWrapper>
            <S.ProductLabel>사진 첨부</S.ProductLabel>
            <S.ProductPhoto>
              {fileUrls.map((el, index) => (
                <Uploads01 key={uuidv4()} index={index} fileUrl={el} onChangeFileUrls={onChangeFileUrls} />
              ))}
            </S.ProductPhoto>
          </S.ProductPhotoWrapper>
          <S.Footer>
            <S.FormButton onClick={onClickCancleForm} isCancle={true}>
              취소
            </S.FormButton>
            <S.FormButton isCancle={false}>등록</S.FormButton>
          </S.Footer>
        </S.Form>
      </S.Wrapper>
    </>
  );
};

export default CreateProductUI;
