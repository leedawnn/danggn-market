import { IQuery } from '../../../../commons/types/generated/types';

export interface IDetailBoardUIProps {
  data?: Pick<IQuery, 'fetchBoard'>;
  onClickMoveToEdit: () => void;
  onClickDelete: () => void;
  onClickMoveToBoards: () => void;
  onClickLike: () => void;
  onClickDislike: () => void;
}

export interface IUpdateBoardInput {
  title?: string;
  contents?: string;
  youtubeUrl?: string;
}
