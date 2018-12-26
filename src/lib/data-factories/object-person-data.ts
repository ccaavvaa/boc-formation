import * as boc from '@phoenix/boc';
import { Person } from '../models/Person';
import { PersonData } from '../views/person/PersonData';
const objectDataFactorySettings: boc.ObjectDataFactorySettings = {
    datasetName: 'personData',
    autoDestroyInstances: true,
    cloneData: false,
    findClass: Person,
    findOptions: {
        count: true,
        filter: {
            $and: [
                { firstname: 'John' }
            ]
        },
        sort: 'name desc',
    },
    metadataName: 'Basic',
    newObjects: true,
    pageSize: 1,
};
export const personsDataFactory =
    new boc.ObjectDataFactory<PersonData>(PersonData, objectDataFactorySettings);
