const fs = require("fs");
const choixToutCommenceParG = false;
const unSeulNoeud = true; // Tri global par pour chaque lumiere
const favoriseDecalage = true; // Quand l'assemblage des eux dépasse 179 => on teste les décalage de tout par rapport à eux;
const eviteTriAlphabetique = true;
const voirJusteResultat = true;
const resultEnCarre = false;
const pasDeDouteSurGroupeParValeur = true; // La lumière céleste est divisée en 2 groupes car en 13 il y a des groupes avec des valeurs identiques
const pasDeDouteSurGroupeParLongueur = true; // La lumière céleste est divisée en 2 groupes car en 13 il y a des groupes avec des valeurs identiques

// En espérant que l'ordre sur l'orgue soit respecté => pas par ordre croissant.
const annees = ["1610", "1675", "1707", "1855", "1847", "1896"];

const anneeNonInversees = annees.join("").split(""); // 1610 1675 1707 1855 1847 1896
const anneesInversees1 = annees.join("").split("").reverse(); // 6981 7481 5581 7071 5761 0161 // Commencera par G erardmer...
const anneesInversees2 = [...annees].reverse().join("").split(""); // 1896 1847 1855 1707 1675 1610
const anneesInversees3 = annees // 0161 5761 7071 5581 7481 6981
	.map((annee) => annee.split("").reverse().join(""))
	.join("")
	.split("");

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
const ouverture = villes[1]; // bourges
const longueurOuverture = ouverture.length; // 7

// Les inversions des années, pour créer TOUT, les plus probables.  3 inversions différentes ou pas.
const tousAnnees = [
	anneesInversees1,
	...(!choixToutCommenceParG
		? [anneesInversees2, anneesInversees3, anneeNonInversees]
		: []),
];

// TOUT (solution de la 650) les plus probables.
// Remplacement des chiffres par les noms de villes (et inversement...)
const tous = tousAnnees.map((annees) =>
	annees.map((num) => villes[num]).join(""),
);

const lumiere = "CARIGNAN";
const tenebresResplendissantes = "LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE";
const lumiereCeleste =
	"C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE, CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES.";
const eux = [lumiere, tenebresResplendissantes, lumiereCeleste];

// Ce qu'il reste des lumières après avoir vu par l'ouverture. (juste pour info).
const voirParOuvertureInverse = (tout, eux) => {
	const positionOuvertures = [];
	for (let i = 0; i < tout.length; i++) {
		if (tout.substring(i, i + longueurOuverture) === ouverture)
			positionOuvertures.push(i);
	}
	const elts = positionOuvertures.map((position) =>
		eux.substring(position, position + longueurOuverture),
	);
	let modifiedEux = eux;
	elts.forEach((elt) => {
		modifiedEux = modifiedEux.replace(elt, "");
	});
	console.log(`   (${modifiedEux})`);
};

const voirParOuverture = (tout, eux) => {
	// Si la longueur de eux dépasse celle de tout. 179 + 2 espaces obtnenu lors de l'assemblage
	// Il y a 3 façons de régler le problème.
	// Supprimer les , et .                               --> bof
	// Supprimer les espaces avant et après CARIGNAN      --> bof
	// Essayer les décalages de tout par rapport à eux.
	const euxPossibles = [eux];
	if (tout.length !== eux.length) {
		if (!favoriseDecalage) {
			euxPossibles.push(eux.replaceAll(",", "").replaceAll(".", ""));
			euxPossibles.push(eux.replaceAll(" CARIGNAN ", "CARIGNAN"));
		}
		while (eux.length > tout.length) {
			eux = eux.substring(1);
			euxPossibles.push(eux);
		}
	}
	const contientLettres = (chaine, lettres) => {
		for (const lettre of lettres) {
			if (!chaine.includes(lettre)) {
				return false;
			}
		}
		return true;
	};
	const positionOuvertures = [];
	for (let i = 0; i < tout.length; i++) {
		if (tout.substring(i, i + longueurOuverture) === ouverture)
			positionOuvertures.push(i);
	}
	euxPossibles.forEach((euxPossible) => {
		const vu = positionOuvertures.map((position) =>
			euxPossible.substring(position, position + longueurOuverture),
		);
		//console.log("");
		if (!voirJusteResultat) {
			console.log(euxPossible);
			console.log(tout.replaceAll("bourges", "       ").toUpperCase());
		}
		if (resultEnCarre) {
			vu.forEach((elt) => console.log(elt));
		} else {
			const reslt = `${vu.join("")}`;
			const contientSera = contientLettres(
				vu.map((elt) => elt[2]).join(""),
				"SERA".split(""),
			);
			//if (contientSera)
			console.log(reslt);

			// Ajoute le contenu dans le fichier
			fs.appendFileSync("resultats.txt", reslt + "\n", (err) => {
				if (err) {
					console.error("Erreur lors de l'écriture dans le fichier", err);
				} else {
				//	console.log("Le contenu a été ajouté avec succès dans resultats.txt");
				}
			});
		}
		// voirParOuvertureInverse(tout, euxPossible);
	});
};

// Permet d'obtenir toutes les permutations possibles (par exemple des lumières)
function obtenirPermutations(arr) {
	const resultats = [];
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

const toutesLesPermutationsdeLumieres =
	//obtenirPermutations(eux);
	[`${lumiereCeleste}${tenebresResplendissantes}${lumiere}`];

// Pour toutes les permutations: inversion de la séquence de lettre formée par les lumières
const toutesLesPermutationsdeLumieresInversees = obtenirPermutations(
	eux.map((lum) => lum.split("").reverse().join("")),
);

const montreTitre = (titre) => {
	console.log();
	console.log(titre);
	console.log("----------------------------------------------");
};

const simplePermutation = (tous) => {
	montreTitre("Simples permutations des lumières");
	tous.forEach((tout) => {
		toutesLesPermutationsdeLumieres.map((lums) => voirParOuverture(tout, lums));
	});
};
const simplePermutationLumieresInversees = (tous) => {
	montreTitre("Simples permutations des lumières inversées");
	tous.forEach((tout) => {
		toutesLesPermutationsdeLumieresInversees.map((lums) =>
			voirParOuverture(tout, lums),
		);
	});
};

// Différentes façons de considérer ' dans le tri alphabétique.
// ' avant a
const triAlpha = (a, b) => {
	return a.localeCompare(b);
};
const triAlphaInverse = (a, b) => {
	return b.localeCompare(a);
};
// On ne considère par la présence du '
const triAlphaPasApostrophe = (a, b) => {
	return a.replaceAll("'", "").localeCompare(b.replaceAll("'", ""));
};
const triAlphaPasApostropheInverse = (a, b) => {
	return b.replaceAll("'", "").localeCompare(a.replaceAll("'", ""));
};

// ' après z
const triAplhaApostropheApresZ = (a, b) => {
	const ordrePersonnalise = (char) => {
		if (char === "'") return 123; // Code ASCII après 'z'
		return char.charCodeAt(0);
	};

	return a
		.split("")
		.map(ordrePersonnalise)
		.join("")
		.localeCompare(b.split("").map(ordrePersonnalise).join(""));
};

const triAplhaApostropheApresZInverse = (a, b) => {
	const ordrePersonnalise = (char) => {
		if (char === "'") return 123; // Code ASCII après 'z'
		return char.charCodeAt(0);
	};

	return b
		.split("")
		.map(ordrePersonnalise)
		.join("")
		.localeCompare(a.split("").map(ordrePersonnalise).join(""));
};

// Tris alphabetiques possibles (en considérant ')
const trisAplha = [triAlpha, triAlphaPasApostrophe, triAplhaApostropheApresZ];
// Tris alphabetiques inverses possibles (en considérant ')
const trisAplhaInverse = [
	triAlphaInverse,
	triAlphaPasApostropheInverse,
	triAplhaApostropheApresZInverse,
];

let euxTriAlphabetique = trisAplha
	.map((tri) => {
		const triés = eux.join(" ").split(" ").sort(tri).join(" ");
		return triés;
	})
	.flat(Infinity);

let euxTriAlphabetiqueInverse = trisAplhaInverse
	.map((tri) => {
		const triés = eux.join(" ").split(" ").sort(tri).join(" ");
		return triés;
	})
	.flat(Infinity);

const euxDix = [
	...tenebresResplendissantes.split(" "),
	"C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,",
	"CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES.",
	lumiere,
];

const euxVingtTrois = [
	...tenebresResplendissantes.split(" "),
	"C'EST LA",
	"QUE L'AIGLE",
	"IMPRIMA LA",
	"MARQUE DE",
	"SES SERRES",
	"DANS LE",
	"SABLE, CENT",
	"JOURS AVANT",
	"DE SE",
	"CASSER LE",
	"BEC ET",
	"Y LAISSER",
	"SES PLUMES.",
	lumiere,
];

let euxTriAlphabetiqueDix = trisAplha
	.map((tri) => {
		const triés = euxDix.sort(tri).join(" ");
		return triés;
	})
	.flat(Infinity);

let euxTriAlphabetiqueDixInverse = trisAplhaInverse
	.map((tri) => {
		const triés = euxDix.sort(tri).join(" ");
		return triés;
	})
	.flat(Infinity);

let euxTriAlphabetiqueVingtTrois = trisAplha
	.map((tri) => {
		const triés = euxVingtTrois.sort(tri).join(" ");
		return triés;
	})
	.flat(Infinity);

let euxTriAlphabetiqueVingtTroisInverse = trisAplhaInverse
	.map((tri) => {
		const triés = euxVingtTrois.sort(tri).join(" ");
		return triés;
	})
	.flat(Infinity);

const triAlphabetiqueMotsDesLumieres = (tous) => {
	montreTitre("Tri alphabetique des mots des lumières");
	tous.forEach((tout) => {
		euxTriAlphabetique.map((lums) => {
			voirParOuverture(tout, lums);
		});
	});
};

const triAlphabetiqueInverseMotsDesLumieres = (tous) => {
	montreTitre("Tri alphabetique inverse des mots des lumières");
	tous.forEach((tout) => {
		euxTriAlphabetiqueInverse.map((lums) => voirParOuverture(tout, lums));
	});
};

const triAlphabetiqueMotsDixDesLumieres = (tous) => {
	montreTitre("Tri alphabetique des mots des lumières dix groupes");
	tous.forEach((tout) => {
		euxTriAlphabetiqueDix.map((lums) => {
			voirParOuverture(tout, lums);
		});
	});
};

const triAlphabetiqueInverseDixMotsDesLumieres = (tous) => {
	montreTitre("Tri alphabetique inverse des mots des lumières dix groupes");
	tous.forEach((tout) => {
		euxTriAlphabetiqueDixInverse.map((lums) => voirParOuverture(tout, lums));
	});
};

const triAlphabetiqueMotsVingtTroisDesLumieres = (tous) => {
	montreTitre("Tri alphabetique des mots des lumières dix groupes");
	tous.forEach((tout) => {
		euxTriAlphabetiqueVingtTrois.map((lums) => {
			voirParOuverture(tout, lums);
		});
	});
};

const triAlphabetiqueInverseVingtTroisMotsDesLumieres = (tous) => {
	montreTitre("Tri alphabetique inverse des mots des lumières dix groupes");
	tous.forEach((tout) => {
		euxTriAlphabetiqueVingtTroisInverse.map((lums) =>
			voirParOuverture(tout, lums),
		);
	});
};

const triAlphabetiqueMotsDeChaqueLumiere = (tous) => {
	montreTitre("Tri alphabetique de tous les mots de chaque lumière");
	tous.forEach((tout) => {
		trisAplha.forEach((triAplha) => {
			const tenebresResplendissantesTriAlpha = tenebresResplendissantes
				.split(" ")
				.sort(triAplha)
				.join(" ");
			const lumiereCelesteTriAlpha = lumiereCeleste
				.split(" ")
				.sort(triAplha)
				.join(" ");

			const tousTrisChaqueLumiere = [
				lumiere,
				tenebresResplendissantesTriAlpha,
				lumiereCelesteTriAlpha,
			];
			const toutesLesPermutationstousTrisChaqueLumiere = obtenirPermutations(
				tousTrisChaqueLumiere,
			);
			toutesLesPermutationstousTrisChaqueLumiere.forEach((lums) => {
				voirParOuverture(tout, lums);
			});
		});
	});
};
const triAlphabetiqueInverseMotsDeChaqueLumiere = (tous) => {
	montreTitre("Tri alphabetique inverse de tous les mots de chaque lumière");
	tous.forEach((tout) => {
		trisAplhaInverse.forEach((trisAplhaInverse) => {
			const tenebresResplendissantesTriAlpha = tenebresResplendissantes
				.split(" ")
				.sort(trisAplhaInverse)
				.join(" ");
			const lumiereCelesteTriAlpha = lumiereCeleste
				.split(" ")
				.sort(trisAplhaInverse)
				.join(" ");

			const tousTrisChaqueLumiere = [
				lumiere,
				tenebresResplendissantesTriAlpha,
				lumiereCelesteTriAlpha,
			];
			let toutesLesPermutationstousTrisChaqueLumiere = obtenirPermutations(
				tousTrisChaqueLumiere,
			);
			toutesLesPermutationstousTrisChaqueLumiere.forEach((lums) => {
				voirParOuverture(tout, lums);
			});
		});
	});
};

// Tri en fonction des valeurs obtenues pendant les décryptages des énigmes.
// -------------------------------------------------------------------------

const groupesTenebresResplendissantes = [
	{
		442: "CACHE SUR UN",
		525.4: "LA CLEF SE",
		824.5: "NAVIRE NOIR PERCHE",
	},
];

// Toutes les permutations possibles car des groupes ont la même valeur.
// Séparation en 13 ou 2 groupes possibles. 26 conduirait à des groupes sans valeurs
const groupesLumiereCeleste = [
	{
		289841:
			"C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,",
		314666: "CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES.",
	},
	...(pasDeDouteSurGroupeParValeur
		? []
		: [
				{
					365: "BEC ET",
					10752: "DE SE",
					10753: "SABLE, CENT", // Le nombre + 1 pour force le tri
					11117: "C'EST LA",
					21504: "CASSER LE",
					21505: "Y LAISSER", // Le nombre + 1 pour force le tri
					30667: "QUE L'AIGLE",
					31354: "MARQUE DE",
					43008: "SES SERRES",
					70892: "DANS LE",
					92051: "IMPRIMA LA",
					106254: "JOURS AVANT",
					154287: "SES PLUMES.",
				},
				{
					365: "BEC ET",
					10752: "DE SE",
					10753: "SABLE, CENT", // Le nombre + 1 pour force le tri
					11117: "C'EST LA",
					21504: "Y LAISSER",
					21505: "CASSER LE", // Le nombre + 1 pour force le tri
					30667: "QUE L'AIGLE",
					31354: "MARQUE DE",
					43008: "SES SERRES",
					70892: "DANS LE",
					92051: "IMPRIMA LA",
					106254: "JOURS AVANT",
					154287: "SES PLUMES.",
				},
				{
					365: "BEC ET",
					10752: "SABLE, CENT",
					10753: "DE SE", // Le nombre + 1 pour force le tri
					11117: "C'EST LA",
					21504: "CASSER LE",
					21505: "Y LAISSER", // Le nombre + 1 pour force le tri
					30667: "QUE L'AIGLE",
					31354: "MARQUE DE",
					43008: "SES SERRES",
					70892: "DANS LE",
					92051: "IMPRIMA LA",
					106254: "JOURS AVANT",
					154287: "SES PLUMES.",
				},
				{
					365: "BEC ET",
					10752: "SABLE, CENT",
					10753: "DE SE", // Le nombre + 1 pour force le tri
					11117: "C'EST LA",
					21504: "Y LAISSER",
					21505: "CASSER LE", // Le nombre + 1 pour force le tri
					30667: "QUE L'AIGLE",
					31354: "MARQUE DE",
					43008: "SES SERRES",
					70892: "DANS LE",
					92051: "IMPRIMA LA",
					106254: "JOURS AVANT",
					154287: "SES PLUMES.",
				},
			]),
];

const groupelumiere = [
	{
		1600: "CARIGNAN",
	},
];

const lumieresValeurEnigmeCroissantes = groupesLumiereCeleste.map(
	(lumiereCeleste) => {
		const object = {
			...groupesTenebresResplendissantes[0],
			...groupelumiere[0],
			...lumiereCeleste,
		};
		const sortedValues = Object.keys(object)
			.map((key) => Number.parseFloat(key)) // Convertir les clés en nombres
			.sort((a, b) => a - b) // Trier numériquement
			.map((key) => object[key]);
		return sortedValues;
	},
);

const lumiereValeurEnigmeDeCroissantes = lumieresValeurEnigmeCroissantes.map(
	(lumiereValeurEnigmeCroissantes) => {
		return [...lumiereValeurEnigmeCroissantes].reverse();
	},
);

const triValeursEnigmeEnsembleLumieres = (tous) => {
	montreTitre(
		"Tri des groupes de valeurs trouvées pour l'ensemble des lumières",
	);
	tous.forEach((tout) => {
		lumieresValeurEnigmeCroissantes.forEach((lumiereValeurEnigme) => {
			const lumiereValeurEnigmeStr = lumiereValeurEnigme.join(" ");
			voirParOuverture(tout, lumiereValeurEnigmeStr);
		});
	});
};

const triInverseValeursEnigmeEnsembleLumieres = (tous) => {
	montreTitre(
		"Tri inverse des groupes de valeurs trouvées pour l'ensemble des lumières",
	);
	tous.forEach((tout) => {
		lumiereValeurEnigmeDeCroissantes.forEach((lumiereValeurEnigme) => {
			const lumiereValeurEnigmeStr = lumiereValeurEnigme.join(" ");
			voirParOuverture(tout, lumiereValeurEnigmeStr);
		});
	});
};

function obtenirPermutationsBis(arr) {
	const resultats = [];
	function permuter(array, n = array.length) {
		if (n === 1) {
			resultats.push(array.slice());
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

const triValeursEnigmeChaqueLumiere = (tous) => {
	montreTitre("Tri valeur des groupes de mots de chaque lumière");
	tous.forEach((tout) => {
		groupeCroissant.forEach((permut) => {
			permut[0].forEach((lum1) => {
				const lum1str = Object.values(lum1).join(" ");
				permut[1].forEach((lum2) => {
					const lum2str = Object.values(lum2).join(" ");
					permut[2].forEach((lum3) => {
						const lum3str = Object.values(lum3).join(" ");
						voirParOuverture(tout, `${lum1str}${lum2str}${lum3str}`);
					});
				});
			});
		});
	});
};

const triInverseValeursEnigmeChaqueLumiere = (tous) => {
	montreTitre("Tri inverse valeur des groupes de mots de chaque lumière");
	tous.forEach((tout) => {
		groupeCroissant.forEach((permut) => {
			permut[0].forEach((lum1) => {
				const lum1str = Object.values(lum1).reverse().join(" ");
				permut[1].forEach((lum2) => {
					const lum2str = Object.values(lum2).reverse().join(" ");
					permut[2].forEach((lum3) => {
						const lum3str = Object.values(lum3).reverse().join(" ");
						voirParOuverture(tout, `${lum1str}${lum2str}${lum3str}`);
					});
				});
			});
		});
	});
};

const groupesLongueurTenebresResplendissantes = [
	{
		12: "CACHE SUR UN",
		10: "LA CLEF SE",
		18: "NAVIRE NOIR PERCHE",
	},
];

// Toutes les permutations possibles car des groupes ont la même longueur valeur.
// Séparation en 13 ou 2 groupes possibles. 26 conduirait à trop de groupes avec la même longueur
const groupesLongueurLumiereCeleste = [
	{
		67: "C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,",
		61: "CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES.",
	},
	...(!pasDeDouteSurGroupeParLongueur
		? []
		: [
				// Trop de groupes avec la même longueur
				// 3 x 3 x 3 x  3 = 81 combinaisons
				{
					//     123456789012345
					5: "DE SE",
					6: "BEC ET",
					7: "DANS LE",
					8: "C'EST LA",
					9: "CASSER LE",
					9: "MARQUE DE",
					9: "Y LAISSER",
					10: "SES SERRES",
					10: "IMPRIMA LA",
					11: "SABLE, CENT",
					11: "QUE L'AIGLE",
					11: "SES PLUMES.",
					12: "JOURS AVANT",
				},
			]),
];

const groupeLongueurlumiere = [
	{
		8: "CARIGNAN",
	},
];

const lumieresLongeurCroissantes = groupesLongueurLumiereCeleste.map(
	(lumiereCeleste) => {
		const object = {
			...lumiereCeleste,
			...groupeLongueurlumiere[0],
			...groupesLongueurTenebresResplendissantes[0],
		};
		const sortedValues = Object.keys(object)
			.map((key) => Number.parseFloat(key)) // Convertir les clés en nombres
			.sort((a, b) => a - b) // Trier numériquement
			.map((key) => object[key]);
		return sortedValues;
	},
);

const lumiereLongueurDeCroissantes = lumieresLongeurCroissantes.map(
	(lumiereLongeurCroissantes) => {
		return [...lumiereLongeurCroissantes].reverse();
	},
);

const triLongueurEnsembleLumieres = (tous) => {
	montreTitre("Tri des groupes de longueurs pour l'ensemble des lumières");
	tous.forEach((tout) => {
		lumieresLongeurCroissantes.forEach((lumiereValeurEnigme) => {
			const lumiereValeurEnigmeStr = lumiereValeurEnigme.join(" ");
			voirParOuverture(tout, lumiereValeurEnigmeStr);
		});
	});
};

const triInverseLongueurEnsembleLumieres = (tous) => {
	montreTitre(
		"Tri inverse des groupes de longueurs pour l'ensemble des lumières",
	);
	tous.forEach((tout) => {
		lumiereLongueurDeCroissantes.forEach((lumiereValeurEnigme) => {
			const lumiereValeurEnigmeStr = lumiereValeurEnigme.join(" ");
			voirParOuverture(tout, lumiereValeurEnigmeStr);
		});
	});
};
/*
if (!unSeulNoeud) {
	simplePermutation(tous);
	simplePermutationLumieresInversees(tous);
}
if (!eviteTriAlphabetique) {
	triAlphabetiqueMotsDesLumieres(tous);
	triAlphabetiqueInverseMotsDesLumieres(tous);
	if (!unSeulNoeud) {
		triAlphabetiqueMotsDeChaqueLumiere(tous);
		triAlphabetiqueInverseMotsDeChaqueLumiere(tous);
	}
}

//triValeursEnigmeEnsembleLumieres(tous);
//triInverseValeursEnigmeEnsembleLumieres(tous);

if (!unSeulNoeud) {
	triValeursEnigmeChaqueLumiere(tous);
	triInverseValeursEnigmeChaqueLumiere(tous);
}

triLongueurEnsembleLumieres(tous);
triInverseLongueurEnsembleLumieres(tous);
if (!pasDeDouteSurGroupeParLongueur) {
}

triAlphabetiqueMotsDixDesLumieres(tous);
triAlphabetiqueInverseDixMotsDesLumieres(tous);
triAlphabetiqueMotsVingtTroisDesLumieres(tous);
triAlphabetiqueInverseVingtTroisMotsDesLumieres(tous);
*/
/*
console.log(" 179 Décalages par rapport à la solution la plus problable");
console.log("--------------------------------------------------------------");

function trierParTailleEtAlpha(array) {
    return array.sort((a, b) => {
        if (a.length === b.length) {
            // Si les deux chaînes ont la même longueur, les trier par ordre alphabétique
            return a.localeCompare(b);
        } 
        // Sinon, trier par taille de chaîne
        return a.length - b.length;
    });
}
//console.log(trierParTailleEtAlpha("CARIGNAN LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,".split(" ")).join(" "))
voirParOuverture(
	tous[0],
trierParTailleEtAlpha("CARIGNAN LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,".split(" ")).reverse().join(" ") 
)
//console.log(trierParTailleEtAlpha("CARIGNAN LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE".split(" ")).join(" ") )
voirParOuverture(
	tous[0],
trierParTailleEtAlpha("CARIGNAN LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE".split(" ")).reverse().join(" ") 
)

voirParOuverture(
	tous[0],
trierParTailleEtAlpha(["CARIGNAN", "LA CLEF SE", "CACHE SUR UN", "NAVIRE NOIR PERCHE", "CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES.", "C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,"]).reverse().join(" ") 
)
//console.log(trierParTailleEtAlpha("CARIGNAN LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE".split(" ")).join(" ") )
voirParOuverture(
	tous[0],
trierParTailleEtAlpha(["CARIGNAN", "LA CLEF SE", "CACHE SUR UN", "NAVIRE NOIR PERCHE", "CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES", "C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE"]).reverse().join(" ") 
)

//console.log(trierParTailleEtAlpha("CARIGNAN LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,".split(" ")).join(" "))
voirParOuverture(
	tous[1],
trierParTailleEtAlpha("CARIGNAN LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,".split(" ")).reverse().join(" ") 
)
//console.log(trierParTailleEtAlpha("CARIGNAN LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE".split(" ")).join(" ") )
voirParOuverture(
	tous[1],
trierParTailleEtAlpha("CARIGNAN LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE".split(" ")).reverse().join(" ") 
)

voirParOuverture(
	tous[1],
trierParTailleEtAlpha(["CARIGNAN", "LA CLEF SE", "CACHE SUR UN", "NAVIRE NOIR PERCHE", "CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES.", "C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,"]).reverse().join(" ") 
)
//console.log(trierParTailleEtAlpha("CARIGNAN LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE".split(" ")).join(" ") )
voirParOuverture(
	tous[1],
trierParTailleEtAlpha(["CARIGNAN", "LA CLEF SE", "CACHE SUR UN", "NAVIRE NOIR PERCHE", "CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES", "C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE"]).reverse().join(" ") 
)

*/
/*
voirParOuverture(
	tous[0],
	lumiereCeleste +
		tenebresResplendissantes +
		lumiere 
		// + lumiereCeleste +
		//tenebresResplendissantes +
		//lumiere,
);
*/
/*
voirParOuverture(
	tous[0],
["CARIGNAN", "LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE", "CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", 
	"CARIGNAN", "LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE", "CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", 
//	"CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN", "CARIGNAN"
].join(""))

voirParOuverture(
	tous[0],
["CARIGNAN", "LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE", "CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", 
	"CARIGNAN", "LA CLEF SE CACHE SUR UN NAVIRE NOIR PERCHE", "CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", 
//	"CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN", "CARIGNAN"
].join(" "))
// console.log("-");
/*
voirParOuverture(
	tous[0],
["CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN", "CARIGNAN",
//	"CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN", "CARIGNAN"
].join(""))
console.log("-");
/*voirParOuverture(
	tous[0],
["CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES.C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE, ", "CARIGNAN", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN",
	//"CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES.C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE, ", "CARIGNAN", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN"
].join(""))

/*console.log("-");
voirParOuverture(
	tous[0],
["CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN", "CARIGNAN",
	"CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN", "CARIGNAN"
].join(" "))
*/
/*console.log("-");
voirParOuverture(
	tous[0],
	tenebresResplendissantes +
		lumiereCeleste +
		lumiere +
		tenebresResplendissantes +
		lumiereCeleste +
		lumiere,
);*/
/*
console.log(
	" 179 Décalages par rapport à la solution la plus problable (avec 2 intervalles au total)",
);
console.log("--------------------------------------------------------------");
/*
voirParOuverture(
	tous[0],
	lumiereCeleste +
		" " +
		tenebresResplendissantes +
		" " +
		lumiere 
		/*+ " " +
		lumiereCeleste +
		" " +
		tenebresResplendissantes +
		" " +
		lumiere,*/
//);

//console.log("-");
/*
voirParOuverture(
	tous[0],
["CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN", "CARIGNAN",
//	"CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN", "CARIGNAN"
].join(" "))

console.log("-");
voirParOuverture(
	tous[0],
["CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", "CARIGNAN", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN",
//	"CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES. C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE,", "CARIGNAN", "NAVIRE NOIR PERCHE LA CLEF SE CACHE SUR UN"
].join(" "))

/*
console.log("-");
voirParOuverture(
	tous[0],
	tenebresResplendissantes +
		" " +
		lumiereCeleste +
		" " +
		lumiere +
		tenebresResplendissantes +
		" " +
		lumiereCeleste +
		" " +
		lumiere,
);*/
/*
console.log(
	"179 Décalages par rapport à la solution la plus problable",
);
console.log("--------------------------------------------------------------");
*/
let toutt = tous[0]
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	lumiereCeleste +
		"" +
		tenebresResplendissantes +
		"" +
		lumiere +
		"" +
		lumiereCeleste +
		"" +
		tenebresResplendissantes +
		"" +
		lumiere
);
console.log("-");
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	tenebresResplendissantes +
		"" +
		lumiereCeleste +
		"" +
		lumiere +
		"" + 
		tenebresResplendissantes +
		"" +
		lumiereCeleste +
		"" +
		lumiere 
);

toutt = tous[1]
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	lumiereCeleste +
		"" +
		tenebresResplendissantes +
		"" +
		lumiere +
		"" +
		lumiereCeleste +
		"" +
		tenebresResplendissantes +
		"" +
		lumiere
);
console.log("-");
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	tenebresResplendissantes +
		"" +
		lumiereCeleste +
		"" +
		lumiere +
		"" + 
		tenebresResplendissantes +
		"" +
		lumiereCeleste +
		"" +
		lumiere 
);

toutt = tous[2]
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	lumiereCeleste +
		"" +
		tenebresResplendissantes +
		"" +
		lumiere +
		"" +
		lumiereCeleste +
		"" +
		tenebresResplendissantes +
		"" +
		lumiere
);
console.log("-");
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	tenebresResplendissantes +
		"" +
		lumiereCeleste +
		"" +
		lumiere +
		"" + 
		tenebresResplendissantes +
		"" +
		lumiereCeleste +
		"" +
		lumiere 
);


/*
voirParOuverture(
	tous[0],
	lumiereCeleste +
		"" +
		tenebresResplendissantes +
		"" +
		lumiere +
		"" +
		lumiereCeleste +
		"" +
		tenebresResplendissantes +
		"" +
		lumiere,
);
console.log("-");
voirParOuverture(
	tous[0],
	tenebresResplendissantes +
		"" +
		lumiereCeleste +
		"" +
		lumiere +
		"" +
		tenebresResplendissantes +
		"" +
		lumiereCeleste +
		"" +
		lumiere,
);
*/

console.log(
	"179 Décalages par rapport à la solution la plus problable (avec intervalles entre chaque)",
);
console.log("-");
toutt = tous[0]
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	lumiereCeleste +
		" " +
		tenebresResplendissantes +
		" " +
		lumiere + 
		" " +
		lumiereCeleste +
		" " +
		tenebresResplendissantes +
		" " +
		lumiere 
		
);
console.log("--------------------------------------------------------------");
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	tenebresResplendissantes +
		" " +
		lumiereCeleste +
		" " +
		lumiere +
		" " +
		tenebresResplendissantes +
		" " +
		lumiereCeleste +
		" " +
		lumiere
);

toutt = tous[1]
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	lumiereCeleste +
		" " +
		tenebresResplendissantes +
		" " +
		lumiere + 
		" " +
		lumiereCeleste +
		" " +
		tenebresResplendissantes +
		" " +
		lumiere
);
console.log("--------------------------------------------------------------");
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	tenebresResplendissantes +
		" " +
		lumiereCeleste +
		" " +
		lumiere +
		" " +
		tenebresResplendissantes +
		" " +
		lumiereCeleste +
		" " +
		lumiere
);

toutt = tous[2]
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	lumiereCeleste +
		" " +
		tenebresResplendissantes +
		" " +
		lumiere + 
		" " +
		lumiereCeleste +
		" " +
		tenebresResplendissantes +
		" " +
		lumiere
);
console.log("--------------------------------------------------------------");
voirParOuverture(
	toutt.substring(toutt.indexOf("bourges"), toutt.lastIndexOf("bourges")),
	tenebresResplendissantes +
		" " +
		lumiereCeleste +
		" " +
		lumiere +
		" " +
		tenebresResplendissantes +
		" " +
		lumiereCeleste +
		" " +
		lumiere
);
/*

voirParOuverture(
	tous[0],
	lumiereCeleste +
		" " +
		tenebresResplendissantes +
		" " +
		lumiere +
		" " +
		lumiereCeleste +
		" " +
		tenebresResplendissantes +
		" " +
		lumiere,
);
console.log("--------------------------------------------------------------");
voirParOuverture(
	tous[0],
	tenebresResplendissantes +
		" " +
		lumiereCeleste +
		" " +
		lumiere +
		" " +
		tenebresResplendissantes +
		" " +
		lumiereCeleste +
		" " +
		lumiere,
);
*/

process.exit();
const lumiereCelesteGrp = triDescendant(splitAndGroupBySize(lumiereCeleste, 2));

function triDescendantNormal(arr) {
	return arr.sort((a, b) => {
		return b.localeCompare(a);
	});
}

function triDescendantPasApo(arr) {
	return arr.sort((a, b) => {
		return b.replaceAll("'", "").localeCompare(a.replaceAll("'", ""));
	});
}

function triDescendantApoEsp(arr) {
	return arr.sort((a, b) => {
		return b.replaceAll("'", " ").localeCompare(a.replaceAll("'", " "));
	});
}
function triDescendant(arr) {
	return triDescendantPasApo(arr);
}

function obtenirPermutationsTer(arr) {
	let resultats = [];
	function permuter(array, n = array.length) {
		if (n === 1) {
			resultats.push(array.slice().flat().join(""));
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

const groupeADecroissant = obtenirPermutationsTer([
	[lumiere],
	lumiereCelesteGrp,
	tenebresResplendissantesGrp,
]);
// groupeADecroissant.forEach((elt) => console.log(voirParOuverture(elt)));
const allGrps = [lumiere, ...lumiereCelesteGrp, ...tenebresResplendissantesGrp];
const sortedArray = triDescendant(allGrps);
console.log(sortedArray.join("|").replaceAll(",", "").replaceAll(".", ""));
console.log(
	voirParOuverture(
		sortedArray.join(" ").replaceAll(",", "").replaceAll(".", ""),
	),
);
console.log(sortedArray.join("|").replaceAll(" CARIGNAN ", "CARIGNAN"));
console.log(
	voirParOuverture(sortedArray.join(" ").replaceAll(" CARIGNAN ", "CARIGNAN")),
);

console.log("Sois simple mon fils");
console.log(
	" -- fils en références à ceux de la 520. Aurait pu être: Sois simple!",
);
console.log(
	" -- ordre alphabétique décroissant. Aurait pu: Reste simple mon fils,...",
);
console.log(" -- 4 mots. Aurait pu être: Sois simple, fils!");
console.log(" --> Tri des lumières en 4 groupes ?");
console.log(" -- 17 lettres => Tri des lumières en 17 groupes ?");
console.log(' -- \' dans le tri est avant A, après Z, ou à "supprimer" ?');
console.log(" --> comment trier c'est cache cent");
console.log(" -- pour l'assemblage, on garde 179 caractères de 2 façons");
console.log(" Voici quelques exemples:");
let lumières = [tenebresResplendissantes, lumiereCeleste, lumiere];
console.log("1. Tri inverse 3 lumières");
console.log(lumières.join(""));
console.log(voirParOuverture(lumières.join("")));
console.log("2. Tri inverse 3 lumières bis");
lumières = [tenebresResplendissantes, lumiere, lumiereCeleste];
console.log(lumières.join(""));
console.log(voirParOuverture(lumières.join("")));
console.log("3. Tri inverse lumières 4 groupes (car 4 mots)");
lumières = [tenebresResplendissantes, lumiere, lumiereCeleste];
console.log(lumières.join(""));
console.log(voirParOuverture(lumières.join("")));
console.log("4. Tri inverse lumières 4 groupes (car 4 mots) bis");
lumières = [tenebresResplendissantes, lumiereCeleste, lumiere];
console.log(lumières.join(""));
console.log(voirParOuverture(lumières.join("")));
console.log("5. Tri inverse lumières 17 groupes (car 17 lettres)");
console.log(sortedArray.join("|").replaceAll(",", "").replaceAll(".", ""));
console.log(
	voirParOuverture(
		sortedArray.join(" ").replaceAll(",", "").replaceAll(".", ""),
	),
);
console.log("6.Tri inverse lumières 17 groupes (car 17 lettres) bis");
console.log(sortedArray.join("|").replaceAll("|CARIGNAN|", "CARIGNAN"));
console.log(
	voirParOuverture(sortedArray.join(" ").replaceAll(" CARIGNAN ", "CARIGNAN")),
);

const mots = [
	lumiere,
	...lumiereCeleste.split(" "),
	...tenebresResplendissantes.split(" "),
];
const motsTriDescendantNormal = triDescendantNormal(mots);
const motsTriDescendantPasApo = triDescendantPasApo(mots);
const motsTriDescendantApoEsp = triDescendantApoEsp(mots);
console.log("7.Tri inverse 36 mots v1");
console.log(
	motsTriDescendantNormal.join("|").replaceAll("|CARIGNAN|", "CARIGNAN"),
);
console.log(
	" - " +
		voirParOuverture(
			motsTriDescendantNormal.join(" ").replaceAll(" CARIGNAN ", "CARIGNAN"),
		),
);

console.log("8.Tri inverse 36 mots v2");
console.log(
	motsTriDescendantNormal.join("|").replaceAll(",", "").replaceAll(".", ""),
);
console.log(
	" - " +
		voirParOuverture(
			motsTriDescendantNormal.join(" ").replaceAll(",", "").replaceAll(".", ""),
		),
);

tous.forEach((tout) => {
	voirParOuverture(tout, motsTriDescendantPasApo.join(" "));
});

console.log("10.Tri inverse 36 mots v4");
console.log(
	motsTriDescendantPasApo.join("|").replaceAll(",", "").replaceAll(".", ""),
);

console.log(
	" - " +
		voirParOuverture(
			motsTriDescendantPasApo.join(" ").replaceAll(",", "").replaceAll(".", ""),
		),
);
console.log("11.Tri inverse 36 mots v5");
console.log(
	motsTriDescendantApoEsp.join("|").replaceAll("|CARIGNAN|", "CARIGNAN"),
);
console.log(
	" - " +
		voirParOuverture(
			motsTriDescendantApoEsp.join(" ").replaceAll(" CARIGNAN ", "CARIGNAN"),
		),
);

console.log("12.Tri inverse 36 mots v6");
console.log(
	motsTriDescendantApoEsp.join("|").replaceAll(",", "").replaceAll(".", ""),
);

console.log(
	" - " +
		voirParOuverture(
			motsTriDescendantApoEsp.join(" ").replaceAll(",", "").replaceAll(".", ""),
		),
);
