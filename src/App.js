import React, { useEffect, useState } from 'react';
import logo from './logo.gif';
import './App.css';

const App = () => {

  const allTowns = {
    "1": "bourges".toUpperCase(),
    "2": "cherbourg".toUpperCase(),
    "3": "dieppe".toUpperCase(),
    "4": "epernay".toUpperCase(),
    "5": "forbach".toUpperCase(),
    "6": "gerardmer".toUpperCase(),
    "7": "hericourt".toUpperCase(),
    "8": "issoire".toUpperCase(),
    "9": "jarnac".toUpperCase(),
    "0": "angers".toUpperCase()
  }

  let separatorEux = "";
  let separatorDates = "";

  const allRevTowns = Object.entries(allTowns).reduce((acc, [key, town]) => {
    acc[key] = town.split("").reverse().join("");
    return acc
  }, {})

  const spirTxt = "CARIGNAN";
  const clefTxt = "La ClEF Se CaCHe SUR uN NaVIRe NOIr PErCHe".toUpperCase();
  const cleSfTxt = "La ClEsF Se CaGe SUR uN NaVIRe NOIr PErCHe"
  const aigleTxt = "C'EST LA QUE L'AIGLE IMPRIMA LA MARQUE DE SES SERRES DANS LE SABLE, CENT JOURS AVANT DE SE CASSER LE BEC ET Y LAISSER SES PLUMES." //.split("").reverse().join("")
  const aigleWds = aigleTxt.split(" ");
  const revText = (txt) => {
    return txt.split(" ").map(wrd => wrd.split("").reverse().joint("")).join(" ");
  }

  const getAiglesWds = (txt) => {
    const letters = txt.split("");
    return letters.map(letter => {
      if (letter === " ") { return letter }
      const letterPos = letter.charCodeAt(0) - 64 - 1;
      const wd = aigleWds[letterPos];
      return wd
    }).join("")

  }

  const [revCarignan, setRevCarignan] = useState(false);
  const [revLaclef, setRevLaClef] = useState(false);
  const [revAigle, setRevAigle] = useState(false);
  const [cleSf, setCleSf] = useState(false);

  const [themOrder, setThemOrder] = useState("AIG-CLE-CAR")

  const fibule = "MANIOS MED FHE FHAKED NUMASIOI".replaceAll(" ", "")

  const handleCleSf = () => {
    setCleSf(prevCleSf => !prevCleSf)
  }

  const handleRevCarignan = () => {
    setRevCarignan(prevRevCarignan => !prevRevCarignan)
  }

  const handleRevLaClef = () => {
    setRevLaClef(prevRevLaClef => !prevRevLaClef)
  }

  const handleRevAigle = () => {
    setRevAigle(prevRevAigle => !prevRevAigle)
  }

  const handleThemOrder = (changeEvent) => {
    setThemOrder(changeEvent.target.value)
  }


  const [code, setCode] = useState(aigleTxt + clefTxt + spirTxt);

  useEffect(() => {

    // "AIG-CLE-CAR"  "AIG-CAR-CLE"  "CLE-CAR-AIG"  "CLE-AIG-CAR"  "CAR-AIG-CLE"  "CAR-CLE-AIG"


    const aigle = revAigle ? aigleTxt.split("").reverse().join("") : aigleTxt;
    const clef = cleSf ? revLaclef ? cleSfTxt.split("").reverse().join("") : cleSfTxt :
      revLaclef ? clefTxt.split("").reverse().join("") : clefTxt;
    const spir = revCarignan ? spirTxt.split("").reverse().join("") : spirTxt;

    let newCode;
    switch (themOrder) {
      case "AIG-CLE-CAR":
        newCode = aigle + separatorEux + clef + separatorEux + spir;
        break;
      case "AIG-CAR-CLE":
        newCode = aigle + separatorEux + spir + separatorEux + clef;
        break;
      case "CLE-CAR-AIG":
        newCode = clef + separatorEux + spir + separatorEux + aigle;
        break;
      case "CLE-AIG-CAR":
        newCode = clef + separatorEux + aigle + separatorEux + spir;
        break;
      case "CAR-AIG-CLE":
        newCode = spir + separatorEux + aigle + separatorEux + clef;
        break;
      case "CAR-CLE-AIG":
        newCode = spir + separatorEux + clef + separatorEux + aigle;
        break;

      default:
        newCode = aigle + separatorEux + clef + separatorEux + spir;
        break;
    }



    setCode(newCode);
  }, [revCarignan, revLaclef, revAigle, cleSf, themOrder])

  const useFibule = (txt, revFibule) => {
    if (!txt) return "";

    const code = revFibule ? [...fibule].reverse() : [...fibule];
    const result = txt.toLowerCase().split("").map(chr => {
      const pos = chr.charCodeAt(0) - 97;
      return pos >= 0 && pos <= 25 ? code[pos] : "";
    }).join("");

    return result;
  };



  /**
   * Dates trouvées sur l'orgue de l'église Saint-Pierre de Tonnerre.
   */
  const datesOrderNormalOrder = ["1610", "1675", "1707", "1855", "1847", "1896"];
  const datesOrderChronoOrder = [...datesOrderNormalOrder].sort();

  const datesOrderNormalOrderStr = datesOrderNormalOrder.join("")
  const datesOrderChronoOrderStr = datesOrderChronoOrder.join("");
  const datesOrderNOEachDateReverseStr = datesOrderNormalOrder.map(date => date.split("").reverse().join("")).join("");
  const datesOrderCOEachDateReverseStr = datesOrderChronoOrder.map(date => date.split("").reverse().join("")).join("");
  const datesOrderReverseNormalOrderStr = [...datesOrderNormalOrder].reverse().join("");
  const datesOrderReverseChronoOrderStr = [...datesOrderChronoOrder].reverse().join("");
  const datesOrderFullReverseNormalOrderStr = datesOrderNormalOrder.reverse().map(date => date.split("").reverse().join("")).join("");
  const datesOrderFullReverseChronoOrderStr = datesOrderChronoOrder.reverse().map(date => date.split("").reverse().join("")).join("");

  const datesInfos = [
    { chrono: false, dates: datesOrderNormalOrderStr, reverseAll: false, reverseEach: false },
    { chrono: true, dates: datesOrderChronoOrderStr, reverseAll: false, reverseEach: false },
    { chrono: false, dates: datesOrderNOEachDateReverseStr, reverseAll: false, reverseEach: true },
    { chrono: true, dates: datesOrderCOEachDateReverseStr, reverseAll: false, reverseEach: true },
    { chrono: false, dates: datesOrderReverseNormalOrderStr, reverseAll: true, reverseEach: false },
    { chrono: true, dates: datesOrderReverseChronoOrderStr, reverseAll: true, reverseEach: false },
    { chrono: false, dates: datesOrderFullReverseNormalOrderStr, reverseAll: true, reverseEach: true },
    { chrono: true, dates: datesOrderFullReverseChronoOrderStr, reverseAll: true, reverseEach: true }
  ]

  const [revTowns, setRevTowns] = useState(false);
  const [revAllTowns, setRevAllTowns] = useState(false);
  const [towns, setTowns] = useState(allTowns);
  const [datesSortedChrono, setDatesSortedChrono] = useState(false);
  const [datesEachReverse, setDatesEachReverse] = useState(false);
  const [datesAllReverse, setDatesAllReverse] = useState(false);
  const [ouvertureTransform, setOuvertureTransform] = useState("none"); // none - add - substractlc - substractcl
  const [decalage, setDecalage] = useState(0);

  const defaultDatesInfos = datesInfos.find(datesInfo =>
    datesInfo.chrono === datesSortedChrono &&
    datesInfo.reverseEach === datesEachReverse &&
    datesInfo.reverseAll === datesAllReverse
  )

  const [dates, setDates] = useState(defaultDatesInfos.dates);

  const separateDates = (txt) => {
    if (!txt) return txt
    var result = ''
    for (var i = 0; i < 6; i++) {
      result += txt.substring(0 + i * 4, 4 + i * 4) + (i == 6 ? "" : separatorDates)
    }
    return result
  }

  /**
   * This function retrieves the dates text from an input 'dates' array,
   * replaces each date's numerical value with the corresponding string representation of the belonging town name,
   *  applies a positional shift by a given 'decalage' value to the resulting string of mapped text,
   *  and finally returns the shifted dates text wrapped in a string.
   * @returns 
   */
  const getDatesTxt = () => {
    const datesTxt = separateDates(dates)
      .split("")
      .map(num => (num === " " ? " " : towns[num]))
      .join("");

    const maxLength = datesTxt.length;
    const decalageMod = (maxLength * 100 + decalage) % maxLength;

    const decalTxt = `${datesTxt.substring(decalageMod, maxLength)}${datesTxt.substring(0, decalageMod)}`;
    return decalTxt;
  }

  useEffect(() => {
    setDatesTxt(getDatesTxt());
  }, [decalage])

  const [datesTxt, setDatesTxt] = useState(getDatesTxt());

  const [ouvertureRegex, setOuvertureRegex] = useState(new RegExp(`${towns[1]}`, 'g'));

  useEffect(() => {
    setTowns(revTowns ? allRevTowns : allTowns);
  }, [revTowns])

  useEffect(() => {
    setOuvertureRegex(new RegExp(`${towns[1]}`, 'g'));
  }, [towns])

  useEffect(() => {
    const datesInfoToKeep = datesInfos.find(datesInfo =>
      datesInfo.chrono === datesSortedChrono &&
      datesInfo.reverseEach === datesEachReverse &&
      datesInfo.reverseAll === datesAllReverse
    )
    setDates(datesInfoToKeep.dates);
  }, [datesSortedChrono, datesEachReverse, datesAllReverse])

  useEffect(() => {
    setDatesTxt(getDatesTxt())
  }, [dates, towns, revAllTowns])


  const [reveledByOuverture, setReveledByOuverture] = useState(true);

  const ouverture = "bourges";

  const addOuvertureToLumiere = (txt) => {
    const ouvertureCodes = (revTowns ? ouverture.split("").reverse().join("") : ouverture).split("").map((_, index) => ouverture.charCodeAt(index) - 96)
    const txtCodes = txt.split("").map((_, index) => txt.toLowerCase().charCodeAt(index) - 96)
    const result = txtCodes.map((txtCode, index) => {
      const ouvertureCode = ouvertureCodes[index];
      if (txtCode === (32 - 96)) return " ";
      const resultCode = (txtCode + ouvertureCode + 26 - 1) % 26 + 1 + 64;
      return String.fromCharCode(resultCode)
    }).join("")
    return result
  }
  const substractOuvertureFromLumiere = (txt) => {
    const ouvertureCodes = (revTowns ? ouverture.split("").reverse().join("") : ouverture).split("").map((_, index) => ouverture.charCodeAt(index) - 96)
    const txtCodes = txt.split("").map((_, index) => txt.toLowerCase().charCodeAt(index) - 96)
    const result = txtCodes.map((txtCode, index) => {
      const ouvertureCode = ouvertureCodes[index];
      if (txtCode === (32 - 96)) return " ";
      const resultCode = (txtCode - ouvertureCode + 26 - 1) % 26 + 1 + 64;
      return String.fromCharCode(resultCode)
    }).join("")
    return result
  }
  const substractLumiereFromOuverture = (txt) => {
    const ouvertureCodes = (revTowns ? ouverture.split("").reverse().join("") : ouverture).split("").map((_, index) => ouverture.charCodeAt(index) - 96)
    const txtCodes = txt.split("").map((_, index) => txt.toLowerCase().charCodeAt(index) - 96)
    const result = txtCodes.map((txtCode, index) => {
      const ouvertureCode = ouvertureCodes[index];
      if (txtCode === (32 - 96)) return " ";
      const resultCode = (ouvertureCode - txtCode + 26 - 1) % 26 + 1 + 64;
      return String.fromCharCode(resultCode)
    }).join("")
    return result
  }


  const eloignement = "bfdz";
  const eloignementTxt = eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement + eloignement

  const addEloignementToLumiere = (txt) => {
    const eloigmentCodes = (revTowns ? eloignementTxt.split("").reverse().join("") : eloignementTxt).split("").map((_, index) => eloignementTxt.charCodeAt(index) - 96)
    const txtCodes = txt.split("").map((_, index) => txt.toLowerCase().charCodeAt(index) - 96)
    const result = txtCodes.map((txtCode, index) => {
      const eloigmentCode = eloigmentCodes[index];
      if (txtCode === (32 - 96)) return " ";
      const resultCode = (txtCode + eloigmentCode + 26 - 1) % 26 + 1 + 64;
      return String.fromCharCode(resultCode)
    }).join("")
    return result
  }
  const substractEloignementFromLumiere = (txt) => {
    const eloigmentCodes = (revTowns ? eloignementTxt.split("").reverse().join("") : eloignementTxt).split("").map((_, index) => eloignementTxt.charCodeAt(index) - 96)
    const txtCodes = txt.split("").map((_, index) => txt.toLowerCase().charCodeAt(index) - 96)
    const result = txtCodes.map((txtCode, index) => {
      const eloigmentCode = eloigmentCodes[index];
      if (txtCode === (32 - 96)) return " ";
      const resultCode = (txtCode - eloigmentCode + 26 - 1) % 26 + 1 + 64;
      return String.fromCharCode(resultCode)
    }).join("")
    return result
  }
  const substractLumiereFromEloignement = (txt) => {
    const eloigmentCodes = (revTowns ? eloignementTxt.split("").reverse().join("") : eloignementTxt).split("").map((_, index) => eloignementTxt.charCodeAt(index) - 96)
    const txtCodes = txt.split("").map((_, index) => txt.toLowerCase().charCodeAt(index) - 96)
    const result = txtCodes.map((txtCode, index) => {
      const eloigmentCode = eloigmentCodes[index];
      if (txtCode === (32 - 96)) return " ";
      const resultCode = (eloigmentCode - txtCode + 26 - 1) % 26 + 1 + 64;
      return String.fromCharCode(resultCode)
    }).join("")
    return result
  }

  const seeByOuverture = () => {
    var indices = [];
    for (var i = 0; i < datesTxt.length; i++) {
      if (datesTxt.substring(i, i + towns[1].length) === towns[1])
        indices.push(i);
    }
    const result = indices.map((index, key) => {
      const txt = code.substring(index, index + towns[1].length);
      switch (ouvertureTransform) {
        case "none":
          return revTowns ? txt.split("").reverse().join("") : txt;
        case "add":
          return addOuvertureToLumiere(txt);
        case "substractlc":
          return substractLumiereFromOuverture(txt);
        case "substractcl":
          return substractOuvertureFromLumiere(txt);
        default:
          return txt;
      }

    }
    );
    return revAllTowns ? result.reverse().join("") : result.join("")
  }

  const [seenByOuverture, setSeenByOuverture] = useState();

  useEffect(() => {
    setSeenByOuverture(seeByOuverture())
  }, [datesTxt, reveledByOuverture, code, revAllTowns, ouvertureTransform])


  const handleChangeRevTowns = () => {
    setRevTowns(prevRevTowns => !prevRevTowns)
  }

  const handleChangeRevAllTowns = () => {
    setRevAllTowns(prevRevAllTowns => !prevRevAllTowns)
  }

  const handleDatesSortedChrono = () => {
    setDatesSortedChrono(prevDatesSortedChrono => !prevDatesSortedChrono)
  }
  const handleChangesDatesEachReverse = () => {
    setDatesEachReverse(prevDatesEachReverse => !prevDatesEachReverse)
  }
  const handleChangeDatesAllReverse = () => {
    setDatesAllReverse(prevDatesAllReverse => !prevDatesAllReverse)
  }

  const handleChangeReveledByOuverture = () => {
    setReveledByOuverture(prevReveledByOuverture => !prevReveledByOuverture)
  }

  const handleIncreaseDecalage = (e) => {
    e.preventDefault()
    setDecalage(prevDecalage => prevDecalage + 1)
  }

  const handleDecreaseDecalage = (e) => {
    e.preventDefault()
    setDecalage(prevDecalage => prevDecalage - 1)
  }

  const spirs = [
    /*
     01 02 03 04 05 06 07
     08 09 10 11 12 13 14
     15 16 17 18 19 20 21
     22 23 24 25 26 27 28
     29 30 31 32 33 34 35
     36 37 38 39 40 41 42
     43 44 45 46 47 48 49
    */

    { fromCenter: true, direction: "N", clockwise: false, positions: [25, 18, 17, 24, 31, 32, 33, 26, 19, 12, 11, 10, 9, 16, 23, 30, 37, 38, 39, 40, 41, 34, 27, 20, 13, 6, 5, 4, 3, 2, 1, 8, 15, 22, 29, 36, 43, 44, 45, 46, 47, 48, 49, 42, 35, 28, 21, 14, 7] },
    { fromCenter: true, direction: "N", clockwise: true, positions: [25, 18, 19, 26, 33, 32, 31, 24, 17, 10, 11, 12, 13, 20, 27, 34, 41, 40, 39, 38, 37, 30, 23, 16, 9, 2, 3, 4, 5, 6, 7, 14, 21, 28, 35, 42, 49, 48, 47, 46, 45, 44, 43, 36, 29, 22, 15, 8, 1] },
    { fromCenter: true, direction: "S", clockwise: false, positions: [25, 32, 33, 26, 19, 18, 17, 24, 31, 38, 39, 40, 41, 34, 27, 20, 13, 12, 11, 10, 9, 16, 23, 30, 37, 44, 45, 46, 47, 48, 49, 42, 35, 28, 21, 14, 7, 6, 5, 4, 3, 2, 1, 8, 15, 22, 29, 36, 43] },
    { fromCenter: true, direction: "S", clockwise: true, positions: [25, 32, 31, 24, 17, 18, 19, 26, 33, 40, 39, 38, 37, 30, 23, 16, 9, 10, 11, 12, 13, 20, 27, 34, 41, 48, 47, 46, 45, 44, 43, 36, 29, 22, 15, 8, 1, 2, 3, 4, 5, 6, 7, 14, 21, 28, 35, 42, 49] },
    { fromCenter: false, direction: "N", clockwise: true, positions: [43, 36, 29, 22, 15, 8, 1, 2, 3, 4, 5, 6, 7, 14, 21, 28, 35, 42, 49, 48, 47, 46, 45, 44, 37, 30, 23, 16, 9, 10, 11, 12, 13, 20, 27, 34, 41, 40, 39, 38, 31, 24, 17, 18, 19, 26, 33, 32, 25] },
    { fromCenter: false, direction: "S", clockwise: false, positions: [1, 8, 15, 22, 29, 36, 43, 44, 45, 46, 47, 48, 49, 42, 35, 28, 21, 14, 7, 6, 5, 4, 3, 2, 9, 16, 23, 30, 37, 38, 39, 40, 41, 34, 27, 20, 13, 12, 11, 10, 17, 24, 31, 32, 33, 26, 19, 18, 25] },
    { fromCenter: false, direction: "S", clockwise: true, positions: [7, 14, 21, 28, 35, 42, 49, 48, 47, 46, 45, 44, 43, 36, 29, 22, 15, 8, 1, 2, 3, 4, 5, 6, 13, 20, 27, 34, 41, 40, 39, 38, 37, 30, 23, 16, 9, 10, 11, 12, 19, 26, 33, 32, 31, 24, 17, 18, 25] },
    { fromCenter: false, direction: "N", clockwise: false, positions: [49, 42, 35, 28, 21, 14, 7, 6, 5, 4, 3, 2, 1, 8, 15, 22, 29, 36, 43, 44, 45, 46, 47, 48, 41, 34, 27, 20, 13, 12, 11, 10, 9, 16, 23, 30, 37, 38, 39, 40, 33, 26, 19, 18, 17, 24, 31, 32, 25] },
    { fromCenter: true, direction: "O", clockwise: false, positions: [25, 24, 31, 32, 33, 26, 19, 18, 17, 16, 23, 30, 37, 38, 39, 40, 41, 34, 27, 20, 13, 12, 11, 10, 9, 8, 15, 22, 29, 36, 43, 44, 45, 46, 47, 48, 49, 42, 35, 28, 21, 14, 7, 6, 5, 4, 3, 2, 1] },
    { fromCenter: true, direction: "E", clockwise: false, positions: [25, 26, 19, 18, 17, 24, 31, 32, 33, 34, 27, 20, 13, 12, 11, 10, 9, 16, 23, 30, 37, 38, 39, 40, 41, 42, 35, 28, 21, 14, 7, 6, 5, 4, 3, 2, 1, 8, 15, 22, 29, 36, 43, 44, 45, 46, 47, 48, 49] },
    { fromCenter: true, direction: "O", clockwise: true, positions: [25, 24, 17, 18, 19, 26, 33, 32, 31, 30, 23, 16, 9, 10, 11, 12, 13, 20, 27, 34, 41, 40, 39, 38, 37, 36, 29, 22, 15, 8, 1, 2, 3, 4, 5, 6, 7, 14, 21, 28, 35, 42, 49, 48, 47, 46, 45, 44, 43] },
    { fromCenter: true, direction: "E", clockwise: true, positions: [25, 26, 33, 32, 31, 24, 17, 18, 19, 20, 27, 34, 41, 40, 39, 38, 37, 30, 23, 16, 9, 10, 11, 12, 13, 14, 21, 28, 35, 42, 49, 48, 47, 46, 45, 44, 43, 36, 29, 22, 15, 8, 1, 2, 3, 4, 5, 6, 7] },
    { fromCenter: false, direction: "E", clockwise: true, positions: [1, 2, 3, 4, 5, 6, 7, 14, 21, 28, 35, 42, 49, 48, 47, 46, 45, 44, 43, 36, 29, 22, 15, 8, 9, 10, 11, 12, 13, 20, 27, 34, 41, 40, 39, 38, 37, 30, 23, 16, 17, 18, 19, 26, 33, 32, 31, 24, 25] },
    { fromCenter: false, direction: "O", clockwise: true, positions: [49, 48, 47, 46, 45, 44, 43, 36, 29, 22, 15, 8, 1, 2, 3, 4, 5, 6, 7, 14, 21, 28, 35, 42, 41, 40, 39, 38, 37, 30, 23, 16, 9, 10, 11, 12, 13, 20, 27, 34, 33, 32, 31, 24, 17, 18, 19, 26, 25] },
    { fromCenter: false, direction: "E", clockwise: false, positions: [43, 44, 45, 46, 47, 48, 49, 42, 35, 28, 21, 14, 7, 6, 5, 4, 3, 2, 1, 8, 15, 22, 29, 36, 37, 38, 39, 40, 41, 34, 27, 20, 13, 12, 11, 10, 9, 16, 23, 30, 31, 32, 33, 26, 19, 18, 17, 24, 25] },
    { fromCenter: false, direction: "O", clockwise: false, positions: [7, 6, 5, 4, 3, 2, 1, 8, 15, 22, 29, 36, 43, 44, 45, 46, 47, 48, 49, 42, 35, 28, 21, 14, 13, 12, 11, 10, 9, 16, 23, 30, 37, 38, 39, 40, 41, 34, 27, 20, 19, 18, 17, 24, 31, 32, 33, 26, 25] },
  ]

  const drewSpirs = [
    { fromCenter: false, direction: "N", clockwise: true, positions: [7, 8, 9, 10, 11, 12, 13, 6, 29, 30, 31, 32, 33, 14, 5, 28, 43, 44, 45, 34, 15, 4, 27, 42, 49, 46, 35, 16, 3, 26, 41, 48, 47, 36, 17, 2, 25, 40, 39, 38, 37, 18, 1, 24, 23, 22, 21, 20, 19] },
    { fromCenter: false, direction: "O", clockwise: false, positions: [7, 6, 5, 4, 3, 2, 1, 8, 29, 28, 27, 26, 25, 24, 9, 30, 43, 42, 41, 40, 23, 10, 31, 44, 49, 48, 39, 22, 11, 32, 45, 46, 47, 38, 21, 12, 33, 34, 35, 36, 37, 20, 13, 14, 15, 16, 17, 18, 19] },
    { fromCenter: false, direction: "N", clockwise: false, positions: [1, 24, 23, 22, 21, 20, 19, 2, 25, 40, 39, 38, 37, 18, 3, 26, 41, 48, 47, 36, 17, 4, 27, 42, 49, 46, 35, 16, 5, 28, 43, 44, 45, 34, 15, 6, 29, 30, 31, 32, 33, 14, 7, 8, 9, 10, 11, 12, 13] },
    { fromCenter: false, direction: "E", clockwise: true, positions: [1, 2, 3, 4, 5, 6, 7, 24, 25, 26, 27, 28, 29, 8, 23, 40, 41, 42, 43, 30, 9, 22, 39, 48, 49, 44, 31, 10, 21, 38, 47, 46, 45, 32, 11, 20, 37, 36, 35, 34, 33, 12, 19, 18, 17, 16, 15, 14, 13] },
    { fromCenter: false, direction: "O", clockwise: true, positions: [13, 14, 15, 16, 17, 18, 19, 12, 33, 34, 35, 36, 37, 20, 11, 32, 45, 46, 47, 38, 21, 10, 31, 44, 49, 48, 39, 22, 9, 30, 43, 42, 41, 40, 23, 8, 29, 28, 27, 26, 25, 24, 7, 6, 5, 4, 3, 2, 1] },
    { fromCenter: false, direction: "S", clockwise: true, positions: [19, 20, 21, 22, 23, 24, 1, 18, 37, 38, 39, 40, 25, 2, 17, 36, 47, 48, 41, 26, 3, 16, 35, 46, 49, 42, 27, 4, 15, 34, 45, 44, 43, 28, 5, 14, 33, 32, 31, 30, 29, 6, 13, 12, 11, 10, 9, 8, 7] },
    { fromCenter: false, direction: "S", clockwise: false, positions: [13, 12, 11, 10, 9, 8, 7, 14, 33, 32, 31, 30, 29, 6, 15, 34, 45, 44, 43, 28, 5, 16, 35, 46, 49, 42, 27, 4, 17, 36, 47, 48, 41, 26, 3, 18, 37, 38, 39, 40, 25, 2, 19, 20, 21, 22, 23, 24, 1] },
    { fromCenter: false, direction: "E", clockwise: false, positions: [19, 18, 17, 16, 15, 14, 13, 20, 37, 36, 35, 34, 33, 12, 21, 38, 47, 46, 45, 32, 11, 22, 39, 48, 49, 44, 31, 10, 23, 40, 41, 42, 43, 30, 9, 24, 25, 26, 27, 28, 29, 8, 1, 2, 3, 4, 5, 6, 7] },

    { fromCenter: true, direction: "O", clockwise: true, positions: [31, 32, 33, 34, 35, 36, 37, 30, 13, 14, 15, 16, 17, 38, 29, 12, 3, 4, 5, 18, 39, 28, 11, 2, 1, 6, 19, 40, 27, 10, 9, 8, 7, 20, 41, 26, 25, 24, 23, 22, 21, 42, 49, 48, 47, 46, 45, 44, 43] },
    { fromCenter: true, direction: "O", clockwise: false, positions: [49, 48, 47, 46, 45, 44, 43, 26, 25, 24, 23, 22, 21, 42, 27, 10, 9, 8, 7, 20, 41, 28, 11, 2, 1, 6, 19, 40, 29, 12, 3, 4, 5, 18, 39, 30, 13, 14, 15, 16, 17, 38, 31, 32, 33, 34, 35, 36, 37] },
    { fromCenter: true, direction: "E", clockwise: true, positions: [43, 44, 45, 46, 47, 48, 49, 42, 21, 22, 23, 24, 25, 26, 41, 20, 7, 8, 9, 10, 27, 40, 19, 6, 1, 2, 11, 28, 39, 18, 5, 4, 3, 12, 29, 38, 17, 16, 15, 14, 13, 30, 37, 36, 35, 34, 33, 32, 31] },
    { fromCenter: true, direction: "E", clockwise: false, positions: [37, 36, 35, 34, 33, 32, 31, 38, 17, 16, 15, 14, 13, 30, 39, 18, 5, 4, 3, 12, 29, 40, 19, 6, 1, 2, 11, 28, 41, 20, 7, 8, 9, 10, 27, 42, 21, 22, 23, 24, 25, 26, 43, 44, 45, 46, 47, 48, 49] },
    { fromCenter: true, direction: "N", clockwise: true, positions: [49, 26, 27, 28, 29, 30, 31, 48, 25, 10, 11, 12, 13, 32, 47, 24, 9, 2, 3, 14, 33, 46, 23, 8, 1, 4, 15, 34, 45, 22, 7, 6, 5, 16, 35, 44, 21, 20, 19, 18, 17, 36, 43, 42, 41, 40, 39, 38, 37] },
    { fromCenter: true, direction: "S", clockwise: false, positions: [43, 42, 41, 40, 39, 38, 37, 44, 21, 20, 19, 18, 17, 36, 45, 22, 7, 6, 5, 16, 35, 46, 23, 8, 1, 4, 15, 34, 47, 24, 9, 2, 3, 14, 33, 48, 25, 10, 11, 12, 13, 32, 49, 26, 27, 28, 29, 30, 31] },
    { fromCenter: true, direction: "N", clockwise: false, positions: [31, 30, 29, 28, 27, 26, 49, 32, 13, 12, 11, 10, 25, 48, 33, 14, 3, 2, 9, 24, 47, 34, 15, 4, 1, 8, 23, 46, 35, 16, 5, 6, 7, 22, 45, 36, 17, 18, 19, 20, 21, 44, 37, 38, 39, 40, 41, 42, 43] },
    { fromCenter: true, direction: "S", clockwise: true, positions: [37, 38, 39, 40, 41, 42, 43, 36, 17, 18, 19, 20, 21, 44, 35, 16, 5, 6, 7, 22, 45, 34, 15, 4, 1, 8, 23, 46, 33, 14, 3, 2, 9, 24, 47, 32, 13, 12, 11, 10, 25, 48, 31, 30, 29, 28, 27, 26, 49] },
  ]

  const [drawSpiral, setDrawSpiral] = useState(false);
  const [spiralFromCenter, setSpiralFromCenter] = useState(false);
  const [spiralClockwise, setSpiralClockwise] = useState(false);
  const [spiralFirstDirection, setSpiralFirstDirection] = useState("N");
  const [spiralPositions, setSpiralPositions] = useState();

  const [spiralColors, setSpiralColors] = useState()

  const handleChangeDrawSpiral = () => {
    setDrawSpiral(prevDrawSpiral => !prevDrawSpiral)
  }

  const handleChangeSpiralFromCenter = () => {
    setSpiralFromCenter(prevSpiralFromCenter => !prevSpiralFromCenter)
  }

  const handleChangeSpiralClockwise = () => {
    setSpiralClockwise(prevSpiralClockwise => !prevSpiralClockwise)
  }


  const handleChangeSpiralFirstDirection = (changeEvent) => {
    setSpiralFirstDirection(changeEvent.target.value)
  }

  const handleChangeSetOuvertureTransform = (changeEvent) => {
    setOuvertureTransform(changeEvent.target.value)
  }

  useEffect(() => {
    const newPositions =
      !drawSpiral ?
        spirs.find(spir => {
          return spir.fromCenter === spiralFromCenter &&
            spir.clockwise === spiralClockwise &&
            spir.direction === spiralFirstDirection;
        }
        ).positions
        :
        drewSpirs.find(spir => {
          return spir.fromCenter === spiralFromCenter &&
            spir.clockwise === spiralClockwise &&
            spir.direction === spiralFirstDirection;
        }).positions
    setSpiralPositions(newPositions)
  }, [spiralFromCenter, spiralClockwise, spiralFirstDirection, drawSpiral])

  useEffect(() => {
    if (spiralPositions)
      setSpiralColors(spiralPositions.reduce((acc, position, index) => {
        if (drawSpiral) {
          const color = `hsl(${(240 * position / 49)},80% ,50%)`;
          acc[position] = { position: index + 1, color }
        } else {
          const color = `hsl(${(240 * index / 49)},80% ,50%)`;
          acc[index] = { position, color }
        }
        return acc;
      }, []).filter(item => item !== null)
      )
  }, [spiralPositions, drawSpiral])

  const getText = () => {
    if (!drawSpiral) {
      return seenByOuverture
    } else {
      if (spiralPositions) {
        return spiralPositions.map(position => seenByOuverture[position - 1]).join("");
      }
    }
  }

  const rot13 = (txt) => {
    return txt ? txt.split('').map(elt => String.fromCharCode(((elt.charCodeAt(0) - 64 + 13 - 1) % 25) + 64 + 1)).join('') : ''

  }

  const addSpaces = (txt) => {
    if (!txt) return txt
    var result = ''
    for (var i = 0; i < 7; i++) {
      result += txt.substring(0 + i * 7, 7 + i * 7) + (i == 6 ? "" : "  ")
    }
    return result
  }

  const addBourges = (txt) => {
    if (!txt) return txt
    var elts = txt.split(" ");
    var bourgesLetters = "BOURGES".split("")
    return elts.map(elt => elt.split("").map((lett, index) => lett === '-' ? bourgesLetters[index] : lett).join("")).join(" ");
  }



  const sortBourges = (txt) => {
    if (!txt) return txt
    var result = ''
    for (var i = 0; i < 7; i++) {
      var txtToSort = txt.substring(0 + i * 7, 7 + i * 7)
      console.log(txtToSort)
      // 1234567
      // bourges
      var txtSorted = txtToSort.substring(1 - 1, 1) + txtToSort.substring(6 - 1, 6) + txtToSort.substring(5 - 1, 5) + txtToSort.substring(2 - 1, 2) + txtToSort.substring(4 - 1, 4) + txtToSort.substring(7 - 1, 7) + txtToSort.substring(3 - 1, 3)

      console.log('=>' + txtSorted)
      result += txtSorted;
    }
    return result
  }



  /// Easily set default values
  useEffect(() => {

    setRevTowns(false)
    setRevAllTowns(false)
    setDatesSortedChrono(false)
    setDatesEachReverse(true)
    setDatesAllReverse(true)
    setReveledByOuverture(false)

    setDrawSpiral(false)
    setSpiralFromCenter(true)
    setSpiralClockwise(false)
    setSpiralFirstDirection("N")
    setOuvertureTransform("none")
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="Animated-logo" alt="logo" />
        <h2>Résolveur de la solution ultime</h2>
      </div>

      <div className="App-body">
        <div className="Left-menu">
          <form>
            <div style={{"display":"flex-row", "align-content": "start", "align-items": "start"}}>
              <label>Ordre eux</label>
              <div>
                <input type="radio" value="AIG-CLE-CAR"
                  checked={themOrder === 'AIG-CLE-CAR'}
                  onChange={handleThemOrder} />
                AIG-CLE-CAR (Flèches - 520)
              </div>
              <div>
                <input type="radio" value="AIG-CAR-CLE"
                  checked={themOrder === 'AIG-CAR-CLE'}
                  onChange={handleThemOrder} />
                AIG-CAR-CLE
              </div>
              <div>
                <input type="radio" value="CLE-CAR-AIG"
                  checked={themOrder === 'CLE-CAR-AIG'}
                  onChange={handleThemOrder} />
                CLE-CAR-AIG (Enigmes )
              </div>
              <div>
                <input type="radio" value="CLE-AIG-CAR"
                  checked={themOrder === 'CLE-AIG-CAR'}
                  onChange={handleThemOrder} />
                CLE-AIG-CAR (Pierrette et cdc v2)
              </div>
              <div>
                <input type="radio" value="CAR-AIG-CLE"
                  checked={themOrder === 'CAR-AIG-CLE'}
                  onChange={handleThemOrder} />
                CAR-AIG-CLE
              </div>
              <div>
                <input type="radio" value="CAR-CLE-AIG"
                  checked={themOrder === 'CAR-CLE-AIG'}
                  onChange={handleThemOrder} />
                CAR-CLE-AIG
              </div>
            </div>


            <div style={{ display: 'none' }}>
              <label>Ouverture transformation</label>
              <div>
                <input type="radio" value="none"
                  checked={ouvertureTransform === 'none'}
                  onChange={handleChangeSetOuvertureTransform} />
                none
              </div>
              <div>
                <input type="radio" value="add"
                  checked={ouvertureTransform === 'add'}
                  onChange={handleChangeSetOuvertureTransform} />
                add
              </div>
              <div>
                <input type="radio" value="substractcl"
                  checked={ouvertureTransform === 'substractcl'}
                  onChange={handleChangeSetOuvertureTransform} />
                substractcl
              </div>
              <div>
                <input type="radio" value="substractlc"
                  checked={ouvertureTransform === 'substractlc'}
                  onChange={handleChangeSetOuvertureTransform} />
                substractlc
              </div>
            </div>

            <div >
              <button onClick={handleDecreaseDecalage}>-</button> Désalignement {(datesTxt.length * 100 + decalage) % datesTxt.length}<button onClick={handleIncreaseDecalage}>+</button>
            </div>
            <div>
              <label>Retourne lueur 1</label>
              <input type="checkbox" checked={revAigle} onChange={handleRevAigle}></input>
            </div>
            <div>
              <label>Retourne lueur 2</label>
              <input type="checkbox" checked={revLaclef} onChange={handleRevLaClef}></input>
            </div>
            <div>
              <label>Retourne lueur 3</label>
              <input type="checkbox" checked={revCarignan} onChange={handleRevCarignan}></input>
            </div>
            <div style={{ display: "none" }}>
              <label>Cle sf</label>
              <input type="checkbox" checked={cleSf} onChange={handleCleSf}></input>
            </div>

            {false && <div>
              <label>Ouverture révele</label>
              <input type="checkbox" checked={reveledByOuverture} onChange={handleChangeReveledByOuverture}></input>
            </div>
            }
            <div>
              <label>Seul (lues à l'envers = à partir de la dernière)</label>
              <input type="checkbox" checked={revAllTowns} onChange={handleChangeRevAllTowns}></input>
            </div>
            <div>
              <label>Seul (chacune lue<del>s</del> à l'envers)</label>
              <input type="checkbox" checked={revTowns} onChange={handleChangeRevTowns}></input>
            </div>

            <div>
              <label>Années triées chronologiquement</label>
              <input type="checkbox" checked={datesSortedChrono} onChange={handleDatesSortedChrono}></input>
            </div>
            <div>
              <label>Inverser chaque année</label>
              <input type="checkbox" checked={datesEachReverse} onChange={handleChangesDatesEachReverse}></input>
            </div>
            <div>
              <label>Inverser toutes les années</label>
              <input type="checkbox" checked={datesAllReverse} onChange={handleChangeDatesAllReverse}></input>
            </div>
            <div >
              <hr />
              <h3>Spirale</h3>
              <hr />
              <div>
                <label>Ecrire (sinon lire) en spirale </label>
                <input type="checkbox" checked={drawSpiral} onChange={handleChangeDrawSpiral}></input>          </div>

              <div>
                <label>A partir du centre</label>
                <input type="checkbox" checked={spiralFromCenter} onChange={handleChangeSpiralFromCenter}></input>
              </div>
              <div>
                <label>Horlogique</label>
                <input type="checkbox" checked={spiralClockwise} onChange={handleChangeSpiralClockwise}></input>
              </div>
              <div>
                <label>Première direction</label>
                <span>
                  <input type="radio" value="N"
                    checked={spiralFirstDirection === 'N'}
                    onChange={handleChangeSpiralFirstDirection} />
                  N
                </span>
                <span>
                  <input type="radio" value="E"
                    checked={spiralFirstDirection === 'E'}
                    onChange={handleChangeSpiralFirstDirection} />
                  E
                </span>
                <span>
                  <input type="radio" value="S"
                    checked={spiralFirstDirection === 'S'}
                    onChange={handleChangeSpiralFirstDirection} />
                  S
                </span>
                <span>
                  <input type="radio" value="O"
                    checked={spiralFirstDirection === 'O'}
                    onChange={handleChangeSpiralFirstDirection} />
                  O
                </span>
              </div>
            </div>

          </form>
        </div>



        <div className="Content">
          <hr />
          <p className="Code">{code}</p>
          <p className="Code" dangerouslySetInnerHTML={{ __html: datesTxt.replaceAll(ouvertureRegex, (elt) => `<b>${elt}</b>`) }}></p>
          <hr />
          {false && <p className="Code">Revele: {"rvl".split("").map(chr => datesTxt[chr.toLocaleLowerCase().charCodeAt(0) - 96 - 1]).join("")}
            / {"rvl".split("").reduce((acc, chr) => {
              acc.length ?
                acc.push(chr.toLocaleLowerCase().charCodeAt(0) - 96 + acc[acc.length - 1]) : acc.push(chr.toLocaleLowerCase().charCodeAt(0) - 96 - 1)
              return acc
            }, []).map(pos => datesTxt[pos]).join("")}/
            {"revele".split("").map(chr => datesTxt[chr.toLocaleLowerCase().charCodeAt(0) - 96 - 1]).join("")} /
            {"revele".split("").reduce((acc, chr) => {
              acc.length ?
                acc.push(chr.toLocaleLowerCase().charCodeAt(0) - 96 + acc[acc.length - 1]) : acc.push(chr.toLocaleLowerCase().charCodeAt(0) - 96 - 1)
              return acc
            }, []).map(pos => datesTxt[pos]).join("")}, Tout :
            {"tout".split("").map(chr => datesTxt[chr.toLocaleLowerCase().charCodeAt(0) - 96 - 1]).join("")} /
            {"tout".split("").reduce((acc, chr) => {
              acc.length ?
                acc.push(chr.toLocaleLowerCase().charCodeAt(0) - 96 + acc[acc.length - 1]) : acc.push(chr.toLocaleLowerCase().charCodeAt(0) - 96 - 1)
              return acc
            }, []).map(pos => datesTxt[pos]).join("")}

          </p>}

          <hr />
          <p className="Code"><span >{seenByOuverture && addSpaces(seenByOuverture.replaceAll(" ", "-"))}</span></p>
          <p style={{ display: 'none' }} className="Code"><span >{seenByOuverture && addBourges(addSpaces(seenByOuverture.replaceAll(" ", "-")))}</span></p>




          {false && <p className="Code"><span >{addSpaces(seenByOuverture)}</span></p>}

          <p className="CodeSpiral">{getText() && getText().split("").map(
            (chr, index) => (
              <span key={index} style={{
                color: spiralColors ?
                  false && spiralColors.find(
                    (spiralColor) => { return spiralColor.position === (1 + index) }).color
                  : "black"
              }} >{chr}</span>))}</p>
          {true && <div>
            {!drawSpiral && spiralColors && spiralColors.map(
              ({ position, color }, index) => <span style={{ color }} key={index}>
                {seenByOuverture[position - 1]}
              </span>)}
            {drawSpiral && <p className="Code"><span >{getText()}</span></p>}
          </div>}
          {false && <span>
            <h3>Utilisation de la fibule</h3>
            <p>{useFibule(getText())}</p>
            <p>{useFibule(getText(), true)}</p>
            <p>{useFibule(seenByOuverture)}</p>
            <p>{useFibule(seenByOuverture, true)}</p>
          </span>
          }

          <hr />
          <hr />
          <br />
          <div className="AlignLeft">
            <ul>
              <li className="Checked">Sentinelles : 3 tours carrées à l’intérieur <b>➜</b> Disposition ou lecture de 49 caractères en spirale <b>➜</b> 3 tours carrés</li>
              <li className={(drawSpiral && spiralFromCenter && !spiralClockwise && spiralFirstDirection === 'N') ? "Checked" : undefined}>Faire comme la spirale tracée <b>➜</b> disposition à partir du centre et anti-horlogique, premier pas vers le Nord (en haut ?)</li>
              <li className={(spiralFirstDirection === 'S' || spiralFirstDirection === 'N') ? "Checked" : undefined}>Premier pas vers le Sud (ou visuel : vers le haut)</li>
              <li className="Checked">Voir par l'ouverture ou l'ouverture révèle la lumière</li>
              <li className={(datesEachReverse && datesAllReverse) ? "Checked" : undefined}>La terre s'ouvre <b>➜</b> l'ouverture où un u a été remplacé par ares</li>
              <li className={(!revAigle && datesEachReverse && datesAllReverse) ? "Checked" : undefined}>Referme sa blessure <b>➜</b> retire la marque de ses serres</li>
              <li className={((datesEachReverse && datesAllReverse) && !(revTowns)) ? "Checked" : undefined}>Montre ton respect à dame nature <b>➜</b> Gé en premier</li>
              <li className="Checked">26 et 24 e (nombre d'intervales)</li>
              <li className={themOrder === 'AIG-CLE-CAR' ? "Checked" : undefined}>Les flèches donnent l'ordre qui est confirmé par les lignes 2, 3 et 4 en rapport avec les visuels</li>
              <li className="Checked">7 parties cruelles <b>➜</b> 7 x 7 = 49</li>
              <li className="Checked">Où porter ta pelle <b>➜</b> où portée t'appelle <b>➜</b> énigme dans laquelle est tracée la spirale ou dans laquelle sont utilisées des notes</li>
              <li className="Checked"><del>100</del> 129 jours car Aquila faute</li>
              <li className={(revAllTowns || revTowns) ? "Checked" : undefined}>Seul <b>➜</b> lues à l'envers <b>➜</b> parties lues à l'envers</li>
              <li className={((datesEachReverse && datesAllReverse && !datesSortedChrono) && !(revTowns)) ? "Checked" : undefined}>confirmée par IS Sentinelles. <b>➜</b> = ruotrs = r tours</li>
            </ul>
            Autres :
            <ul>
              <li>Avenue du 8 mai 1945</li>
              <li>La fibule: MANIOSMEDF HEFHAKEDNU MASIOI écrit de droite à gauche</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
