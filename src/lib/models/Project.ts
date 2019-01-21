/* tslint:disable */
import * as boc from '@phoenix/boc';
import { Todo } from './Todo';
import { ProjectMember } from './ProjectMember';
@boc.ClsInfo({
    title: 'Project',
    primaryKey: ['id'],
    businessKey: ['code'],
    objectStoreSource: 'Basic',
    metadata: 'Basic',
})
export class Project extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation todos
            {
                constr: boc.HasMany,
                settings: {
                    roleProp: 'todos',
                    oppositeConstr: Todo,
                    oppositeKey: ['parentId'],
                    oppositeRoleProp: 'parentObject',
                }
            },
            // relation members
            {
                constr: boc.HasMany,
                settings: {
                    roleProp: 'members',
                    oppositeConstr: ProjectMember,
                    oppositeKey: ['parentId'],
                    oppositeRoleProp: 'parentObject',
                }
            },
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Project',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property code
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
        title: 'Project',
    })
    public get code(): string {
        return this.getProp('code');
    }

    public set_code(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('code', value);
    }

    // read write property name
    @boc.PropertyInfo({
        type: 'string',
        title: 'Project',
    })
    public get name(): string {
        return this.getProp('name');
    }

    public set_name(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('name', value);
    }

    // read write property isDone
    @boc.PropertyInfo({
        type: 'boolean',
        title: 'Project',
    })
    public get isDone(): boolean {
        return this.getProp('isDone');
    }

    public set_isDone(value: boolean): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('isDone', value);
    }

    // relation todos
    public todos: boc.HasMany<Project, Todo>;

    // relation members
    public members: boc.HasMany<Project, ProjectMember>;
}
