import { withAuth } from '../../../src/commons/libraries/withAuth';
import CartContainer from '../../../src/components/units/auth/cart/Cart.container';

const CartPage = () => {
  return <CartContainer />;
};

export default withAuth(CartPage);
