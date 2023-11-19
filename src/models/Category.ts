export interface ICategoryCreate {
  title: string;
}

export interface ICategory extends ICategoryCreate {
  id: number;
  owner_id: number;
}
