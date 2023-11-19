export interface IFavoriteLocation {
  id: number;
  title: string;
  location: {
    position: {
      lng: number;
      lat: number;
    };
    name: string;
  };
  category_id: number;
  owner_id: number;
}
