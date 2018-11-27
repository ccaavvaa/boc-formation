/* tslint:disable */
import * as boc from '@phoenix/boc';
import { Person } from './Person';
import { Project } from './Project';
@boc.ClsInfo({
    title: 'Project Member',
    primaryKey: ['id'],
    objectStoreSource: 'Basic',
    metadata: 'Basic',
})
export class ProjectMember extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation person
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'person',
                    oppositeConstr: Person,
                    key: ['personId'],
                    oppositeKey: ['personId'],
                }
            },
            // relation parentObject
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'parentObject',
                    oppositeConstr: Project,
                    key: ['parentId'],
                    oppositeKey: ['id'],
                    oppositeRoleProp: 'members',
                }
            },
        ];
    }

    // read only property personId
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
        title: 'Project Member',
    })
    public get personId(): string {
        return this.getProp('personId');
    }

    // read only property parentId
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Project Member',
    })
    public get parentId(): number {
        return this.getProp('parentId');
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Project Member',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property role
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
        title: 'Project Member',
    })
    public get role(): string {
        return this.getProp('role');
    }

    public set_role(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('role', value);
    }

    // relation person
    public person(): Promise<Person> {
        return this.getRoleProp('person');
    }

    public set_person(value: Person): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('person', value);
    }

    // relation parentObject
    public parentObject(): Promise<Project> {
        return this.getRoleProp('parentObject');
    }

    public set_parentObject(value: Project): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('parentObject', value);
    }
}
