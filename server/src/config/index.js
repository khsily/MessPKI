/**
 * 서버 및 데이터베이스 설정
 * database: mongodb (https://cloud.mongodb.com)
 */

import { isDev } from '../utils';

const config = {
  // production 설정
  prod: {
    app: { port: 5000 },
    database: {
      username: 'admin',
      password: 'hs0322',
      databaseName: 'ethpki',
    },
  },
  // development 설정
  dev: {
    app: { port: 5000 },
    database: {
      username: 'admin',
      password: 'hs0322',
      databaseName: 'ethpki',
    },
  },
}

/**
 * 데이터베이스 호스트 url 정보를 리턴합니다.
 * @param {Object} dbInfo : config 설정 오브젝트
 */
export const host = (dbInfo) => {
  const { username, password, databaseName } = dbInfo;
  const hostUrl = `mongodb+srv://${username}:${password}@cluster0-eev6h.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
  return hostUrl;
}

/**
 * 현재 노드 환경에 따른 app config 객체 리턴
 */
export const appConfig = () => {
  return isDev() ? config.dev.app : config.prod.app;
}

/**
 * 현재 노드 환경에 따른 db config 객체 리턴
 */
export const dbConfig = () => {
  return isDev() ? config.dev.database : config.prod.database;
}