import * as boc from '@phoenix/boc';
const tasks: boc.TaskDefs = [
    {
        id: 1,
        className: 'MyTask',
        name: 'my task',
        taskParams: {
            result: 1,
        },
        trigger: {
            eventType: 'interval',
            eventParams: {
                interval: 120,
            },
        },
    },
];

export class TaskConfigurator implements boc.ITaskConfigurator {
    public getTaskDefinitions(): boc.TaskDefs {
        return tasks;
    }

}