import { Realm } from '../provider'

export class Partners extends Realm.Object {
  _id!: Realm.BSON.ObjectId
  name!: string
  email!: string
  phone!: string
  maxGuests!: number
  userId!: string
  creationAt!: number

  static schema: Realm.ObjectSchema = {
    name: 'Partners',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      email: 'string',
      phone: 'string',
      maxGuests: 'int',
      userId: 'string',
      creationAt: 'double',
    },
  }
}
