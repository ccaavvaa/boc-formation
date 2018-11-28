import * as boc from '@phoenix/boc';
import { Person } from '../../models/Person';
@boc.ClsInfo({
    isTransient: true,
    title: 'Person Extension',
    modelConstr: Person,
})
export class PersonExtension extends boc.ViewModel<Person> {
    @boc.PropertyInfo({
        jsFormats: ['string'],
        type: 'string',
    })
    public get fullName(): string {
        return this.getProp('fullName');
    }
    public set_fullName(value: string) {
        return this.setProp('fullName', value);
    }
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

}
