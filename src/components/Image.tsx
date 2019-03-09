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

export default ({
  image,
  top,
  width,
  height,
}: IProps) => {
  const [selected, setSelected] = React.useState<Boolean>(false);
  React.useEffect(() => {
    if (selected) noScroll.on(); else noScroll.off();
  }, [selected]);
  const onClickImage = React.useCallback(() => {
    setSelected(true);
  }, []);
  const onClickBack = React.useCallback(() => {
    setSelected(false);
  }, []);
  const style: React.CSSProperties = selected ? {
    zIndex: 1000,
    top: window.pageYOffset + (window.innerHeight - height) / 2,
    left: 0,
    width,
    height,
  } : {
    top,
    left: 0,
    width,
    height,
  };

  return (
    <>
      <Wrapper style={style} onClick={onClickImage}>
        <Img src={image.url} alt={image.title} />
      </Wrapper>
      { selected ? <PopupBackground onClick={onClickBack} /> : null }
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  transition: all 1s ease;
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
`;
