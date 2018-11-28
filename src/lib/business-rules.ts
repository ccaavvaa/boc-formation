import { HelloWorldViewRules } from './rules/formation/HelloWorldViewRules';
import { PersonRules } from './rules/person/PersonRules';
import { PersonViewRules } from './rules/person/PersonViewRules';
import { ProjectRules } from './rules/project/ProjectRules';
import { ProjectMemberRules } from './rules/project/ProjectMemberRules';
import { PersonExtensionRules } from './rules/person/PersonExtensionRules';
export const businessRules = [
    HelloWorldViewRules,
    // Person
    PersonRules,
    PersonViewRules,
    PersonExtensionRules,
    // Project
    ProjectRules,
    ProjectMemberRules,
];
