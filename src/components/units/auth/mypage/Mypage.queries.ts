import { gql } from '@apollo/client';

// 유저 관리
export const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
    }
  }
`;

export const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password) {
      _id
    }
  }
`;

// => 포인트 관리
// 보유 포인트
// 포인트 충전하기

// fetchPointTransactions : 포인트 충전 내역

// => 중고 거래 관리
// fetchPointTransactionsOfSelling : 내가 판매한 상품
// fetchPointTransactionsOfBuying : 내가 구매한 상품
// 장바구니

// => 게시판 관리
// fetchBoardsOfMine : 내 게시글 보기

// => 주문내역
// fetchPointTransactions : 포인트 충전 내역
