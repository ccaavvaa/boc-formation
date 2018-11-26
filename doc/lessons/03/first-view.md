## Premier view model

* Ajouter la classe PersonView dans le fichier src/views/person/PersonView.ts

    * La classe est un view model pour la classe Person:  boc.ViewModel<Person>, modelConstr: Person
    * Les propriétés de la classe Person sont mapés: mappingDef from #model
    * Une propriété âge est calculée
````typescript
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
}
````

* Ajouter les tests dans src/test/person/person-view.test.ts
    * le view est initialisé avec divers références vers l'objet person: id, $reference ou personId
    * l'âge est calculé quand le model change ou la date de naissance change

````typescript
describe('PersonView', function () {
    it('create with model ', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const view = await person.createViewModel<PersonView>(PersonView);
        assert(view && view.model === person);
    });
    it('create without model', async function () {
        const c = createContainer();
        const view = await c.createNew<PersonView>(PersonView);
        assert(view && !view.model);
    });
    it('create without model 2', async function () {
        const c = createContainer();
        const view = await c.createNew<PersonView>(PersonView, null, { notUsed: true });
        assert(view && !view.model);
    });
    it('create with model index', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const view =
            await c.createNew<PersonView>(PersonView, null, { id: person.id });
        assert(view && (view.model === person));
    });
    it('create with model ref', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const view =
            await c.createNew<PersonView>(PersonView, null, { personRef: person.$reference });
        assert(view && (view.model === person));
    });
    it('create with personId', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.set_personId('p1');
        const view =
            await c.createNew<PersonView>(PersonView, null, { personId: person.personId });
        assert(view && (view.model === person));
    });

    it('calculate age', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const personAge = 5;
        const todayDate = new Date();
        const birthDate = new boc.DateTime('date', todayDate).addYears(-personAge);
        await person.set_birthDate(birthDate);
        const view = await person.createViewModel<PersonView>(PersonView);
        assert(view.age === personAge);
        await person.set_birthDate(person.birthDate.addYears(1));
        assert(view.age === personAge - 1);
    });
    it('Should serialize person properties', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const personAge = 5;
        const todayDate = new Date();
        const birthDate = new boc.DateTime('date', todayDate).addYears(-personAge);
        await person.set_birthDate(birthDate);
        await person.set_name('N');
        await person.set_firstName('F');
        await person.set_personId('P1');
        const view = await person.createViewModel<PersonView>(PersonView);
        const data = await view.getAllData(null, true);
        assert(data.id);
        assert(data.personId === person.personId);
        assert(data.name === person.name);
        assert(data.firstName === person.firstName);
        assert(data.birthDate === person.birthDate.toString());
        assert(data.age === personAge);
        assert(data.personKey === person.id);
    });
});

````

* Ajouter la class PersonViewRules dans src/rules/person/PersonViewRules.ts

````typescript
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
    @boc.ModelChanged({
        constr: PersonView,
    })
    public static async modelChanged(target: PersonView, msg: boc.Message) {
        const value = PersonRules.calculateAge(target.model);
        await target.set_age(value);
    }
    @boc.PropChange({
        constr: PersonView,
        propName: 'birthDate',
        path: '#model',
    })
    public static async calculateAge(personView: PersonView) {
        const value = PersonRules.calculateAge(personView.model);
        await personView.set_age(value);
    }
}
````
* Ajouter la fonction getAge dans src/rules/hepers.ts

````typescript
public static getAge(birthDate: boc.DateTime, atDate?: boc.DateTime): number;
````

* Ajouter la fonction calculateAge dans la classe PersonRules
````typescript
public static calculateAge(person: Person): number;
````

* Ajouter les tests pour getAge et calculateAge

* Ajouter les classes dans businessClasses et businessRules


* [Exercices](./ex03.md)