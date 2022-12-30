import { atom } from 'recoil';
import { persistAtom } from '../persist';

interface IUserInfo {
  email: string;
  name: string;
  picture: string;
  userPoint: number;
}

export const userInfoState = atom<IUserInfo | undefined>({
  key: 'userInfoState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
