import { atom } from 'recoil';
import { persistAtom } from '../persist';

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    email: '',
    name: '',
    picture: '',
    userPoint: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
