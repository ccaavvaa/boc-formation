import * as boc from '@phoenix/boc';
import { Project } from '../../models/Project';
import { ProjectMemberView } from './ProjectMemberView';

@boc.ClsInfo({
    modelConstr: Project,
    isTransient: true,
    title: 'Project View',
    mappingDef: [
        {
            from: '#model',
            mappings: [
                'code',
                'name',
                {
                    from: 'id',
                    to: 'projectId'
                }
            ]
        }
    ],
    serializeDirectives: [
        'members'
    ]
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
                }
            },
        ];
    }
    public members: boc.TransientMany<ProjectView, ProjectMemberView>;
}