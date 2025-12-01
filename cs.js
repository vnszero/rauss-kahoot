function mod(n, m) {
    return ((n % m) + m) % m;
}

function cs(text, shift) {
    return text.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
            return String.fromCharCode(mod((char.charCodeAt(0) - 97 + shift), 26) + 97);
        } else if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(mod((char.charCodeAt(0) - 65 + shift), 26) + 65);
        } else {
            return char;
        }
    }).join('');
}

function dataToDict(raw) {
    const lines = raw.split('\n');
    const result = {};

    lines.forEach(line => {
        const match = line.trim().match(/^([a-zA-Z0-9_]+):\s*"([^"]+)"[,]?$/);
        if (match) {
            const key = match[1];
            const value = match[2];
            result[key] = value;
        }
    });

    return result;
}

// model
const text = `
yngIcw: "YGxyQwY4nMUWPtTdD3R5g0fdiQYr4m976qJ7adS",
ysrfBmkygl: "pysqq-iyfmmr.dgpczyqcynn.amk",
npmhcarGb: "pysqq-iyfmmr",
qrmpyecZsaicr: "pysqq-iyfmmr.dgpczyqcqrmpyec.ynn",
kcqqyegleQclbcpGb: "69734063908",
ynnGb: "1:69734063908:ucz:1084204796d8by6970bbz1",
kcyqspckclrGb: "E-VNJK05LBFE"
`;

const cd = cs(text, 2);
const data = dataToDict(cd);
