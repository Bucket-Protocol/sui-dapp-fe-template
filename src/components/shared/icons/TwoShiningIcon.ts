import { GenIcon, IconType } from 'react-icons/lib';

const TwoShiningIcon: IconType = (props) =>
  GenIcon({
    tag: 'svg',
    attr: { viewBox: '1 1 14 14', fill: 'currentColor' },
    child: [
      {
        tag: 'path',
        attr: { d: 'M11 8L11.7425 10.2575L14 11L11.7425 11.7425L11 14L10.2575 11.7425L8 11L10.2575 10.2575L11 8Z' },
        child: [],
      },
      {
        tag: 'path',
        attr: {
          d: 'M5.1999 2L6.38784 5.61206L9.9999 6.8L6.38784 7.98794L5.1999 11.6L4.01196 7.98794L0.399902 6.8L4.01196 5.61206L5.1999 2Z',
        },
        child: [],
      },
    ],
  })(props);

export default TwoShiningIcon;
