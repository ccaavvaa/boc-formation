import { HelloWorldView } from './views/formation/hello-world';
import { Person } from './models/Person';
import { PersonView } from './views/person/PersonView';
import { Project } from './models/Project';
import { ProjectMember } from './models/ProjectMember';
import { Todo } from './models/Todo';
import { PersonExtension } from './views/person/PersonExtension';
import { ProjectView } from './views/project/ProjectView';
import { ProjectMemberView } from './views/project/ProjectMemberView';
import { TestFindRelation } from './views/find-relation/find-relation';
import { PersonData } from './views/person/PersonData';
import { PersonsView } from './views/person/PersonsView';

export const businessClasses = [
    HelloWorldView,
    // Person
    Person,
    PersonExtension,
    PersonView,
    PersonsView,
    // Project
    Project,
    ProjectMember,
    Todo,

    ProjectView,
    ProjectMemberView,

    TestFindRelation,
    PersonData,
];