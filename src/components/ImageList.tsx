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
  const [selectedId, setSelectedId] = React.useState<string>(window.location.hash.slice(1));

  const onResize = React.useCallback(() => {
    if (element) {
      setClientWidth(element.clientWidth);
    }
  }, [element]);

  React.useEffect(() => {
    const onHashChange = () => {
      setSelectedId(window.location.hash.slice(1));
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [element]);

  const num = Math.ceil(clientWidth / maxWidth);
  const length = (clientWidth - padding * (num - 1)) / num;
  const height = Math.floor((images.length / num)) * (length + padding) + length;
  return (
    <Wrapper ref={(el) => { if (el) setElement(el); }} style={{ height }}>
      {images.map((item, index) => {
        const top = Math.floor((index / num)) * (length + padding);
        const left = (index % num) * (length + padding);
        const isSelected = selectedId === `${item.id}`;

        return (
          <Image
            key={item.id}
            top={top}
            left={left}
            width={length}
            height={length}
            image={item}
            isSelected={isSelected}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: relative;
`;
