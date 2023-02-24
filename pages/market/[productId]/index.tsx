import Head from 'next/head';
import { gql, GraphQLClient } from 'graphql-request';
import DetailProductContainer from '../../../src/components/units/markets/detail/DetailProduct.container';

const DetailProducts = (props: any) => {
  return (
    <>
      <Head>
        <title>댕근마켓 | {props?.fetchUseditem.name}</title>
        <meta property='og:title' content={props?.fetchUseditem.name} />
        <meta property='og:description' content={props?.fetchUseditem.remarks} />
        <meta property='og:image' content={props?.fetchUseditem?.images?.[0]} />
      </Head>

      <DetailProductContainer />
    </>
  );
};
export default DetailProducts;

export const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        zipcode
        address
        addressDetail
        lat
        lng
      }
      seller {
        name
        picture
      }
      createdAt
    }
  }
`;

export const getServerSideProps = async (context: any) => {
  const graphQLClient = new GraphQLClient('https://backend10.codebootcamp.co.kr/graphql');

  const result = await graphQLClient.request(FETCH_USED_ITEM, {
    useditemId: context.query.productId,
  });

  return {
    props: {
      fetchUseditem: {
        _id: result.fetchUseditem._id,
        name: result.fetchUseditem.name,
        remarks: result.fetchUseditem.remarks,
        contents: result.fetchUseditem.contents,
        price: result.fetchUseditem.price,
        tags: result.fetchUseditem.tags,
        images: result.fetchUseditem.images,
      },
    },
  };
};
