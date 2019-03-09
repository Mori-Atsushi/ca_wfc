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
        const height = item.height * clientWidth / item.width;
        const top = images
          .slice(0, index)
          .map(i => i.height * clientWidth / i.width)
          .reduce((a, b) => a + b, 0);

        return (
          <Image key={item.id} top={top} width={clientWidth} height={height} image={item} />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: relative;
`;
