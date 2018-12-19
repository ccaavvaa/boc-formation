import * as boc from '@phoenix/boc';
import { PersonData } from './PersonData';
import { Person } from '../../models/Person';

@boc.ClsInfo({
    serializeDirectives: ['persons']
})
export class PersonsView extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation persons
            {
                constr: boc.FindRelation,
                settings: {
                    dataListSettings: {
                        autoDestroyInstances: true,
                        newObjects: true,
                    },
                    findClass: Person,
                    findPageSize: 5,
                    roleProp: 'persons',
                    oppositeConstr: PersonData,
                    findOptions: {
                        count: true,
                    }
                },
            },
        ];
    }
    public persons: boc.FindRelation<PersonsView, PersonData>;
}
