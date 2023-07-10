import { useCallback, useState } from 'react';

const City = ({ addSearchCity, city, isMax }) => {
  const [isSelected, setIsSelected] = useState(false);

  const onClickHandler = useCallback(() => {
    if (isMax && !isSelected) {
      alert('최대 3개 선택');
      return;
    }

    setIsSelected((prevSelected) => !prevSelected);
    addSearchCity(city);
  }, [addSearchCity, city, isMax, isSelected]);

  return (
    <button
      onClick={onClickHandler}
      style={{ background: isSelected ? '#777777' : '#ccc' }}
    >
      {city.name}
    </button>
  );
};

export default City;
