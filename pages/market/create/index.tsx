import CreateProducts from '../../../src/components/units/markets/create';
import { withAuth } from '../../../src/commons/libraries/withAuth';

const ProductsCreate = () => {
  return <CreateProducts isEdit={false} />;
};

export default withAuth(ProductsCreate);
