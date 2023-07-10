import { useCallback, useState } from 'react';

const PhotoItem = ({ imageUrl, address }) => {
  const [isClick, setIsClick] = useState(false);
  const [clientPos, setClientPos] = useState({
    clientX: 0,
    clientY: 0,
  });

  const onClickPhotoHandler = useCallback((event) => {
    setIsClick((prevState) => !prevState);

    const { clientX, clientY } = event;
    const photoContainer = event.currentTarget.getBoundingClientRect();
    const offsetX = clientX - photoContainer.left;
    const offsetY = clientY - photoContainer.top;

    setClientPos({
      clientX: offsetX - 60,
      clientY: offsetY - 41.6,
    });
  }, []);

  return (
    <div className='photo' onClick={onClickPhotoHandler}>
      <img src={imageUrl} alt={`${address}-image`} />
      {isClick && (
        <div
          className='address-balloon'
          style={{
            top: `${clientPos.clientY}px`,
            left: `${clientPos.clientX}px`,
          }}
        >
          <p>{address}</p>
        </div>
      )}
    </div>
  );
};

export default PhotoItem;
