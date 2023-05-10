const anneesNum = ["1610", "1675", "1707", "1855", "1847", "1896"];
const anneesNumRev = [...anneesNum]
  .reverse()
  .map((elt) => elt.split("").reverse());
const annees = anneesNum.join("").split("");

const anneesInversees = [...annees].reverse();
const villes = {
  1: "bourges",
  2: "cherbourg",
  3: "dieppe",
  4: "epernay",
  5: "forbach",
  6: "gerardmer",
  7: "hericourt",
  8: "issoire",
  9: "jarnac",
  0: "angers",
};

const tout = anneesInversees.map((num) => villes[num]).join("");

const adjs = [
  "IMMOBILES",
  "FIDÈLES",
  "TANGIBLES",
  "MASSIVES",
  "SEMBLABLES",
  "DISSEMBLABLES",
];
const adjCorrs = [
  "IMMOBILES",
  "FIDÈLES",
  "TANGIBLES",
  "MASSIBLES",
  "SEMBLABLES",
  "DISSEMBLABLES",
];

// IS sentinelles
console.log(
  adjCorrs
    .reduce((pos, adj, index) => {
      const annee = anneesNumRev[index].map((num) => villes[num]).join("");
      pos.push(annee[adj.length - 1]);
      return pos;
    }, [])
    .reverse()
    .join("")
);

const lumiere = "CARIGNAN";
const tenebresResplendissantes = "LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE";
const lumiereCeleste =
  "C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE, CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES.";

const ouverture = villes[1];
const longueurOuverture = ouverture.length;

const positionOuvertures = [];
for (var i = 0; i < tout.length; i++) {
  if (tout.substring(i, i + longueurOuverture) === ouverture)
    positionOuvertures.push(i);
}

const voirParOuverture = (eux) => {
  return positionOuvertures.map((position) =>
    eux.substring(position, position + longueurOuverture)
  );
};

const voirParOuvertureInverse = (eux) => {
  const elts = positionOuvertures.map((position) =>
    eux.substring(position, position + longueurOuverture)
  );

  // Créer une copie de `eux` pour la modifier
  let modifiedEux = eux;
  // Parcourir les éléments à retirer et les retirer de la chaîne `eux`
  elts.forEach((elt) => {
    modifiedEux = modifiedEux.replace(elt, "");
  });

  return modifiedEux;
};

const lumieres = [lumiere, tenebresResplendissantes, lumiereCeleste];

function obtenirPermutations(arr) {
  let resultats = [];
  function permuter(array, n = array.length) {
    if (n === 1) {
      resultats.push(array.slice().join(""));
      return;
    }
    for (let i = 0; i < n; i++) {
      permuter(array, n - 1);
      const index = n % 2 === 0 ? i : 0;
      [array[index], array[n - 1]] = [array[n - 1], array[index]];
    }
  }
  permuter(arr);
  return resultats;
}
console.log();
console.log("Simples permutations des lumières");
console.log("----------------------------------------------");
let toutesLesPermutationsdeLumieres = obtenirPermutations(eux);

const results = toutesLesPermutationsdeLumieres.map((lums) =>
  voirParOuverture(lums)
);

const getSommePosition = (str) => {
  return str
    .split("")
    .reduce(
      (acc, _letter, index) =>
        acc + (_letter === " " ? 0 : str.charCodeAt(index) - 64),
      0
    );
};
results.forEach((result, index) =>
  console.log(`${index + 1}: ${result.join("")}`)
);
/*
console.log();
console.log("Simples permutations des lumières IS");
console.log("----------------------------------------------");
const positionsIS = "srtour".split("").reduce((acc, chr, index) => {
  const lastPos = acc.length === 0 ? 0 : acc[acc.length - 1];
  acc.push(lastPos + "srtour".charCodeAt(index) - 96);
  return acc;
}, []);

const resultsIS = toutesLesPermutationsdeLumieres.map((lums) => {
  return positionsIS.map((position) => lums[position - 1]).join("");
});

console.log("**********************");
console.log(resultsIS);
console.log("**********************");
*/

console.log();
console.log("Somme positions contient 2640 = 8000 * .33 ?");
console.log("---------------------------------------");
const contientLettres = (chaine, lettres) => {
  for (let lettre of lettres) {
    if (!chaine.includes(lettre)) {
      return false;
    }
  }
  return true;
};

results.forEach((result, index) => {
  const somme = getSommePosition(result.join(""));
  const sommeStr = `0${somme}`;
  const distInSommeStr = contientLettres(sommeStr, "2640".split(""));
  console.log(`${index + 1}: ${sommeStr} ${distInSommeStr ? "V" : "x"}`);
});
console.log();
console.log("La terre s'ouvre = l'ouverture avec un u remplacé par sera");
console.log("----------------------------------------------------------");
results.forEach((result, index) => {
  const uLetters = result.map((elt) => elt[2]).join("");
  const seraInULetters = uLetters
    .toLowerCase()
    .replaceAll("s", "|S|")
    .replaceAll("e", "|E|")
    .replaceAll("r", "|R|")
    .replaceAll("a", "|A|");
  const isSeraInULetters = contientLettres(uLetters, "SERA".split(""));
  console.log(
    `${index + 1}: ${seraInULetters}\t\t${isSeraInULetters ? "V" : "x"}`
  );
});

console.log();
console.log(
  "On enlève la blessure: LA MARQUE DE SES SERRES, on voit une partie de carignan et un partie du navire => on ne doit pas les retrouver dans le reste"
);
console.log("----------------------------------------------------------");
const resultRests = toutesLesPermutationsdeLumieres.map((lums) =>
  voirParOuvertureInverse(lums)
);
resultRests.forEach((resultRest, index) =>
  console.log(
    `${index + 1}: ${resultRest} blessure: ${
      resultRest.includes("LA MARQUE DE SES SERRES") ? "V" : "x"
    } voir lumiere: ${!resultRest.includes("CARIGNAN") ? "V" : "x"} voir nef: ${
      !resultRest.includes("NAVIRE") ? "V" : "x"
    }`
  )
);

console.log();
const solNum = 5;
console.log(
  `On ne garde que le ${solNum} pour ces raisons + ordre des lumières peut être ok avec v1 v2 v3`
);
console.log("----------------------------------------------------------");
const lumiereVue = results[solNum - 1];
console.log(lumiereVue);
