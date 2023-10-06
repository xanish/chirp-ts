import { TUser } from '../types/user.type';

export class User {
  id: null | string;
  username: null | string;
  firstName: null | string;
  lastName: null | string;
  email: string;
  city?: string;
  country?: string;
  birthDate?: Date;
  images = {
    tiny: 'https://placehold.co/50/4f46e5/white?text=Chirp&font=roboto',
    small: 'https://placehold.co/60/4f46e5/white?text=Chirp&font=roboto',
    medium: 'https://placehold.co/100/4f46e5/white?text=Chirp&font=roboto',
  };
  following: boolean;
  count = {
    tweets: 0,
    likes: 0,
    followers: 0,
    following: 0,
  };
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Partial<TUser>) {
    this.id = user.id ?? '';
    this.username = user.username ?? '';
    this.firstName = user.firstName ?? '';
    this.lastName = user.lastName ?? '';
    this.email = user.email ?? '';
    this.city = user.city ?? '';
    this.country = user.country ?? '';
    this.birthDate = user.birthDate ? new Date(user.birthDate) : new Date();
    this.following = user.following && user.following.length > 0 ? true : false;
    this.count.tweets = user._count?.tweets ?? 0;
    this.count.likes = user._count?.likes ?? 0;
    this.count.followers = user._count?.followers ?? 0;
    this.count.following = user._count?.following ?? 0;
    this.createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
    this.updatedAt = user.updatedAt ? new Date(user.updatedAt) : new Date();
    this.images.tiny = `https://placehold.co/50/4f46e5/white?text=${this.initials}&font=roboto`;
    this.images.small = `https://placehold.co/60/4f46e5/white?text=${this.initials}&font=roboto`;
    this.images.medium = `https://placehold.co/100/4f46e5/white?text=${this.initials}&font=roboto`;
  }

  get initials() {
    return (
      (this.firstName?.charAt(0).toUpperCase() ?? '') +
      (this.lastName?.charAt(0).toUpperCase() ?? '')
    );
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
