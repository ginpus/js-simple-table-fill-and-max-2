// susirenkam visus elementus is htmlo
var lenta = document.querySelector('.lenta');
var turiai = document.querySelector('.turiai');
var prideti = document.querySelector('.prideti');
var max = document.querySelector('.max');
var trinti = document.querySelector('.trinti');
var klaida = document.querySelector('.klaida');

prideti.addEventListener('click', function() {
    klaida.innerHTML = '';
    for (var i = 0; i < figuros.length; i++) {
        // isidedam tr'us su klase, kad butu paprasciau istrinti
        lenta.innerHTML += `<tr class="tr"><td>${figuros[i].ilgis}</td><td>${figuros[i].aukstis}</td><td>${figuros[i].plotis}</td></tr>`;
    }
});

max.addEventListener('click', function() {
    //darome skaiciavima tik tuo atveju, jei 'lenta' (duomenys) yra didesnė, nei 'turiai' (jau paskaiciuotos vertes) 
    if (lenta.rows.length > turiai.rows.length) {
        // eitules imam ne nuo 0, o nuo jau turimu turiu eiluciu ilgio, kad "neisikistu" turiu vertes
        for (var r = turiai.rows.length, n = lenta.rows.length; r < n; r++) { // kol duomenu ('lenta' eiluciu) daugiau už apskaiciuotu turiu ('turiai' eiluciu)
            var volume = 1; // naudosim turiu paskaiciavimui
            var maxVolume = 0; //naudosim maximaliai turio vertei issaugoti
            for (var c = 0, m = lenta.rows[r].cells.length; c < m; c++) { // pasiimam visas reiksmes is lentos ir tik tada skaiciuojam turi
                volume *= lenta.rows[r].cells[c].innerHTML;
            }
            turiai.innerHTML += `<tr class="tr"><td>${volume}</td></tr>`; //talpinam ji i atskira lentele 'turiai'
            if (volume >= maxVolume) {
                maxVolume = volume; //susirandam ir issisaugom didziausia verte
            }
        }
        // sukam atskira cikla, nes jei tam paciam cikle ir "dazom", tai nudazo visus, kurie buna ir mazesni (iki kol randa didziausia)
        for (var r1 = 0, n1 = turiai.rows.length; r1 < n1; r1++) {
            var maxCell = 0;
            for (var c1 = 0, m1 = turiai.rows[r1].cells.length; c1 < m1; c1++) {
                if (maxVolume == turiai.rows[r1].cells[c1].innerHTML) {
                    maxCell = turiai.getElementsByTagName('td')[r1];
                    maxCell.style.backgroundColor = "yellow";
                    maxCell.style.color = "red";
                }
            }
        }
    } else {
        klaida.innerHTML = 'Klaida - truksta duomenų tūrių apskaičiavimui';
    }
});


trinti.addEventListener('click', function() {
    if (lenta.rows.length > 0 || turiai.rows.length > 0) { //trinam jei yra ka trinti. jei nera ko trinti, duodama klaida
        klaida.innerHTML = '';
        // surenkam visus 'tr'us su pridedant eilutes uždėta .tr klase
        var trs = document.querySelectorAll('.tr');
        for (var l = trs.length - 1; l >= 0; l--) {
            // parentNode.removeChild realiai trina pats save. Jei sakom 'tr' parentNode, tai yra 'tbody'. Tuo tarpu 'tbody' childas yra 'tr'
            trs[l].parentNode.removeChild(trs[l]);
        }
    } else {
        klaida.innerHTML = 'Nėra trintinų duomenų';
    }
    //  KODEL SITAS NEVEIKIA? parastes veikia (surenka visas), bet trynimas neveikia (trina tik kai kurias)
    // var tds = document.getElementsByTagName('td');
    // for (td of tds) {
    //     // td.style.border = "3px solid orange";
    //     td.remove();
    // }
});