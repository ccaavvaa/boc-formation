import * as bocServer from '@phoenix/boc-server';
import { m } from '@phoenix/service-route';

export class DatasetHandler extends bocServer.DatasetHandler {
    constructor() {
        super();
    }
    @m({
        tags: ['Dataset'],
        summary: 'Dataset',
        parameters: [
            {
                name: 'datasetName',
                description: 'dataset name',
                in: 'path',
                type: 'string',
                required: true,
            },
        ],
    })
    // tslint:disable-next-line:max-line-length
    public get(datasetName: string, $filter: string, $orderby: string, $top: number, $skip: number, data?: any): Promise<any> {
        return super.get(datasetName, $filter, $orderby, $top, $skip, data);
    }
    @m({
        tags: ['Dataset'],
        summary: 'Dataset',
        parameters: [
            {
                name: 'datasetName',
                description: 'dataset name',
                in: 'path',
                type: 'string',
                required: true,
            },
        ],
    })
    // tslint:disable-next-line:max-line-length
    public post(datasetName: string, $filter: string, $orderby: string, $top: number, $skip: number, body: any): Promise<any> {
        return super.get(datasetName, $filter, $orderby, $top, $skip, body);
    }
}