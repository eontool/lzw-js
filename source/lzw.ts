let myString: string = "Loremipsumdolorsitamet,consecteturadipiscingelit.Aeneanfacilisisestsem,necultricesvelitrhoncusid.Morbiultricesmaurissitametdiammalesuada,inbibendumipsumauctor.Sedfeliserat,hendreritetlaciniafermentum,faucibuseunibh.Vestibulumbibendumcondimentumpurus,aceleifendnibhtemportincidunt.Crasquiserattincidunt,luctuslorema,aliquetaugue.Suspendisseidpretiumvelit.Suspendisseaelitligula.Aliquamdignissimviverraduivitaesodales.Sedvolutpataugueegetsapienvestibulumvarius.Innonexfinibus,cursusestac,consequatest.Curabitureleifendcommodonullaquiseuismod.Maecenaseutortoradiamsagittiscursussitametutdiam.Nullafacilisi.Morbilaoreet,sapieninsagittisultricies,enimmassalaoreettellus,nonrhoncusarculectusacjusto.";
function lzwCompress(data: string): string[] {
    let input: string[] = data.split('');
    let output: string[] = [];
    let size: number = 256;
    let dictionary: any = [];
    for (let i: number = 0; i < size; i++) {
        dictionary[String.fromCharCode(i)] = String.fromCharCode(i);
    }
    let pattern: string = input[0];
    let currentChar: string = "";
    input.forEach((element, index) => {
        pattern = currentChar + element;
        if (pattern in dictionary) {
            currentChar = pattern;
        }
        else {
            output.push(dictionary[currentChar]);
            dictionary[pattern] = size;
            size += 1;
            currentChar = element;
        }
    });
    if (currentChar) {
        output.push(dictionary[currentChar]);
    }
    return output;
}
let result = lzwCompress(myString);
// console.log(myString.split(''));
// console.log(result);
let myResult: string = "";
result.forEach((e) => {
    if (typeof e == 'number') {
        myResult += (String.fromCharCode(e));
    }
    else {
        myResult += e;
    }
});
console.log('Input:', myString);
console.log('Compressed', myResult);

function lzwDecompress(input: any[]): string {
    let size: number = 256;
    let dictionary: any = [];
    for (let i: number = 0; i < size; i++) {
        dictionary[String.fromCharCode(i)] = String.fromCharCode(i);
    }
    let pattern: string = input[0];
    let output: string = input.shift();
    let currentChar: string = "";
    input.forEach((element, index) => {
        if (element in dictionary) {
            currentChar = dictionary[element];
        }
        if (index === size) {
            currentChar = pattern + pattern[0];
        }
        output += currentChar;
        dictionary[size] = pattern + currentChar[0];
        size += 1;
        pattern = currentChar;
    });
    return output;
}
console.log("Decompress:", lzwDecompress(result));

console.log("Input: " + myString.length + " characters, " + Buffer.byteLength(myString, 'utf8') + " bytes");
console.log("Output: " + myResult.length + " characters, " + Buffer.byteLength(myResult, 'utf8') + " bytes");