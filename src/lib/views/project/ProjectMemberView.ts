import * as boc from '@phoenix/boc';
import { ProjectMember } from '../../models/ProjectMember';

@boc.ClsInfo({
    isTransient: true,
    modelConstr: ProjectMember,
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
                        }
                    ],
                },
            ],
        },
    ],
})
export class ProjectMemberView extends boc.ViewModel<ProjectMember> {
    @boc.PropertyInfo({
        type: 'string',
        format: 'code',
        jsFormats: ['code'],
    })
    public get personId(): string {
        return this.getProp('personId');
    }

    public set_personId(value: string) {
        return this.setProp('personId', value);
    }
}
