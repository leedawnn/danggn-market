import { atom } from 'recoil';

export const resetpasswordState = atom({
  key: 'resetpasswordState',
  default: {
    defaultPassword: '',
  },
});
