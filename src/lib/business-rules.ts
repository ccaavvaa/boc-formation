import { HelloWorldViewRules } from './rules/formation/HelloWorldViewRules';
import { PersonRules } from './rules/person/PersonRules';
import { PersonViewRules } from './rules/person/PersonViewRules';
import { ProjectRules } from './rules/project/ProjectRules';
import { ProjectMemberRules } from './rules/project/ProjectMemberRules';
export const businessRules = [
    HelloWorldViewRules,
    // Person
    PersonRules,
    PersonViewRules,
    // Project
    ProjectRules,
    ProjectMemberRules,
];
