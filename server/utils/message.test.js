const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {

    it('Should generate the currect message object', () => {
        var from = 'Jake';
        var text = 'Hello guys. How u doing?'
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    });
});