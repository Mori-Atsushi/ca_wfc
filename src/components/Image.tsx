import * as React from 'react';

import { IImage } from 'api/response';

interface IProps extends IImage{
}

export default ({ title, url }: IProps) => (
  <>
    <h1>{title}</h1>
    <img src={url} alt={title} />
  </>
);
