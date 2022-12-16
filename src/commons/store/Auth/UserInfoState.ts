import { atom } from 'recoil';
import { IUser } from '../../types/generated/types';
import { persistAtom } from '../persist';

export const userInfoState = atom<IUser | undefined>({
  key: 'userInfoState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
