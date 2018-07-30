const expect = require('expect');

var {isRealString} = require('./validation');

describe('Validation function tests',()=>{
    it('Should reject empty string values',()=>{
        var testString = '';
        var testBool = isRealString(testString);

        expect(testBool).toBe(false);
    });

    it('Should reject improper string values',()=>{
        var testString = '    ';
        var testBool = isRealString(testString);

        expect(testBool).toBe(false);
    });

    it('Should accept string values',()=>{
        var testString = 'cvb';
        var testBool = isRealString(testString);

        expect(testBool).toBe(true);
    });
});