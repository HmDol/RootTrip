import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import getRecommendPost from '@services/route';
import { changeCoordinateOnMap } from '@store/map-store';
import { loadMarkers, removePrevMarkers } from '@store/marker-store';
import { changeCityToCoordinate } from '@utils/metadata';
import City from './City';
import SearchItem from './SearchItem';
import '@styles/home/route.scss';

const cities = [
  {
    id: 1,
    name: '서울',
    coordinate: [126.978, 37.5665],
  },
  {
    id: 2,
    name: '강원도',
    coordinate: [128.2092, 37.5555],
  },
  {
    id: 3,
    name: '경기도',
    coordinate: [127.5183, 37.4138],
  },
  {
    id: 4,
    name: '경상남도',
    coordinate: [128.6921, 35.2383],
  },
  {
    id: 5,
    name: '경상북도',
    coordinate: [128.8889, 36.4919],
  },
  {
    id: 6,
    name: '광주',
    coordinate: [126.8526, 35.1595],
  },
  {
    id: 7,
    name: '대구',
    coordinate: [128.6014, 35.8714],
  },
  {
    id: 8,
    name: '대전',
    coordinate: [127.3845, 36.3504],
  },
  {
    id: 9,
    name: '부산',
    coordinate: [129.0756, 35.1796],
  },
  {
    id: 10,
    name: '세종',
    coordinate: [127.2892, 36.4808],
  },
  {
    id: 11,
    name: '울산',
    coordinate: [129.3114, 35.5384],
  },
  {
    id: 12,
    name: '전라남도',
    coordinate: [126.991, 34.8679],
  },
  {
    id: 13,
    name: '전라북도',
    coordinate: [127.153, 35.7175],
  },
  {
    id: 14,
    name: '제주도',
    coordinate: [126.5312, 33.4996],
  },
  {
    id: 15,
    name: '충청남도',
    coordinate: [126.8, 36.5184],
  },
  {
    id: 16,
    name: '충청북도',
    coordinate: [127.9295, 36.6282],
  },
  {
    id: 17,
    name: '인천',
    coordinate: [126.7052, 37.4563],
  },
];

const Route = () => {
  const [isAddCity, setIsAddCity] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchCity, setSearchCity] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [message, setMessage] = useState('');

  const accessToken = useSelector((state) => state.auth.accessToken);
  const prevMarkers = useSelector((state) => state.marker.prevMarkers);
  const { postId } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!postId && prevMarkers.length !== 0) {
      dispatch(loadMarkers({ prevMarkers }));
      dispatch(removePrevMarkers());
    }
  }, [dispatch, postId, prevMarkers]);

  const onClickAddCityHandler = useCallback(() => {
    setIsAddCity((prevState) => !prevState);
  }, []);

  const addSearchCityHandler = useCallback(
    (city) => {
      if (searchCity.includes(city)) {
        const updatedSearchCity = searchCity.filter(
          (currentCity) => currentCity.name !== city.name,
        );

        setSearchCity(updatedSearchCity);
      } else {
        setSearchCity((prevCities) => [...prevCities, city]);
      }
    },
    [searchCity],
  );

  const onClickSearchHandler = useCallback(async () => {
    if (searchCity.length === 0) {
      alert('하나 이상 정해주세요.');
      return;
    }

    setIsAddCity(false);
    setIsSearch(true);

    const newMap = changeCityToCoordinate(searchCity);
    dispatch(changeCoordinateOnMap({ newMap }));

    try {
      const searchCityList = searchCity.map((city) => city.name);
      const post = await getRecommendPost(accessToken, searchCityList);

      setSearchList(post);
      setMessage('');
    } catch (e) {
      setSearchList([]);
      setMessage(e.message);
    }
  }, [dispatch, accessToken, searchCity]);

  return (
    <div className='route-content'>
      <div className='route-search-header'>
        <div className='route-search-bar'>
          <div className='route-search-title'>
            <h3>지 역</h3>
          </div>
          <div className='route-search-box'>
            <div className='route-search-city'>
              {searchCity.map((city) => `${city.name} `)}
            </div>
            <button
              className='route-search-button'
              onClick={onClickSearchHandler}
            >
              검색
            </button>
          </div>
        </div>
        <div className={`route-search-selectBox ${isAddCity ? 'open' : ''}`}>
          <div className='select-city-name'>
            {cities.map((city) => (
              <City
                key={city.id}
                city={city}
                addSearchCity={addSearchCityHandler}
                isMax={searchCity.length === 3}
              />
            ))}
          </div>
        </div>
        <div className='route-search-option'>
          <button onClick={onClickAddCityHandler}>
            {isAddCity ? (
              <svg
                width='14'
                height='12'
                viewBox='0 0 14 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M7 0L0.0717964 12L13.9282 12L7 0Z' fill='#D9D9D9' />
              </svg>
            ) : (
              <svg
                width='14'
                height='12'
                viewBox='0 0 14 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M7 12L13.9282 0H0.0717969L7 12Z' fill='#D9D9D9' />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className='route-search-list'>
        {searchList.map((item) => (
          <SearchItem key={item.id} item={item} />
        ))}
        {message && <p className='no-list-message'>{message}</p>}
      </div>
    </div>
  );
};

export default Route;
