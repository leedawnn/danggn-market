import CartUI from './Cart.presenter';
import { useEffect, useState } from 'react';
import { IUseditem } from '../../../../commons/types/generated/types';

const CartContainer = () => {
  const [baskets, setBaskets] = useState<IUseditem[]>([]);

  const handleImageError = (event: any) => {
    event.target.src = '/default.png';
  };

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('baskets') || '[]');
    setBaskets(result);
  }, []);

  return <CartUI baskets={baskets} handleImageError={handleImageError} />;
};
export default CartContainer;
