import * as dotenv from 'dotenv';
dotenv.config();
export const myEnv = {
    MONGODB_USER: process.env.MONGODB_USER || '',
    MONGODB_PWD: process.env.MONGODB_PWD || '',
    MONGODB_CLUSTER: process.env.MONGODB_CLUSTER || '',
    MONGODB_DATABASE: process.env.MONGODB_DATABASE || '',
};
