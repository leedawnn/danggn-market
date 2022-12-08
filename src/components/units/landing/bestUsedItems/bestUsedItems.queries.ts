import { gql } from '@apollo/client';

export const FETCH_USED_ITEMS_OF_THE_BEST = gql`
  query fetchUseditemsOfTheBest {
    fetchUseditemsOfTheBest {
      name
      price
      images
      pickedCount
    }
  }
`;
