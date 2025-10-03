import * as RealmWeb from 'realm-web'

const DB_NAME = process.env.EXPO_PUBLIC_REACT_APP_DB as string
const APP_ID = process.env.EXPO_PUBLIC_REACT_APP_ID as string
const BASE_URL = process.env.EXPO_PUBLIC_REACT_APP_BASE_URL

const appConfig = {
  id: APP_ID,
  timeout: 10000,
  baseUrl: BASE_URL,
}

export const app = new RealmWeb.App(appConfig)
export const db = (dbname: string = DB_NAME) =>
  app.currentUser!.mongoClient('mongodb-atlas').db(dbname)
export const Realm = RealmWeb
