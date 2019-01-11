import * as boc from '@phoenix/boc';
import { MyTask } from '../../views/tasks/MyTask';
import { ExtError } from '@phoenix/server-commons';

export class MyTaskRules {
    @boc.Action({
        constr: MyTask,
        actionId: 'EXECUTE_TASK',
    })
    public static execute(target: MyTask, msg: boc.Message) {
        MyTask.executionCount++;
        if (target.info.definition.taskParams.throw) {
            throw new ExtError(target.info.definition.taskParams.throw);
        } else {
            target.info.result = target.info.definition.taskParams.result;
        }
    }
}
