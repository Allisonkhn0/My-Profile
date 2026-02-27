// y { "title", "description", "price", "categoryId", "imageUrl?" }.

export type AdsType = {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl?: string;
};

export type AdsTypeWithoutID = Omit<AdsType, "id">;

export type AdsResponseType = AdsType & {
  Category: {
    id: number;
    name: string;
  };
  User: {
    id: number;
    email: string;
    name: string;
  };
};
