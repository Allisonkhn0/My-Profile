export type CategoryType = {
  id: number;
  name: string;
};


export type CategoryTypeWithoutId = Omit<CategoryType, "id">