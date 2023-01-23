import { atom } from 'recoil';

export const UpdateUserState = atom({
  key: 'UpdateUserState',
  default: {
    email: '',
    name: '',
    picture: '',
  },
});

export const CartState = atom({
  key: 'CartState',
  default: 0,
});
