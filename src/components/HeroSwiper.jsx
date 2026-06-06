import React from 'react';
import Slider from 'react-slick';
import { useBanners } from '../hooks/useBanners';

export function HeroSwiper() {
  const { data: banners, isLoading, error } = useBanners();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 my-6 h-[400px] bg-gray-200 animate-pulse rounded-2xl"></div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 my-6 text-red-500">
        Xatolik yuz berdi.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 my-6 overflow-hidden">
      <Slider {...settings} className="rounded-2xl overflow-hidden">
        {banners?.map((banner) => (
          <div key={banner.id} className="relative h-[300px] md:h-[400px] outline-none">
            <img
              src={banner.thumbnail}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8 text-white">
              <h2 className="text-2xl md:text-5xl font-bold mb-2">{banner.title}</h2>
              <p className="text-sm md:text-xl mb-6 text-gray-200">{banner.description}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-fit">
                Koproq
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}