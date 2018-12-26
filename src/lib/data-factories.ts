import { DataFactory } from '@phoenix/boc';
import { findPersonDataFactory } from './data-factories/find-person-data';
import { personsDataFactory } from './data-factories/object-person-data';

export const dataFactories: DataFactory[] = [
    findPersonDataFactory,
    personsDataFactory
];
