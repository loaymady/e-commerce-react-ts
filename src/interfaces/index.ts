export interface IProduct {
  id: number;
  quantity: number;
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
    category: {
      data: ICategory[];
    };
  };
}

interface ICategory {
  id: number;
  attributes: {
    title: string;
  };
}

export interface IUser {
  identifier: string;
  password: string;
}
export interface IRegister {
  email: string;
  username: string;
  password: string;
  admin: boolean;
}
