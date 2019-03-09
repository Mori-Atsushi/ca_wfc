import * as React from 'react';

import ImageList from 'components/ImageList';

import { getList } from 'api';
import { IImage } from 'api/response';

export default () => {
  const [images, setImages] = React.useState<IImage[]>([]);

  React.useEffect(() => {
    (async () => {
      setImages(await getList());
    })();
  }, []);

  return (
    <ImageList images={images} />
  );
};
