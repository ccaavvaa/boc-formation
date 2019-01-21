/* tslint:disable */
import * as boc from '@phoenix/boc';
import { Project } from '../../models/Project';
import { ProjectMemberView } from './ProjectMemberView';
import { TodoView } from './TodoView';
@boc.ClsInfo({
    title: 'ProjectView',
    primaryKey: ['id'],
    modelConstr: Project,
    isTransient: true,
    mappingDef: [
        {
            from: '#model',
            mappings: [
                'code',
                'name',
                {
                    from: 'id',
                    to: 'projectId',
                },
            ],
        },
    ],
    serializeDirectives: [
        'members',
        'todos',
    ],
})
export class ProjectView extends boc.ViewModel<Project> {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation members
            {
                constr: boc.TransientMany,
                settings: {
                    roleProp: 'members',
                    oppositeConstr: ProjectMemberView,
                    syncSource: 'members',
                }
            },
            // relation todos
            {
                constr: boc.TransientMany,
                settings: {
                    roleProp: 'todos',
                    oppositeConstr: TodoView,
                    syncSource: 'todos',
                }
            },
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'ProjectView',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // relation members
    public members: boc.TransientMany<ProjectView, ProjectMemberView>;

    // relation todos
    public todos: boc.TransientMany<ProjectView, TodoView>;
}
