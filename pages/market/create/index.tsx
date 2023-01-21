import CreateProductContainer from '../../../src/components/units/markets/create/CreateProduct.container';
import { withAuth } from '../../../src/commons/libraries/withAuth';

const ProductsCreate = () => {
  return <CreateProductContainer isEdit={false} />;
};

export default withAuth(ProductsCreate);
