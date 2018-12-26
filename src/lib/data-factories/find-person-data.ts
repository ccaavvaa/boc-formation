import * as boc from '@phoenix/boc';
import { DataDriverNames } from '../interfaces';

const findPersonDataFactorySettings: boc.FindDataFactorySettings = {
    datasetName: 'persons',
    entityName: 'Person',
    findOptions: {
        count: true,
        sort: 'name asc, firstName asc',
        select: ['firstName', 'name'],
    },
    metadataName: 'Basic',
    objectStoreName: DataDriverNames.Basic,
    pageSize: 5,
};

export const findPersonDataFactory = new boc.FindDataFactory(findPersonDataFactorySettings);
