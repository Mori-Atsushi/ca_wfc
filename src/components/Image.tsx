import * as React from 'react';
import styled from 'styled-components';

import { IImage } from 'api/response';

interface IProps extends IImage{
}

export default ({ title, url }: IProps) => (
  <Wrapper>
    <Img src={url} alt={title} />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
