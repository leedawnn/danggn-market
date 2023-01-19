import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { withAuth } from '../../../src/commons/libraries/withAuth';
import { IUseditem } from '../../../src/commons/types/generated/types';
import { CartState } from '../../../src/commons/store';
import { useRecoilState } from 'recoil';
import CartContainer from '../../../src/components/units/auth/cart/Cart.container';

const CartPage = () => {
  return <CartContainer />;
};

export default withAuth(CartPage);
