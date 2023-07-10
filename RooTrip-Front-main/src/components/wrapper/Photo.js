import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAddress } from '@services/image';
import { offLocation } from '@store/photoLocation-store';
import Modal from './Modal';
import '@styles/components/modalMessage.scss';

const Photo = ({
  id,
  photo,
  addRoute,
  clicked,
  updateCoordinate,
  isSelectLocation,
  setIsSelectLocation,
  onClick,
}) => {
  const [addressPoint, setAddressPint] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    fileName: updatedFileName,
    latitude: updatedLatitude,
    longitude: updatedLongitude,
  } = useSelector((state) => state.photoLocation);
  const dispatch = useDispatch();

  const { fileName, url, latitude, longitude } = photo;

  useEffect(() => {
    if (!updatedLatitude) return;

    const update = async () => {
      const updatedInfo = {
        updatedFileName,
        updatedLatitude,
        updatedLongitude,
      };
      await updateCoordinate(updatedInfo);
      await dispatch(offLocation());
      setIsSelectLocation('');
    };

    if (fileName === updatedFileName) update();
  }, [
    dispatch,
    updateCoordinate,
    fileName,
    updatedFileName,
    updatedLatitude,
    updatedLongitude,
    setIsSelectLocation,
  ]);

  useEffect(() => {
    // 좌표 정보 주소로 변환 받기
    const getAddressPoint = async () => {
      const address = await getAddress(latitude, longitude);

      setAddressPint(address);
      setLoading(true);
    };

    if (latitude && longitude) getAddressPoint().then(() => setLoading(true));
    else setLoading(true);
  }, [latitude, longitude]);

  const onClickRouteHandler = useCallback(() => {
    addRoute(id, photo);
  }, [id, addRoute, photo]);

  if (!loading) {
    return <li className='List_piece'></li>;
  }

  return (
    <>
      <li className='List_piece'>
        <div className='img_box'>
          <img src={url} alt='img' />
          {clicked > 0 && <div className='click_img'>{clicked}</div>}
        </div>
        <table>
          <tbody>
            <tr>
              <th>{id}번 사진</th>
              <td>
                {latitude ? (
                  <button
                    type='button'
                    onClick={onClickRouteHandler}
                    className={clicked ? 'select-location' : ''}
                  >
                    경로 표시
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={() => onClick(fileName)}
                    disabled={isSelectLocation === fileName}
                    className={
                      isSelectLocation === fileName ? 'select-location' : ''
                    }
                  >
                    위치 설정
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <td
                colSpan='2'
                style={{ color: `${addressPoint ? 'green' : 'red'}` }}
              >
                {addressPoint ? `${addressPoint}` : '위치를 설정해주세요!'}
              </td>
            </tr>
          </tbody>
        </table>
      </li>
      {message && (
        <Modal className='modal' background='white'>
          <div className='modal-message'>
            <p>{message}</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Photo;
