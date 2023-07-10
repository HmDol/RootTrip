export function getCoord(ref, degree, min, sec) {
  // 남위(S)인 경우 -1, 북위(N)인 경우 1
  // 서경(W)인 경우 -1, 동경(E)인 경우 1
  const sign = ref === 'S' || ref === 'W' ? -1 : 1;

  // 위도 정보 계산
  return sign * (degree + min / 60 + sec / 3600);
}

export function getLocation(
  GPSLatitudeRef,
  GPSLatitude,
  GPSLongitudeRef,
  GPSLongitude,
) {
  const [latDegree, latMin, latSec] = GPSLatitude;
  const [lngDegree, lngMin, lngSec] = GPSLongitude;

  const latitude = getCoord(GPSLatitudeRef, latDegree, latMin, latSec);
  const longitude = getCoord(GPSLongitudeRef, lngDegree, lngMin, lngSec);

  return [latitude, longitude];
}

export function changeQueryBounds({ _sw, _ne }) {
  const { lat: lat1, lng: lng1 } = _sw;
  const { lat: lat2, lng: lng2 } = _ne;

  const polygon = `Polygon((${lat1} ${lng1}, ${lat2} ${lng2}, ${lat2} ${lng1}, ${lat1} ${lng1}))`;
  return polygon;
}

export function changeCityToCoordinate(cities) {
  let totalLng = 0;
  let totalLat = 0;
  let minLng = Infinity;
  let maxLng = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  cities.forEach((city) => {
    if (city === null) return;

    const [lng, lat] = city.coordinate;
    totalLng += lng;
    totalLat += lat;

    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  });

  // 경도와 위도 범위 계산
  const lngRange = maxLng - minLng;
  const latRange = maxLat - minLat;

  // zoom level 설정
  let zoom = 9;
  let weight = 0;

  if (lngRange > 2.5 || latRange > 3.5) {
    weight = 2.75;
    zoom = 6; // 매우 넓은 범위일 때
  } else if (lngRange > 1 || latRange > 2) {
    weight = 1.3;
    zoom = 7; // 중간 범위일 때
  } else {
    if (cities[0].name) {
      if (cities[0].name.endsWith('도') || cities[0].name === '광주') zoom = 8;
      else zoom = 9;
    }

    weight = 0.5;
  }

  const avgLng = totalLng / cities.length;
  const avgLat = totalLat / cities.length;

  return { center: [avgLng + weight, avgLat], zoom };
}
