class User {
  public username: string;
  public email: string;
  public password: string;

  constructor(data: User) {
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
  }
}
