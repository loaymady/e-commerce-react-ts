export interface IProduct {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    stock: number;
    thumbnail: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              url: string;
            };
          };
        };
      };
    };
  };
}

export interface IUser {
  identifier: string;
  password: string;
}
