import { Client, Databases, Account, Storage, Query } from 'appwrite';
import conf from '../config/config';

export const client = new Client();
client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId); // Replace with your project ID

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
