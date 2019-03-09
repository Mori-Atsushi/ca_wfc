import * as React from 'react';
import axios from 'axios';

export default () => {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const result: any = await axios(
        'https://wfc-2019.firebaseapp.com/images',
      );

      setImages(result.data.data.images);
    })();
  }, []);

  return (
    <ul>
      {images.map((item: any) => (
        <>{item.title}</>
      ))}
    </ul>
  );
};
