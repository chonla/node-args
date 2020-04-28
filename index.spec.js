describe('args parsing', () => {
    it('should parse args properly', () => {
        const {
            parseOptions
        } = require('./index');
        const options = ['--flag1', '--flag2=ok', '--flag3 ok', '--flag4', '--flag5=--test', '--flag6', '"--flag7"', '--flag8 1'];
        const expectedResult = {
            "flag1": true,
            "flag2": "ok",
            "flag3": "ok",
            "flag4": true,
            "flag5": "--test",
            "flag6": true,
            "flag7": true,
            "flag8": "1"
        };

        expect(parseOptions(options)).toEqual(expectedResult);
    });

    it('should parse with argv from process', () => {
        const {
            parse
        } = require('./index');
        process.argv = ['node', 'thisscript.js', '--flag1', '--flag2=ok', '--flag3 ok', '--flag4', '--flag5=--test', '--flag6', '"--flag7"', '--flag8 1'];
        const expectedResult = {
            "flag1": true,
            "flag2": "ok",
            "flag3": "ok",
            "flag4": true,
            "flag5": "--test",
            "flag6": true,
            "flag7": true,
            "flag8": "1"
        };

        expect(parse()).toEqual(expectedResult);
    });
});