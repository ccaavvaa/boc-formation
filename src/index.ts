import { httpBocServer } from './lib/app';

httpBocServer.start().catch((e) => console.log(e));
