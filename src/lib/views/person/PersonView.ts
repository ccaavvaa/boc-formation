/* tslint:disable */
import * as boc from '@phoenix/boc';
import { Person } from '../../models/Person';
@boc.ClsInfo({
    title: 'PersonView',
    primaryKey: ['id'],
    businessKey: ['id'],
    modelConstr: Person,
    isTransient: true,
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
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'PersonView',
    })
    public get id(): number {
        return this.getProp('id');
    }
}
