var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',()=>{
    it('Should generate correct message object',()=>{ //not passed done becaused sync test
        var from = 'testUser';
        var text = 'testText';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    });
});