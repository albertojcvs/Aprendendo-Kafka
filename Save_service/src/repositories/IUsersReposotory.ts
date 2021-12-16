export interface IUsersRepository {
  store(user: User): Promise<void>;
  destroy(id: number): Promise<void>;
}
