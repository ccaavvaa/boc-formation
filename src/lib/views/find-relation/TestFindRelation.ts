/* tslint:disable */
import * as boc from '@phoenix/boc';
import { PersonData } from '../person/PersonData';
@boc.ClsInfo({
    title: 'TestFindRelation',
    primaryKey: ['id'],
    isTransient: true,
})
export class TestFindRelation extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation persons
            {
                constr: boc.FindRelation,
                settings: {
                    roleProp: 'persons',
                    oppositeConstr: PersonData,
                }
            },
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'TestFindRelation',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // relation persons
    public persons: boc.FindRelation<TestFindRelation, PersonData>;
}
