import React from 'react';

const MyTrip = ({ articleData }) => (
  <>
    <div className='myTripBox'>
      <div className='tripTitle'>
        <h2>나의 게시물</h2>
        <span>자신의 게시물을 기록해 보세요</span>
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

export default MyTrip;
