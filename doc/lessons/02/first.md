## Premier modèle
* Ajouter birthDate dans le schéma Person.json

````json
{
	"$schema": "http://phenix.salviadeveloppement.com/json-schema/mdr-schema.json",
	"version": "1.0.0",
	"type": "object",
	"title": "Person",
	"name": "Person",
	"primaryKey": "personId",
	"properties": {
		"personId": {
			"type": "string",
			"format": "code"
		},
		"name": {
			"type": "string"
		},
		"firstName": {
			"type": "string"
		},
		"birthDate": {
			"type": "string",
			"format": "date"
		}
	}
}
````

* Générer les classes modèle. La classe Person sera créé dans src/lib/models/Person.ts

````
npm run entity
````

* Ajouter la classe Person dans la liste des classes métier dans src/lib/business-classes.ts

````typescript
export const businessClasses = [
    ...
    // Person
    Person,
];
````

* Ajouter des tests
    Dans le fichier src/test/person/person.test.ts

````typescript

describe('Person', function () {
    it('personId should not be empty', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.validate();
        assert(person.hasErrors);
        let personIdErrors: boc.IErrorInfo[];
        personIdErrors = person.errors.errors.get('personId');
        assert(personIdErrors && personIdErrors.length);
        const err = personIdErrors.find(
            (e) => e.error.srcId === 'PersonRules.notEmptyPersonId'
        );
        assert(err);
        assert(err.error.message === c.t("L'id de la personne est vide"));

        await person.set_personId('not empty');
        await person.validate();
        personIdErrors = person.errors.errors.get('personId');
        assert(!personIdErrors || !personIdErrors.find(
            (e) => e.error.srcId === 'PersonRules.notEmptyPersonId')
        );
    });
    it('personId should not be empty on personId prop change', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.set_personId('not empty');
        await person.set_personId(null);
        assert(person.hasErrors);
        let personIdErrors: boc.IErrorInfo[];
        personIdErrors = person.errors.errors.get('personId');
        assert(personIdErrors && personIdErrors.length);
        const err = personIdErrors.find(
            (e) => e.error.srcId === 'PersonRules.notEmptyPersonIdOnChange'
        );
        assert(err);
        assert(err.error.message === c.t("L'id de la personne est vide"));

        await person.set_personId('not empty');
        personIdErrors = person.errors.errors.get('personId');
        assert(!personIdErrors || !personIdErrors.find(
            (e) => e.error.srcId === 'PersonRules.notEmptyPersonId')
        );
    });
});

````

* Ajouter les règles dans src/lib/rules/person/PersonRules.ts

````typescript
export class PersonRules {
    @boc.PropChange({
        constr: Person,
        propName: 'personId',
        description: 'Empty personId should immediate show error',
    })
    public static async notEmptyPersonIdOnChange(target: Person, msg: boc.Message) {
        this.checkPersonId(target);
    }

    @boc.Validate({
        constr: Person,
        description: 'personId should not be empty',
    })
    public static async notEmptyPersonId(target: Person, msg: boc.Message) {
        this.checkPersonId(target);
    }

    private static checkPersonId(person: Person) {
        const c = person.container;
        if (!person.personId) {
            person.errors.addError(c.t("L'id de la personne est vide"), 'personId');
        }
    }
}
````
