import { IQuery } from '../../../../commons/types/generated/types';

export interface IProductcreateProps {
  data?: Pick<IQuery, 'fetchUseditem'>;
  isEdit: boolean;
}

export interface IupdateUseditemInput {
  name?: string;
  remarks?: string;
  contents?: string;
  useditemAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
  images?: string[];
}
