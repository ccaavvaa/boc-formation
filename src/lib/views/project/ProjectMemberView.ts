/* tslint:disable */
import * as boc from '@phoenix/boc';
import { ProjectMember } from '../../models/ProjectMember';
@boc.ClsInfo({
    title: 'ProjectMemberView',
    primaryKey: ['id'],
    modelConstr: ProjectMember,
    isTransient: true,
    mappingDef: [
        {
            from: '#model',
            mappings: [
                'role',
                {
                    from: 'person',
                    mappings: [
                        {
                            from: 'extension',
                            mappings: [
                                'fullName',
                            ],
                        },
                    ],
                },
            ],
        },
    ],
})
export class ProjectMemberView extends boc.ViewModel<ProjectMember> {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'ProjectMemberView',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property personId
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
        title: 'ProjectMemberView',
    })
    public get personId(): string {
        return this.getProp('personId');
    }

    public set_personId(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('personId', value);
    }
}
