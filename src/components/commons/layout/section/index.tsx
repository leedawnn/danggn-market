import useMoveScroll from '../../../../commons/libraries/useMoveScroll';
import AboutCommunity from '../../../units/landing/aboutCommunity';
import AboutMarket from '../../../units/landing/aboutmarket';
import BestUsedItems from '../../../units/landing/bestUsedItems';
import RollingBanner from '../../../units/landing/rollingBanner';

const Section = () => {
  const { element, onMoveToElement } = useMoveScroll();

  return (
    <>
      <RollingBanner />
      <AboutCommunity />
      <AboutMarket onMoveToElement={onMoveToElement} />
      <BestUsedItems element={element} />
    </>
  );
};
export default Section;
