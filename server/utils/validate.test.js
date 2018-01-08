const expect = require('expect');
const {isRealString} = require('./validate');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(56);
        expect(res).toBeFalsy();
    });
    it('should reject string with only spaces', () => {
        var res = isRealString('       ');
        expect(res).toBeFalsy();
    });
    it('should allow string with non-space characteres', () => {
        var res = isRealString('   some text    ');
        expect(res).toBeTruthy();
    });
});