import * as boc from '@phoenix/boc';
import { Person } from '../../models/Person';
import { PersonView } from '../../views/person/PersonView';
import { PersonRules } from './PersonRules';

export class PersonViewRules {
    @boc.ObjectInit({
        constr: PersonView,
        isNew: true,
    })
    public static async init(target: PersonView, msg: boc.Message) {
        const c = target.container;
        if (!target.model && msg.data) {
            let model: Person;
            if (msg.data.personId) {
                model = await c.getOne<Person>(Person, { personId: msg.data.personId });
            } else if (msg.data.id) {
                model = c.getInMemByIndex<Person>(Person, msg.data.id);
            } else if (msg.data.personRef) {
                model = c.getInMemByRef(msg.data.personRef);
            }
            if (model) {
                await target.set_model(model);
            }
        }
    }
}