import { IQuery } from '../../../../commons/types/generated/types';

export interface IDetailBoardUIProps {
  data?: Pick<IQuery, 'fetchBoard'>;
  onClickMoveToEdit: () => void;
  onClickDelete: () => void;
}

export interface IUpdateBoardInput {
  title?: string;
  contents?: string;
  youtubeUrl?: string;
}
