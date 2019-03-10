import * as React from 'react';
import styled from 'styled-components';

import ImageList from 'components/ImageList';
import SearchInput from 'components/SearchInput';

import { getList } from 'api';
import { IImage } from 'api/response';

export default () => {
  const [images, setImages] = React.useState<IImage[]>([]);

  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    (async () => {
      setImages(await getList());
    })();
  }, []);

  return (
    <Wrapper>
      <ImageList
        images={images.filter(
          item => `${item.title} ${item.description}`.indexOf(query) > -1
        )}
        marginTop={100}
        maxWidth={1000}
      />
      <SearchWrapper>
        <SearchInput onChange={value => setQuery(value)} value={query} />
      </SearchWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  font-family: "Hiragino Kaku Gothic ProN","メイリオ", sans-serif;
`;

const SearchWrapper = styled.div`
  position: absolute;
  top: 2rem;;
  left: 0;
  right: 0;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
`;
