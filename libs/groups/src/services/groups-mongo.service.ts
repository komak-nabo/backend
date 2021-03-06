import { Injectable } from '@nestjs/common';
import { MongoService } from '@backend/mongo';
import { Group } from '../groups.model';

@Injectable()
export class GroupsMongoService {
  constructor(private mongo: MongoService) {}
  private collection = 'groups';

  public onApplicationBootstrap() {
    this.mongo.addIndex(this.collection, { managersUserIds: 1 });
    this.mongo.addIndex(this.collection, { secret: 1 });
  }

  public async createOne(group: Partial<Group>): Promise<Group> {
    await this.mongo.waitReady();
    const req = await this.mongo.db
      .collection(this.collection)
      .insertOne({ ...group, createdAt: new Date() });
    return new Group(req.ops[0]);
  }

  public async findOneBy(filters: Partial<Group>): Promise<Group> {
    await this.mongo.waitReady();
    const res = await this.mongo.db
      .collection(this.collection)
      .findOne(filters);
    return res ? new Group(res) : null;
  }
}
