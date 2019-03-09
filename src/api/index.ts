
import { getRequest } from 'api/common';
import { IImagesResponse, IImage } from 'api/response';

export async function getList(): Promise<IImage[]> {
  return getRequest<IImagesResponse>('/images?limit=100')
    .then(result => result.data.images);
}
