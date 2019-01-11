import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    metadata: 'Basic',
})
export class MyTask extends boc.Task {
    public static executionCount = 0;
}
