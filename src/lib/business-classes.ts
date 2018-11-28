import { HelloWorldView } from './views/formation/hello-world';
import { Person } from './models/Person';
import { PersonView } from './views/person/PersonView';
import { Project } from './models/Project';
import { ProjectMember } from './models/ProjectMember';
import { Todo } from './models/Todo';
import { PersonExtension } from './views/person/PersonExtension';

export const businessClasses = [
    HelloWorldView,
    // Person
    Person,
    PersonExtension,
    PersonView,
    // Project
    Project,
    ProjectMember,
    Todo
];