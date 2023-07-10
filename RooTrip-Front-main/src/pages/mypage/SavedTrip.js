import React from 'react';

const SavedTrip = ({ articleData }) => (
  <>
    <div className='savedTripBox'>
      <div className='tripTitle'>
        <h2>추천 받은 여행</h2>
        <span>Log를 통해 여행경로를 추천받아 보세요</span>
      </div>
      {articleData && (
        <div className='tripContent'>
          {Object.keys(articleData).map((key) => (
            <div className='article' key={key}>
              <div className='articleImg'>
                <img
                  src={articleData[key].photos[0].imageUrl}
                  alt='사진 없음'
                />
              </div>
              <div className='articleTitle'>
                <span>{articleData[key].title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);

export default SavedTrip;
