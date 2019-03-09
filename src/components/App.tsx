import * as React from 'react';

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
        <>{item.title}</>
      ))}
    </ul>
  );
};
