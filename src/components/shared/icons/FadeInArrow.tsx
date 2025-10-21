'use client';

import { GenIcon, IconType } from 'react-icons/lib';

const FadeInArrow: IconType = (props) =>
  GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 41 15', fill: 'none' },
    child: [
      {
        tag: 'path',
        attr: {
          d: 'M40.7071 8.20711C41.0976 7.81658 41.0976 7.18342 40.7071 6.79289L34.3431 0.428932C33.9526 0.0384078 33.3195 0.0384078 32.9289 0.428932C32.5384 0.819457 32.5384 1.45262 32.9289 1.84315L38.5858 7.5L32.9289 13.1569C32.5384 13.5474 32.5384 14.1805 32.9289 14.5711C33.3195 14.9616 33.9526 14.9616 34.3431 14.5711L40.7071 8.20711ZM0 7.5V8.5H40V7.5V6.5H0V7.5Z',
          fill: 'url(#paint_linear)',
        },
        child: [],
      },
      {
        tag: 'defs',
        attr: {},
        child: [
          {
            tag: 'linearGradient',
            attr: {
              id: 'paint_linear',
              x1: '0',
              y1: '8',
              x2: '40',
              y2: '8',
              gradientUnits: 'userSpaceOnUse',
            },
            child: [
              {
                tag: 'stop',
                attr: {
                  stopColor: 'currentColor',
                  stopOpacity: '0',
                },
                child: [],
              },
              {
                tag: 'stop',
                attr: {
                  offset: '0.547577',
                  stopColor: 'currentColor',
                  stopOpacity: '1',
                },
                child: [],
              },
            ],
          },
        ],
      },
    ],
  })(props);

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  width="41"
  height="15"
  viewBox="0 0 41 15"
  fill="none"
>
  <path
    d="M40.7071 8.20711C41.0976 7.81658 41.0976 7.18342 40.7071 6.79289L34.3431 0.428932C33.9526 0.0384078 33.3195 0.0384078 32.9289 0.428932C32.5384 0.819457 32.5384 1.45262 32.9289 1.84315L38.5858 7.5L32.9289 13.1569C32.5384 13.5474 32.5384 14.1805 32.9289 14.5711C33.3195 14.9616 33.9526 14.9616 34.3431 14.5711L40.7071 8.20711ZM0 7.5V8.5H40V7.5V6.5H0V7.5Z"
    fill="url(#paint0_linear_4704_7597)"
  />
  <defs>
    <linearGradient
      id="paint0_linear_4704_7597"
      x1="0"
      y1="8"
      x2="40"
      y2="8"
      gradientUnits="userSpaceOnUse"
    >
      <stop
        stop-color="white"
        stop-opacity="0"
      />
      <stop
        offset="0.547577"
        stop-color="white"
        stop-opacity="0.5"
      />
    </linearGradient>
  </defs>
</svg>; */
}

export default FadeInArrow;
