import * as boc from '@phoenix/boc';

@boc.ClsInfo({
    title: 'Hello World',
    description: 'Hello World View Model',
    isTransient: true,
})
export class HelloWorldView extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // hello world roles
        ];
    }
    @boc.PropertyInfo({
        title: 'Nom',
        description: 'Nom',
        type: 'string',
    })
    public get name(): string {
        return this.getProp('name');
    }

    public set_name(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('name', value);
    }

    @boc.PropertyInfo({
        title: 'Title',
        description: 'Title',
        type: 'string',
    })
    public get title(): string {
        return this.getProp('title');
    }

    public set_title(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('title', value);
    }

    @boc.PropertyInfo({
        title: 'Greeting',
        description: 'Greeting',
        type: 'string',
    })
    public get greeting(): string {
        return this.getProp('greeting');
    }

    public set_greeting(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('greeting', value);
    }
}