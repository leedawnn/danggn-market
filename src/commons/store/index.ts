import { atom } from 'recoil';

export const UpdateUserState = atom({
  key: 'UpdateUserState',
  default: {
    email: '',
    name: '',
    picture: '',
  },
});
