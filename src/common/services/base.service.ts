/* eslint-disable prettier/prettier */
import { EntityManager, ObjectLiteral, Repository } from 'typeorm';
import { Status } from '../enums/status.enum';

export class BaseService<Entity extends ObjectLiteral> {
  private _manager: EntityManager | undefined;
  constructor(private readonly repository: Repository<Entity>) {}

  /**
   * Save entity with status 
   * 
   * @param {*} data 
   */
  async save(data: any) {
    data.status = data.status || Status.ACTIVE;
    return await this.repository.save(data);
  }

  /**
   * Delete entity by status
   * @param {*} data 
   */
  async deleteEntityByStatus(data: any) {
    data.status = Status.DELETE;
    return await this.repository.save(data);
  }
}
