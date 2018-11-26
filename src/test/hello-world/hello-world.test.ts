import 'mocha';
import * as chai from 'chai';
import '../debug-test';
import { ViewServer } from '../../lib/view-server';
import { HelloWorldView } from '../../lib/views/formation/hello-world';
// tslint:disable:only-arrow-functions

// const expect = chai.expect;
const expect = chai.expect;

describe('Hello World View', function () {
    it('should initialize name and title with Mr John Smith', async function () {
        const c = createContainer();
        const helloWorldVw = await c.createNew<HelloWorldView>(HelloWorldView);

        expect(helloWorldVw.name).equals('John Smith');
        expect(helloWorldVw.title).equals('Mr');
    });
    it('should initialize name and title from create params', async function () {
        const c = createContainer();
        const createParams = {
            name: 'John Doe',
            title: 'Mr',
        };
        const helloWorldVw = await c.createNew<HelloWorldView>(HelloWorldView, null, createParams);

        expect(helloWorldVw.name).equals(createParams.name);
        expect(helloWorldVw.title).equals(createParams.title);
    });
    it('greeting = Hello title + name', async function () {
        const c = createContainer();
        const createParams = {
            name: 'Kitty Doe',
            title: 'Mrs',
        };
        const helloWorldVw = await c.createNew<HelloWorldView>(HelloWorldView, null, createParams);
        expect(helloWorldVw.greeting).equals(`Hello ${createParams.title} ${createParams.name}`);
    });
});

const server = new ViewServer();
const session = server.createSession('IDSESSION');
function createContainer() {
    const container = session.createContainerFor('Basic');
    return container;
}