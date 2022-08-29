import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const memoryServer = await MongoMemoryServer.create();
const URI = memoryServer.getUri();

/** Runs before tests:
* connects to the memory database created with {@link MongoMemoryServer}
*/
export async function mochaGlobalSetup() {
  try {
    await mongoose.connect(URI);
    console.log('Mongoose test environment connected!');
  } catch (error) {
    console.log('Mongoose test environtment connection failed!');
  }
}

/** Makes sure to disconnect from {@link memoryServer} */
export async function mochaGlobalTeardown() {
  try {
    await mongoose.disconnect();
    console.log('Mongoose test environment connection finished!');
  } catch (error) {
    console.log('Mocha teardown failed.');
  }
}
