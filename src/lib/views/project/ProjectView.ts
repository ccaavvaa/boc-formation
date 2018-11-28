import * as boc from '@phoenix/boc';
import { Project } from '../../models/Project';

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
})
export class ProjectView extends boc.ViewModel<Project> {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

}