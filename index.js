/**
 * To parse command line arguments to options
 * 
 * node index.js --flag1 --flag2=ok --flag3 ok --flag4 --flag5=--test --flag6 "--flag7" --flag8 1
 * 
 * expected result
 * 
 * {
 *  flag1: true,
 *  flag2: "ok",
 *  flag3: "ok",
 *  flag4: true,
 *  flag5: "--test",
 *  flag6: true,
 *  flag7: true,
 *  flag8: "1"
 * }
 * 
 */

function parseOptions(argv) {
    const args = argv.map((q) => {
        // unquote
        let result = q;
        try {
            result = JSON.parse(`[${q}]`);
            return result[0];
        } catch (e) {
            return result;
        }
    }).reduce((a, c) => {
        if (c.startsWith('--')) {
            a.push(c.substr(2));
        } else {
            a[a.length - 1] = `${a[a.length - 1]}=${c}`;
        }
        return a;
    }, []);

    const argsMap = args.map(f => {
        const s = f.split(/[ =]/, 2);
        if (s.length === 1) {
            return [s[0], true];
        }
        return [s[0], s[1]];
    })

    const options = argsMap.map(v => {
        // camelize
        const tokens = v[0].split('-');
        let newName = tokens.map(t => t.substr(0, 1).toUpperCase() + t.substr(1)).join('');
        newName = newName.substr(0, 1).toLowerCase() + newName.substr(1);
        return [newName, v[1]];
    }).reduce((a, c) => {
        a[c[0]] = c[1];
        return a;
    }, {});

    return options;
}

function parse() {
    const argv = process.argv.slice(2);
    return parseOptions(argv);
}

module.exports = {
    parseOptions,
    parse
};