import * as React from 'react';
import styled from 'styled-components';

import Image from 'components/Image';

import { IImage } from 'api/response';

interface IProps {
  images: IImage[];
  marginTop: number;
  maxWidth: number;
}

const maxLength = 187;
const padding = 5;

export default ({ images, marginTop, maxWidth }: IProps) => {
  const [selectedId, setSelectedId] = React.useState<string>(window.location.hash.slice(1));
  const [windowSize, setWindowSize] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [pageYOffset, setPageYOffset] = React.useState(window.pageYOffset);
  const [isFirstRender, SetIsFirstRender] = React.useState(true);


  React.useEffect(() => {
    const onResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    const onHashChange = () => {
      setSelectedId(window.location.hash.slice(1));
    };
    const onScroll = () => {
      if (document.documentElement.style.overflow !== 'hidden') {
        setPageYOffset(window.pageYOffset);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    SetIsFirstRender(false);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const num = Math.ceil(Math.min(windowSize.width, maxWidth) / maxLength);
  const length = (Math.min(windowSize.width, maxWidth) - padding * (num - 1)) / num;
  const height = num === 0 ? 0 : Math.floor((images.length / num)) * (length + padding) + length;
  return (
    <Wrapper style={{ height }}>
      {images.map((item, index): JSX.Element | null => {
        const top = Math.floor((index / num)) * (length + padding) + marginTop;
        const left = (index % num) * (length + padding)
          + Math.max((windowSize.width - maxWidth) / 2, 0);
        const isSelected = selectedId === `${item.id}`;
        const offset = windowSize.height / 2;
        const isInDisplay = top + height > pageYOffset - offset
          && top < pageYOffset + windowSize.height + offset;

        if (!isSelected && !isInDisplay) {
          return null;
        }

        return (
          <Image
            key={item.id}
            top={top}
            left={left}
            width={length}
            height={length}
            image={item}
            isSelected={isSelected}
            delay={isFirstRender ? index * 0.02 : 0}
            windowSize={windowSize}
            pageYOffset={pageYOffset}
            isInDisplay={isInDisplay}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: relative;
`;
