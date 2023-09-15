export type TUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName?: string;
  city?: string;
  country?: string;
  birthDate?: string;
  _count?: {
    tweets?: number;
    likes?: number;
    followers?: number;
    following?: number;
  };
  createdAt: string;
  updatedAt: string;
};
