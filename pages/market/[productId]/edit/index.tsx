import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import CreateProducts from '../../../../src/components/units/markets/create/CreateProduct.presenter';

const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
    }
  }
`;

export default function ProductsEdit() {
  const router = useRouter();
  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.productId) },
  });
  return <CreateProducts isEdit={true} data={data} />;
}
