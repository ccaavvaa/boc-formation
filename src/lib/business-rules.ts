import { HelloWorldViewRules } from './rules/formation/HelloWorldViewRules';
import { PersonRules } from './rules/person/PersonRules';
import { PersonViewRules } from './rules/person/PersonViewRules';
import { ProjectRules } from './rules/project/ProjectRules';
import { ProjectMemberRules } from './rules/project/ProjectMemberRules';
import { PersonExtensionRules } from './rules/person/PersonExtensionRules';
import { ProjectViewRules } from './rules/project/ProjectViewRules';
import { ProjectMemberViewRules } from './rules/project/ProjectMemberViewRules';
import { PersonsViewRules } from './rules/person/PersonsViewRules';
import { MyTaskRules } from './rules/tasks/MyTaskRules';
export const businessRules = [
    HelloWorldViewRules,
    // Person
    PersonRules,
    PersonViewRules,
    PersonExtensionRules,
    PersonsViewRules,
    // Project
    ProjectRules,
    ProjectMemberRules,
    ProjectViewRules,
    ProjectMemberViewRules,
    // Tasks
    MyTaskRules,
];
