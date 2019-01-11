import * as boc from '@phoenix/boc';
export const tasks: boc.TaskDefs = [
    {
        id: -1,
        className: '?',
        isDisabled: true,
        name: 'task description',
        taskParams: {

        },
        trigger: {
            eventType: 'interval',
            eventParams: {
                interval: 120,
            },
        },
    },
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
