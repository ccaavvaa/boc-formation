import * as boc from '@phoenix/boc';
import { ProjectMember } from '../../models/ProjectMember';

@boc.ClsInfo({
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
                        }
                    ],
                },
            ],
        },
    ],
})
export class ProjectMemberView extends boc.ViewModel<ProjectMember> {

}
