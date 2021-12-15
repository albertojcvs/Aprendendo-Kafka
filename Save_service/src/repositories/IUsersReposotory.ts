export interface IUsersRepository {
  store(user: User): Promise<void>;
  destroy(email: string): Promise<void>;
}
