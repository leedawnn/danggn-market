import { useQuery } from '@apollo/client';
import { IQuery, IQueryFetchUseditemsIPickedArgs } from '../../../../commons/types/generated/types';
import LikeUI from './Like.presenter';
import { FETCH_USED_ITEMS_I_PICKED, FETCH_USED_ITEMS_COUNT_I_PICKED } from './Like.queries';

const LikeContainer = () => {
  const { data } = useQuery<Pick<IQuery, 'fetchUseditemsIPicked'>, IQueryFetchUseditemsIPickedArgs>(
    FETCH_USED_ITEMS_I_PICKED,
    {
      variables: {
        page: 1,
        search: '',
      },
    }
  );

  const { data: IPickedCountData } = useQuery<Pick<IQuery, 'fetchUseditemsCountIPicked'>>(
    FETCH_USED_ITEMS_COUNT_I_PICKED
  );

  return <LikeUI data={data} IPickedCountData={IPickedCountData} />;
};

export default LikeContainer;
