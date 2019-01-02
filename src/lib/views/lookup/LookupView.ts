import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    description: 'Lookup Test',
    isTransient: true,
})
export class LookupView extends boc.BaseViewModel {
    @boc.PropertyInfo({
        title: 'Person Id',
        description: 'Id of Person',
        type: 'string',
    })
    public get personId(): string {
        return this.getProp('personId');
    }

    public set_personId(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('personId', value);
    }
}