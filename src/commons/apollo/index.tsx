import { ApolloClient, ApolloLink, ApolloProvider, fromPromise, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenState, userInfoState } from '../store/index';
import { getAccessToken } from '../../commons/libraries/getAccessToken';
import { onError } from '@apollo/client/link/error';

const APOLLO_CACHE = new InMemoryCache();

interface IApolloSettingProps {
  children: ReactNode;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const userInfo = localStorage.getItem('userInfo');
    setAccessToken(accessToken);

    if (!accessToken || !userInfo) return;
    setUserInfo(JSON.parse(userInfo)); // string이니까 객체로 바꿔서

    // getAccessToken().then((newAccessToken) => {
    //   setAccessToken(newAccessToken);
    // });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === 'UNAUTHENTICATED') {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken);
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: 'https://backend08.codebootcamp.co.kr/graphql',
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: APOLLO_CACHE,
    connectToDevTools: true,
  });

  // prettier-ignore
  return (
    <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
  )
}
