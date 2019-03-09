export interface IImagesResponse {
  ok: boolean,
  data: {
    images: IImage[]
  };
}

export interface IImage {
  location: ILocation;
  id: string;
  url: string;
  title: string;
  description: string;
  postDatetime: number;
  width: number;
  height: number;
}

interface ILocation {
  lat: number;
  lng: number;
}
