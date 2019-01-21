/* tslint:disable */
import * as boc from '@phoenix/boc';
import { Todo } from '../../models/Todo';
@boc.ClsInfo({
    title: 'TodoView',
    primaryKey: ['id'],
    modelConstr: Todo,
    isTransient: true,
    mappingDef: [
        {
            from: '#model',
            mappings: [
                'title',
                'progress',
                'dueDate',
                {
                    from: 'id',
                    to: 'todoId',
                },
            ],
        },
    ],
})
export class TodoView extends boc.ViewModel<Todo> {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'TodoView',
    })
    public get id(): number {
        return this.getProp('id');
    }
}
