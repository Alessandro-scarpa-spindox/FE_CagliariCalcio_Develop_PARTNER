import { Realm } from '../provider'

export class Subscribers extends Realm.Object {
  _id!: Realm.BSON.ObjectId
  birthDate!: number
  email!: string
  eventId!: string
  partnerId!: string
  spaceId!: string
  ownerId!: string
  qrcode!: string
  status!: boolean
  firstName!: string
  lastName!: string

  static schema: Realm.ObjectSchema = {
    name: 'Subscribers',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      birthDate: 'int',
      email: 'string',
      eventId: 'string',
      partnerId: 'string',
      spaceId: 'string',
      qrcode: 'string',
      status: 'bool',
      firstName: 'string',
      lastName: 'string',
      ownerId: 'string',
    },
  }
}
