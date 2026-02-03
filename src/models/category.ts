export interface Category {
  id: string;
  _id?: string;
  name: string;
  path: string; // slug used in routes
  description?: string;
  image?: string;
}
