import * as boc from '@phoenix/boc';
import { Person } from '../../models/Person';
@boc.ClsInfo({
    description: 'Person View',
    isTransient: true,
    modelConstr: Person,
    mappingDef: [
        {
            from: '#model',
            mappings: [
                'personId',
                'name',
                'firstName',
                'birthDate',
                {
                    from: 'id',
                    to: 'personKey',
                },
                {
                    from: 'extension',
                    mappings: [
                        'fullName',
                        'age',
                    ],
                },
            ],
        },
    ],
})
export class PersonView extends boc.ViewModel<Person> {
}