import * as React from 'react';
import styled from 'styled-components';

import { IImage } from 'api/response';

interface IProps {
  image: IImage;
}

export default ({ image }: IProps) => (
  <Wrapper>
    <Title>{ image.title }</Title>
    <Description>{ image.description }</Description>
  </Wrapper>
);

const Wrapper = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  color: #ffffff;
  padding: 2rem 5%;
  text-shadow:0px 1px 8px #000000;
`;

const Title = styled.div`
  font-size: 1.6rem;
  line-height: 2rem;
`;

const Description = styled.div`
  color: #cccccc;
  line-height: 2rem;
  padding: 0.5rem;
`;
