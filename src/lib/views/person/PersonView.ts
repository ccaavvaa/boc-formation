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
            ],
        },
    ],
})
export class PersonView extends boc.ViewModel<Person> {
    @boc.PropertyInfo({
        type: 'integer',
        jsFormats: ['integer'],
    })
    public get age(): number {
        return this.getProp('age');
    }

    public set_age(value: number) {
        return this.setProp('age', value);
    }
    @boc.PropertyInfo({
        type: 'string',
        jsFormats: ['string'],
    })
    public get fullName(): string {
        return this.getProp('fullName');
    }

    public set_fullName(value: string) {
        return this.setProp('fullName', value);
    }

}