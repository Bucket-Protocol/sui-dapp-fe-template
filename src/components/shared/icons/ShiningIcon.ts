import { GenIcon, IconType } from 'react-icons/lib';

const ShiningIcon: IconType = (props) =>
  GenIcon({
    tag: 'svg',
    attr: { viewBox: '4 4 11 11', fill: 'currentColor' },
    child: [
      {
        tag: 'path',
        attr: { d: 'M9 3L10.4849 7.51508L15 9L10.4849 10.4849L9 15L7.51508 10.4849L3 9L7.51508 7.51508L9 3Z' },
        child: [],
      },
    ],
  })(props);

export default ShiningIcon;
