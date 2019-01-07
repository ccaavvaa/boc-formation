import * as boc from '@phoenix/boc';
import { DataDriverNames } from '../interfaces';

const findPersonDataFactorySettings: boc.FindDataFactorySettings = {
    datasetName: 'persons',
    entityName: 'Person',
    findOptions: {
        count: true,
        sort: 'name asc, firstName asc',
        select: ['firstName', 'name'],
        limit: 5,
    },
    metadataName: 'Basic',
    objectStoreName: DataDriverNames.Basic
};

export const findPersonDataFactory = new boc.FindDataFactory(findPersonDataFactorySettings);
