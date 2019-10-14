import mongoose from 'mongoose';
import { host, dbConfig } from '../config';

const db = mongoose.connection;
db.on('error', console.error); // 연결이 실패할 경우
db.once('open', () => console.log("Connected to mongod server")); // 연결이 성공할 경우

// 데이터베이스 연결
const hostUrl = host(dbConfig()); // mongodb+srv://...
mongoose.connect(hostUrl);
