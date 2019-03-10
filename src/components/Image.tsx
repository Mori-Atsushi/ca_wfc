import * as React from 'react';
import styled from 'styled-components';
import * as noScroll from 'no-scroll';
import ArrowBack from '@material-ui/icons/ArrowBack';

import Detail from 'components/Detail';

import { IImage } from 'api/response';

interface IProps {
  image: IImage;
  top: number;
  left: number;
  width: number;
  height: number;
  isSelected?: Boolean;
  delay: number;
  windowSize: { width: number, height: number }
  pageYOffset: number;
  isInDisplay: boolean;
}

const time = 0.25;

export default ({
  image,
  top,
  width,
  height,
  left,
  isSelected,
  delay,
  windowSize,
  pageYOffset,
  isInDisplay,
}: IProps) => {
  const [selected, setSelected] = React.useState<Boolean>(false);
  const [backgroundOpacitiy, setBackgroundOpacitiy] = React.useState<number>(0);
  const [backgroundVisible, setBackgroundVisible] = React.useState<boolean>(false);
  const [imageZIndex, setImageZIndex] = React.useState<number>(0);
  const [timeoutId, setTimeoutId] = React.useState<number>();
  const [opacity, setOpacity] = React.useState<number>(selected ? 1 : 0);
  const [translateY, setTranslateY] = React.useState<number>(selected ? 0 : 100);
  const onClickImage = React.useCallback(() => {
    if (selected) return;
    window.location.hash = image.id;
    window.clearTimeout(timeoutId);
    setSelected(true);
    setBackgroundVisible(true);
    setImageZIndex(1000);
    noScroll.on();
    window.requestAnimationFrame(() => {
      setBackgroundOpacitiy(1);
    });
  }, [selected, timeoutId]);
  const onClickBack = React.useCallback(() => {
    if (!selected) return;
    window.location.hash = '';
    setSelected(false);
    setBackgroundOpacitiy(0);
    noScroll.off();
    const id = window.setTimeout(() => {
      setBackgroundVisible(false);
      setImageZIndex(0);
    }, time * 1000);
    setTimeoutId(id);
  }, [selected]);
  const getStyle = React.useCallback((): React.CSSProperties => {
    if (selected) {
      const isOblong = image.height / image.width < windowSize.height / windowSize.width;
      const selectedHeight = isOblong
        ? image.height * windowSize.width / image.width
        : windowSize.height;
      const selectedWidth = isOblong
        ? windowSize.width
        : image.width * windowSize.height / image.height;

      return {
        zIndex: imageZIndex,
        top: pageYOffset + (windowSize.height - selectedHeight) / 2,
        left: (windowSize.width - selectedWidth) / 2,
        width: selectedWidth,
        height: selectedHeight,
        transform: 'translateY(0)',
        opacity: 1,
        cursor: 'auto',
      };
    }
    return {
      zIndex: imageZIndex,
      top,
      left,
      width,
      height,
      transform: `translateY(${translateY}px)`,
      opacity,
      cursor: 'pointer',
    };
  }, [selected, windowSize, top, left, width, height, imageZIndex, translateY, opacity]);
  React.useEffect(() => {
    if (!selected && isInDisplay) {
      window.setTimeout(() => {
        setTranslateY(0);
        setOpacity(1);
      }, delay * 1000);
    } else {
      setTranslateY(0);
      setOpacity(1);
    }
  }, []);

  React.useEffect(() => {
    if (selected && !isSelected) {
      onClickBack();
    } else if (!selected && isSelected) {
      onClickImage();
    }
    setSelected(isSelected || false);
  }, [isSelected]);

  const style: React.CSSProperties = getStyle();

  const backgroundStyle: React.CSSProperties = {
    display: backgroundVisible ? 'block' : 'none',
    opacity: backgroundOpacitiy,
  };

  return (
    <>
      <Wrapper style={style} onClick={onClickImage}>
        <Img src={image.url} alt={image.title} />
      </Wrapper>
      <PopupBackground style={backgroundStyle} />
      <BackIcon onClick={onClickBack} style={backgroundStyle} />
      <DetailWrapper style={backgroundStyle}>
        <Detail image={image} />
      </DetailWrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  transition: all ${time}s ease;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const PopupBackground = styled.div`
  background-color: #000000;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: opacity ${time}s ease;
`;

const BackIcon = styled(ArrowBack)`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 2000;
  color: #ffffff;
  font-size: 4rem;
  cursor: pointer;
  transition: opacity ${time}s ease;
`;

const DetailWrapper = styled.div`
  position: fixed;
  z-index: 3000;
  left: 0;
  right: 0;
  bottom: 0;
`;
