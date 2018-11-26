import * as bocServer from '@phoenix/boc-server';
import { m } from '@phoenix/service-route';

export class LookUpHandler extends bocServer.LookUpHandler {
    constructor() {
        super();
    }
    @m({
        tags: ['LookUp'],
        summary: 'LookUp sur l\'entité {entity}',
        parameters: [
            {
                name: 'entity',
                description: 'Entité sur laquelle appliquer le lookUp',
                in: 'path',
                type: 'string',
                required: true,
            },
        ],
    })
    // tslint:disable-next-line:max-line-length
    public get(entity: string, $filter: string, $select: string, $count: boolean, $top: number, $skip: number, $expand: string, $orderby: string) {
        return super.get(entity, $filter, $select, $count, $top, $skip, $expand, $orderby);
    }
}