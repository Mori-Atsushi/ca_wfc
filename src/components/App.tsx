import * as React from 'react';

import Image from 'components/Image';

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
    <ul>
      {images.map(item => (
        <ul key={item.id}>
          <Image {...item} />
        </ul>
      ))}
    </ul>
  );
};
