import { useCallback, useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import Menu from '@constants/menu';
import { loadPost } from '@store/post-store';

const CustomMarker = ({ postId, lng, lat, imageURl, order }) => {
  const [isClick, setIsClick] = useState(false);

  const menu = useSelector((state) => state.menu);
  const { postId: id } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id === postId) setIsClick(true);
    else setIsClick(false);
  }, [postId, id]);

  const onMarkerClick = useCallback(() => {
    dispatch(loadPost({ postId }));
  }, [dispatch, postId]);

  return (
    <Marker
      longitude={lng}
      latitude={lat}
      anchor='bottom'
      onClick={onMarkerClick}
    >
      <div className='map-marker-image'>
        <img
          src={imageURl}
          alt='marker'
          className={`${isClick && menu === Menu.TRIP ? 'clicked' : ''} ${
            menu !== Menu.TRIP ? 'no-effect-marker' : ''
          }`}
          style={{ cursor: menu === Menu.TRIP ? 'pointer' : 'initial' }}
        />
        {order && <span>{order}</span>}
      </div>
    </Marker>
  );
};

export default CustomMarker;
