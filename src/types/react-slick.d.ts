declare module 'react-slick' {
  import React from 'react';
  
  export interface SliderSettings {
    dots?: boolean;
    arrows?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    pauseOnHover?: boolean;
    adaptiveHeight?: boolean;
    beforeChange?: (current: number, next: number) => void;
    customPaging?: (i: number) => React.ReactNode;
    [key: string]: any;
  }
  
  export default class Slider extends React.Component<SliderSettings> {
    slickPrev(): void;
    slickNext(): void;
    slickGoTo(slide: number): void;
    slickPause(): void;
    slickPlay(): void;
  }
} 