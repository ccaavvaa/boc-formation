/* tslint:disable */
import * as boc from '@phoenix/boc';
import { PersonData } from './PersonData';
@boc.ClsInfo({
    title: 'PersonsView',
    primaryKey: ['id'],
    isTransient: true,
    serializeDirectives: [
        'persons',
    ],
})
export class PersonsView extends boc.BaseViewModel {
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
        title: 'PersonsView',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // relation persons
    public persons: boc.FindRelation<PersonsView, PersonData>;
}
