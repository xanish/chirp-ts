import { TUser } from '../types/user.type';

export class User {
  public id: null | string;
  public username: null | string;
  public firstName: null | string;
  public lastName: null | string;
  public email: string;
  public city?: string;
  public country?: string;
  public birthDate?: Date;
  public count = {
    tweets: 0,
    likes: 0,
    followers: 0,
    following: 0,
  };
  createdAt: Date;
  updatedAt: Date;
  public profileImg =
    'https://placehold.co/60/4f46e5/white?text=Chirp&font=roboto';

  constructor(user: Partial<TUser>) {
    this.id = user.id ?? '';
    this.username = user.username ?? '';
    this.firstName = user.firstName ?? '';
    this.lastName = user.lastName ?? '';
    this.email = user.email ?? '';
    this.city = user.city ?? '';
    this.country = user.country ?? '';
    this.birthDate = user.birthDate ? new Date(user.birthDate) : new Date();
    this.count.tweets = user._count?.tweets ?? 0;
    this.count.likes = user._count?.likes ?? 0;
    this.count.followers = user._count?.followers ?? 0;
    this.count.following = user._count?.following ?? 0;
    this.createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
    this.updatedAt = user.updatedAt ? new Date(user.updatedAt) : new Date();
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get location() {
    let place = `${this.city ?? ''}, ${this.country ?? ''}`;

    return place.trim() === ','
      ? 'Unknown'
      : place.endsWith(',')
      ? place.replace(',', '')
      : place;
  }

  static default(): User {
    return new User({});
  }
}
