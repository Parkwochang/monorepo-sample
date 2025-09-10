'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { Skeleton } from '@workspace/ui/components/box';
import { useGetChurches } from '@workspace/http/must/church';
import { ChurchSlideModal } from '@/shared/components/box';

export const MapScreen = () => {
  const [{ lat, lng }, setLocation] = useState({ lat: 37.5665, lng: 126.978 });
  const [onMount, setOnMount] = useState<boolean>(false);

  const { data } = useGetChurches({ page: '1', size: '1000' });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
        setLocation({ lat, lng });
      });
    }

    if (window?.kakao?.maps) {
      console.log('reload');
      setOnMount(true);
    }
  }, []);

  return (
    <>
      {onMount ? (
        <Map center={{ lat, lng }} style={{ width: '100%', height: '100%' }} level={5}>
          <MapMarker position={{ lat, lng }} />
          {data?.content.map((data) => (
            <ChurchSlideModal key={data.churchName} data={data}>
              <MapMarker
                image={{ src: `/icon/spot.png`, size: { width: 48, height: 48 } }}
                position={{ lat: Number(data.latitude), lng: Number(data.longitude) }}
                title={data.churchName}
              />
            </ChurchSlideModal>
          ))}
          {/* {<MapMarker
                  image={{ src: `/icon/map_${tab}.svg`, size: { width: 48, height: 48 } }}
                  position={{ lat: item.mapy, lng: item.mapx }}
                  title={item.pharname}
                />} */}
        </Map>
      ) : (
        <Skeleton className="w-full h-full bg-background flex-center">
          <Image src="/icon/map.svg" width={110} height={110} alt="map" />
        </Skeleton>
      )}

      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_SCRIPT}&autoload=false&libraries=services,clusterer`}
        strategy="afterInteractive"
        onLoad={(e) => {
          kakao.maps.load(() => {
            console.log('kakao.maps.load');
            setOnMount(true);
          });
          // const geo = new kakao.maps.services.Geocoder();
          // const test = geo.addressSearch('제주특별자치도 서귀포시 특별자치도, 안덕면 산방로 141', () => { })
          // console.log(geo, test, "geo :::")
        }}
      ></Script>
    </>
  );
};
