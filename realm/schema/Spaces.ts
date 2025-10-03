import { Realm } from "../provider"

export class Spaces extends Realm.Object {
  _id!: Realm.BSON.ObjectId
  name!: string
  color!: string
  maxGuests!: number

  static schema: Realm.ObjectSchema = {
    name: 'Spaces',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      color: 'string',
      maxGuests: 'int',
    },
  }
}
