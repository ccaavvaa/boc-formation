import { ViewServer } from '../lib/view-server';

const server = new ViewServer();
const session = server.createSession('IDSESSION');
export function createContainer() {
    const container = session.createContainerFor('Basic');
    return container;
}