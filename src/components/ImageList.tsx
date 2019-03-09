import * as React from 'react';
import styled from 'styled-components';

import Image from 'components/Image';

import { IImage } from 'api/response';

interface IProps {
  images: IImage[]
}

export default ({ images }: IProps) => {
  const [element, setElement] = React.useState<HTMLElement>();
  const [clientWidth, setClientWidth] = React.useState<number>(100);

  const onResize = React.useCallback(() => {
    if (element) {
      setClientWidth(element.clientWidth);
    }
  }, [element]);
  const firstUpdate = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdate.current) {
      window.addEventListener('resize', onResize);
    }
    if (element) {
      setClientWidth(element.clientWidth);
    }

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [element]);

  return (
    <Wrapper ref={(el) => { if (el) setElement(el); }}>
      {images.map((item, index) => {
        const top = images
          .slice(0, index)
          .map(i => i.height * clientWidth / i.width)
          .reduce((a, b) => a + b, 0);

        const style: React.CSSProperties = {
          top,
          left: 0,
        };

        return (
          <Item style={style} key={item.id}>
            <Image {...item} />
          </Item>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: relative;
`;

const Item = styled.li`
  position: absolute;
  width: 100%;
`;
