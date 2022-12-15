import { ApolloClient, ApolloLink, ApolloProvider, fromPromise, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { ReactNode, useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { getAccessToken } from '../libraries/getAccessToken';
import { onError } from '@apollo/client/link/error';
import { accessTokenState, restoreAccessTokenLoadable } from '../store/Auth/accessToken';
import { userInfoState } from '../store/Auth/UserInfoState';
import { Router, useRouter } from 'next/router';

const APOLLO_CACHE = new InMemoryCache();

interface IApolloSettingProps {
  children: ReactNode;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const router = useRouter();

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const restoreToken = useRecoilValueLoadable(restoreAccessTokenLoadable);

  useEffect(() => {
    if (router.asPath.includes('auth')) return;
    if (!userInfo) return;

    restoreToken.toPromise().then((newAccessToken) => {
      if (!newAccessToken) {
        setUserInfo(undefined);
      }
      setAccessToken(newAccessToken);
    });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (!userInfo) return;

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === 'UNAUTHENTICATED') {
          return fromPromise(
            getAccessToken().then((newAccessToken: string) => {
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
    uri: 'http://backend08.codebootcamp.co.kr/graphql',
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
