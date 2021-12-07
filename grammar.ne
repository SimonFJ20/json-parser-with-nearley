
@{%
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

%}

@lexer lexer

main    ->  _ (object|list) _ {% ([,fst]) => (fst[0]) %}

object  ->  "{" _ "}" {% ([]) => ({}) %}
        |   "{" _ pair (_ "," _ pair):* _ "}" {% extractObject %}

pair    ->  string _ ":" _ value {% ([fst,,,,snd]) => ({key: fst, value: snd}) %}

list    ->  "[" _ "]" {% ([]) => [] %}
        |   "[" _ value (_ "," _ value):* _ "]" {% extractArray %}

value   ->  object      {% id %}
        |   list        {% id %}
        |   %number     {% ([fst]) => (parseFloat(fst.value)) %}
        |   string      {% id %}
        |   "null"      {% ([]) => (null) %}
        |   "false"     {% ([]) => (false) %}
        |   "true"      {% ([]) => (true) %}

string  ->  %string     {% ([fst]) => (fst.value.slice(1, -1)) %}

_       ->  null | %WS {% ([]) => (null) %}
