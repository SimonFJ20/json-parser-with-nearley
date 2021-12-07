// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const moo = require('moo');
    const lexer = moo.compile({
        WS: {match: /\s+/, lineBreaks: true},
        number: /0|[1-9][0-9]*(?:\.[0-9]+)?/,
        string: /"(?:\\["\\]|[^\n"\\])*"/,
        lbrace:     '{',
        rbrace:     '}',
        lbracket:   '[',
        rbracket:   ']',
        comma:      ',',
        colon:      ':',
        null:       'null',
        false:       'false',
        true:       'true',
    });

    const extractPair = ({key, value}, res) => {
        if (key) res[key] = value;
    }

    const extractObject = ([,,fst,snd]) => {
        const res = {};
        extractPair(fst, res);
        for (let i in snd)
            extractPair(snd[i][3], res);
        return res;
    }

    const extractArray = ([,,fst, more]) => {
        const res = [fst];
        for (let i in more)
            res.push(more[i][3]);
        return res;
    }

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main$subexpression$1", "symbols": ["object"]},
    {"name": "main$subexpression$1", "symbols": ["list"]},
    {"name": "main", "symbols": ["_", "main$subexpression$1", "_"], "postprocess": ([,fst]) => (fst[0])},
    {"name": "object", "symbols": [{"literal":"{"}, "_", {"literal":"}"}], "postprocess": ([]) => ({})},
    {"name": "object$ebnf$1", "symbols": []},
    {"name": "object$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "pair"]},
    {"name": "object$ebnf$1", "symbols": ["object$ebnf$1", "object$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "object", "symbols": [{"literal":"{"}, "_", "pair", "object$ebnf$1", "_", {"literal":"}"}], "postprocess": extractObject},
    {"name": "pair", "symbols": ["string", "_", {"literal":":"}, "_", "value"], "postprocess": ([fst,,,,snd]) => ({key: fst, value: snd})},
    {"name": "list", "symbols": [{"literal":"["}, "_", {"literal":"]"}], "postprocess": ([]) => []},
    {"name": "list$ebnf$1", "symbols": []},
    {"name": "list$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "value"]},
    {"name": "list$ebnf$1", "symbols": ["list$ebnf$1", "list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "list", "symbols": [{"literal":"["}, "_", "value", "list$ebnf$1", "_", {"literal":"]"}], "postprocess": extractArray},
    {"name": "value", "symbols": ["object"], "postprocess": id},
    {"name": "value", "symbols": ["list"], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": ([fst]) => (parseFloat(fst.value))},
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "value", "symbols": [{"literal":"null"}], "postprocess": ([]) => (null)},
    {"name": "value", "symbols": [{"literal":"false"}], "postprocess": ([]) => (false)},
    {"name": "value", "symbols": [{"literal":"true"}], "postprocess": ([]) => (true)},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": ([fst]) => (fst.value.slice(1, -1))},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": ([]) => (null)}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
