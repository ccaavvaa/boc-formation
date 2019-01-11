import * as boc from '@phoenix/boc';
import {tasks} from './config/tasks';

export class TaskConfigurator implements boc.ITaskConfigurator {
    public getTaskDefinitions(): boc.TaskDefs {
        return tasks;
    }

}