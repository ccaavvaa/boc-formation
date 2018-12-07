import {
    ModelObject,
    ModelObjectPatch,
} from '@phoenix/boc';

import { JsonPatchOperation, IJsonPatchOp } from '@phoenix/boc-interfaces';
import { ViewServer } from '../lib/view-server';

const server = new ViewServer();
const session = server.createSession('IDSESSION');
export function createContainer() {
    const container = session.createContainerFor('Basic');
    return container;
}
export async function applyPatch(
    root: ModelObject, op: JsonPatchOperation, path: string, value: any) {
    const patcher = new ModelObjectPatch(root);
    const patchOp: IJsonPatchOp = { op, path, value };
    return patcher.applyPatch(null, patchOp);
}
