import { ChangeEvent } from 'react';
import { IQuery } from '../../../../commons/types/generated/types';

export interface IBoardcreateProps {
  isEdit: boolean;
  data?: Pick<IQuery, 'fetchBoard'>;
}

export interface IUpdateBoardInput {
  title?: string;
  contents?: string;
  youtubeUrl?: string;
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
  images?: string[];
}

export interface ICreateBoardUIprops {
  writer: string;
  title: string;
  contents: string;
  youtubeUrl: string;
  writerError: string;
  PwError: string;
  titleError: string;
  contentError: string;
  data?: Pick<IQuery, 'fetchBoard'>;
  isEdit: boolean;
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePw: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeYoutubeUrl: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickAddressSearch: () => void;
  onChangeAddressDetail: (event: ChangeEvent<HTMLInputElement>) => void;
  onCompleteAddressSearch: (data: any) => void;
  onChangeFileUrls: (fileUrls: string, index: number) => void;
  onClickCreateBoard: () => void;
  onClickUpdate: () => void;
  isOpen: boolean;
  zipcode: string;
  address: string;
  addressDetail: string;
  fileUrls: string[];
}
