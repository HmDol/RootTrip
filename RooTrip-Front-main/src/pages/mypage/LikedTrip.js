import React from 'react';

const LikedTrip = ({ articleData }) => (
  <>
    <div className='likedTripBox'>
      <div className='tripTitle'>
        <h2>내가 좋아한 여행</h2>
        <span>마음에 든 여행을 저장하세요</span>
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

export default LikedTrip;
