export class User {
  public id: null | string;
  public username: null | string;
  public firstName: null | string;
  public lastName: null | string;
  public profileImg =
    'https://placehold.co/60/4f46e5/white?text=Chirp&font=roboto';

  constructor(
    id: null | string,
    username: null | string,
    firstName: null | string,
    lastName: null | string
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName == null ? '' : lastName;
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}
