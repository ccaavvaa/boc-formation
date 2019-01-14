/* tslint:disable */
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'MyTask',
    primaryKey: ['id'],
    objectStoreSource: 'Memory',
    isTransient: true,
})
export class MyTask extends boc.Task {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'MyTask',
    })
    public get id(): number {
        return this.getProp('id');
    }
}
