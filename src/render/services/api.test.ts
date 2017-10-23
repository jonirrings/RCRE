// import {request} from './api';
import {createServer, IncomingMessage, ServerResponse} from 'http';

createServer(function(req: IncomingMessage, response: ServerResponse) {
    response.end(JSON.stringify({msg: 'helloworld'}));
}).listen(4450);

describe('API Request Service', () => {
    it('helloworld request', async () => {
        // let ret = await request('http://127.0.0.1:4450', {
        //     method: 'GET'
        // });
        //
        // console.log(ret);
    });
});