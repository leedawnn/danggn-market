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
  onChangeContents: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeYoutubeUrl: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeFileUrls: (fileUrls: string, index: number) => void;
  onClickValidation: () => void;
  onClickUpdate: () => void;
  fileUrls: string[];
}
