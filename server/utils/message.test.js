var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

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

describe('generateLocationMessage',()=>{
    it('Should generate correct location object',()=>{ //not passed done becaused sync test
        var from = 'testUser';
        var latitude = 17;
        var longitude = 17;
        var location = generateLocationMessage(from,latitude,longitude);

        expect(location.from).toBe('testUser');
        expect(location.createdAt).toBeA('number');
        expect(location).toInclude({
            from,
            url:`https://google.com/maps?q=17,17`
        });
    });
});