import { atom, selector } from 'recoil';
import { getAccessToken } from '../../libraries/getAccessToken';
import { userInfoState } from './UserInfoState';

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
});

// export const restoreAccessTokenLoadable = selector({
//   key: 'restoreAccessTokenLoadable',
//   get: async ({ get }) => {
//     if (!get(userInfoState)) return;
//     const newAccessToken = await getAccessToken();

//     return newAccessToken;
//   },

//   set: ({ set }, newToken) => set(accessTokenState, newToken),
// });

export const restoreAccessTokenLoadable = selector({
  key: 'restoreAccessTokenLoadable',
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});
