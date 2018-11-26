import { HelloWorldViewRules } from './rules/formation/HelloWorldViewRules';
import { PersonRules } from './rules/person/PersonRules';
import { PersonViewRules } from './rules/person/PersonViewRules';
export const businessRules = [
    HelloWorldViewRules,
    // Person
    PersonRules,
    PersonViewRules,
];
