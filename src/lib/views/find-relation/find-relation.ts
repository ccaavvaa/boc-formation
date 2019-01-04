import * as boc from '@phoenix/boc';
import { PersonData } from '../person/PersonData';
import { Person } from '../../models/Person';
@boc.ClsInfo({
    title: 'Test FindRelation',
    description: 'Test FindRelation',
    isTransient: true,
})
export class TestFindRelation extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        const settings: boc.IFindRelationSettings<TestFindRelation, PersonData> = {
            roleProp: 'persons',
            oppositeConstr: PersonData,
        };
        return [
            {
                constr: boc.FindRelation,
                settings,
            }
        ];
    }
    public persons: boc.FindRelation<TestFindRelation, PersonData>;
}
