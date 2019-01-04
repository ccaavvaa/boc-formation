import * as boc from '@phoenix/boc';
import { HelloWorldView } from '../../views/formation/HelloWorldView';
export class HelloWorldViewRules {
    @boc.ObjectInit({
        constr: HelloWorldView,
        isNew: true,
    })
    public static async init(target: HelloWorldView, msg: boc.Message) {
        await target.propState.greeting.set_isReadOnly(true);

        const initialName = (msg.data && msg.data.name) || 'John Smith';
        await target.set_name(initialName);
        const initialTitle = (msg.data && msg.data.title) || 'Mr';
        await target.set_title(initialTitle);

    }

    @boc.PropChange({
        constr: HelloWorldView,
        propName: ['name', 'title'],
    })
    public static async calculateGreeting(target: HelloWorldView, msg: boc.Message) {
        let greetingElements: string[] = [target.title, target.name];
        greetingElements = greetingElements.filter(
            (s) => (typeof (s) === 'string') && s.length > 0
        );
        const greetingVariable = greetingElements.join(' ');
        const greeting = `Hello ${greetingVariable}`;
        await target.set_greeting(greeting);
    }
}