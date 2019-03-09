import * as React from 'react';
import styled from 'styled-components';
import * as noScroll from 'no-scroll';

import { IImage } from 'api/response';

interface IProps {
  image: IImage,
  top: number,
  width: number,
  height: number,
}

const time = 0.4;

export default ({
  image,
  top,
  width,
  height,
}: IProps) => {
  const [selected, setSelected] = React.useState<Boolean>(false);
  const [backgroundOpacitiy, setBackgroundOpacitiy] = React.useState<number>(0);
  const [backgroundVisible, setBackgroundVisible] = React.useState<boolean>(false);
  const [imageZIndex, setImageZIndex] = React.useState<number>(0);
  const [timeoutId, setTimeoutId] = React.useState<number>();
  const onClickImage = React.useCallback(() => {
    setSelected(true);
    setBackgroundVisible(true);
    setImageZIndex(1000);
    window.requestAnimationFrame(() => {
      setBackgroundOpacitiy(1);
      noScroll.on();
    });
    window.clearTimeout(timeoutId);
  }, []);
  const onClickBack = React.useCallback(() => {
    setSelected(false);
    setBackgroundOpacitiy(0);
    noScroll.off();
    setTimeoutId(window.setTimeout(() => {
      setBackgroundVisible(false);
      setImageZIndex(0);
    }, time * 1000));
  }, []);
  const style: React.CSSProperties = selected ? {
    zIndex: imageZIndex,
    top: window.pageYOffset + (window.innerHeight - height) / 2,
    left: 0,
    width,
    height,
  } : {
    zIndex: imageZIndex,
    top,
    left: 0,
    width,
    height,
  };
  const backgroundStyle: React.CSSProperties = {
    display: backgroundVisible ? 'block' : 'none',
    opacity: backgroundOpacitiy,
  };

  return (
    <>
      <Wrapper style={style} onClick={onClickImage}>
        <Img src={image.url} alt={image.title} />
      </Wrapper>
      <PopupBackground onClick={onClickBack} style={backgroundStyle} />
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
transition: all ${time}s ease;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const PopupBackground = styled.div`
  background-color: #333333;
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
