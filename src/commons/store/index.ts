import { atom } from 'recoil';
import { persistAtom } from './persist';

export const UpdateUserState = atom({
  key: 'UpdateUserState',
  default: {
    name: '',
    picture: '',
  },
});

export const CartState = atom({
  key: 'CartState',
  default: 0,
});

export const LikeState = atom({
  key: 'LikeState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
