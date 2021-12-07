const nearley = require('nearley');
const grammar = require('./grammar');

/** @param {string} text @returns {object} */
const parseJson = (text) => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(text);
    return parser.results[0];
}

// console.log(parseJson('{ "abc": {"bruh": null}, "asd": false, "bruh": [123, "sad", {"brui": 213.234}] }'))

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = {parseJson}

