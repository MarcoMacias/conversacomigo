export interface IUserRepository {
  exists(email: string): Promise<boolean>;
  findOne(email: string): Promise<any>;
}