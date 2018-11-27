/* tslint:disable */
import * as boc from '@phoenix/boc';
import { Person } from './Person';
import { Project } from './Project';
@boc.ClsInfo({
    title: 'Todo item',
    primaryKey: ['id'],
    objectStoreSource: 'Basic',
    metadata: 'Basic',
})
export class Todo extends boc.ModelObject {
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
                    oppositeRoleProp: 'todos',
                }
            },
        ];
    }

    // read only property personId
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
        title: 'Todo item',
    })
    public get personId(): string {
        return this.getProp('personId');
    }

    // read only property parentId
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Todo item',
    })
    public get parentId(): number {
        return this.getProp('parentId');
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Todo item',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property title
    @boc.PropertyInfo({
        type: 'string',
        title: 'Todo item',
    })
    public get title(): string {
        return this.getProp('title');
    }

    public set_title(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('title', value);
    }

    // read write property progress
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Todo item',
    })
    public get progress(): number {
        return this.getProp('progress');
    }

    public set_progress(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('progress', value);
    }

    // read write property dueDate
    @boc.PropertyInfo({
        jsFormats: ['date'],
        type: 'string',
        format: 'date',
        title: 'Todo item',
    })
    public get dueDate(): boc.DateTime {
        return this.getProp('dueDate');
    }

    public set_dueDate(value: boc.DateTime): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('dueDate', value);
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
