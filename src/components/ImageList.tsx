import * as React from 'react';
import styled from 'styled-components';

import Image from 'components/Image';

import { IImage } from 'api/response';

interface IProps {
  images: IImage[];
}

const maxWidth = 187;
const padding = 5;

export default ({ images }: IProps) => {
  const [element, setElement] = React.useState<HTMLElement>();
  const [clientWidth, setClientWidth] = React.useState<number>(0);

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
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [element]);

  const num = Math.ceil(clientWidth / maxWidth);

  return (
    <Wrapper ref={(el) => { if (el) setElement(el); }}>
      {images.map((item, index) => {
        const length = (clientWidth - padding * (num - 1)) / num;
        const top = Math.floor((index / num)) * (length + padding);
        const left = (index % num) * (length + padding);

        return (
          <Image
            key={item.id}
            top={top}
            left={left}
            width={length}
            height={length}
            image={item}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: relative;
`;
