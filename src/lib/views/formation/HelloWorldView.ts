/* tslint:disable */
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'Hello World',
    primaryKey: ['id'],
    isTransient: true,
})
export class HelloWorldView extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Hello World',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property name
    @boc.PropertyInfo({
        type: 'string',
        title: 'Name',
    })
    public get name(): string {
        return this.getProp('name');
    }

    public set_name(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('name', value);
    }

    // read write property title
    @boc.PropertyInfo({
        type: 'string',
        title: 'Title',
    })
    public get title(): string {
        return this.getProp('title');
    }

    public set_title(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('title', value);
    }

    // read write property greeting
    @boc.PropertyInfo({
        type: 'string',
        title: 'Greeting',
    })
    public get greeting(): string {
        return this.getProp('greeting');
    }

    public set_greeting(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('greeting', value);
    }
}
