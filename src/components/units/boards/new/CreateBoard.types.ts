import { IQuery } from '../../../../commons/types/generated/types';

export interface IBoardcreateProps {
  isEdit: boolean;
  data?: Pick<IQuery, 'fetchBoard'>;
}
