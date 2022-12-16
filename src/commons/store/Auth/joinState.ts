import { atom } from 'recoil';

export const joinInputsState = atom({
  key: 'joinInputsState',
  default: {
    email: '',
    password: '',
    name: '',
  },
});
