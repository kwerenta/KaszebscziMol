function Gracz(nazwa, kolor = 'rgb(245, 246, 250)', awatar) {
    this.nazwa = nazwa;
    this.kolor = kolor;
    this.awatar = awatar;

    this.pieniadze = 1500;
    this.pozycja = 0;
    this.wiezienie = 0;

    this.posiadane = [];

    this.zmianaPozycji = (kostka1, kostka2, konkretna = -1) => {
        if (konkretna == -1) {
            this.pozycja += kostka1 + kostka2;
            if (this.pozycja > 39) {
                this.pozycja -= 40;
                this.dodajPieniadze(200);
            }
        } else {
            this.pozycja = konkretna;
        }
    };
    this.dodajPieniadze = (ile) => {
        this.pieniadze += ile;
    };
    this.odejmijPieniadze = (ile) => {
        this.pieniadze -= ile;
    };
    this.czyPieniadze = (ile) => {
        return this.pieniadze - ile >= 0;
    };
    this.przelejPieniadze = (ile, komu) => {
        if (this.czyPieniadze(ile)) {
            this.odejmijPieniadze(ile);
            gracz[komu].dodajPieniadze(ile);
        }
    };
    this.dodajPosiadane = (co) => {
        this.posiadane.push(co);
        pole[co].zmienWlasciciela(gracz.findIndex((gracz) => gracz.nazwa === this.nazwa));
    };
    this.kupPole = (ktore) => {
        if (this.czyPieniadze(pole[ktore].cena)) {
            this.odejmijPieniadze(pole[ktore].cena);
            this.dodajPosiadane(ktore);
        } else {
            alert('Błąd! Odśwież stronę!');
        }
    };
    this.kupDomek = (ktore) => {
        if (this.czyPieniadze(200)) {
            this.odejmijPieniadze(200);
            pole[ktore].dodajDomek();
        } else {
            alert('Błąd! Odśwież stronę!');
        }
    };
    this.zaplacCzynsz = (ktore) => {
        if (this.czyPieniadze(pole[ktore].czynsz)) {
            this.przelejPieniadze(pole[ktore].czynsz, pole[ktore].wlasciciel);
        } else {
            alert('Błąd! Odśwież stronę!');
        }
    };
    this.przelejKazdemu = (ile) => {
        const ileGraczy = liczba_graczy - 2; //Liczba graczy liczona jest od 1 i odliczyć trzeba obecnego gracza.
        if (this.czyPieniadze(ileGraczy * ile)) {
            gracz.forEach(({ nazwa }, index) => {
                if (this.nazwa !== nazwa) this.przelejPieniadze(ile, index);
            });
        } else {
            alert('Błąd! Odśwież stronę!');
        }
    };
}

let gracz = [];
gracz[0] = new Gracz('Kamil', 'rgb(0, 151, 230)');
gracz[1] = new Gracz('Andrzej', 'rgb(232, 65, 24)');
gracz[2] = new Gracz('Zbigniew', 'rgb(68, 189, 50)');
gracz[3] = new Gracz('Bronisław', 'rgb(225, 177, 44)');
gracz[4] = new Gracz('Kazimierz', 'rgb(140, 122, 230)');
gracz[5] = new Gracz('Wacław', 'rgb(119, 140, 163)');

let kostka1;
let kostka2;
let tura = 0;
let kto = 0;
let aktualny = 0;
let obecny;

const pomalujPola = () => {
    pole.forEach(({ kolor }, index) => {
        $(`#p${index}`).addClass('pole-kolor');
        const pole = document.querySelector('.pole-kolor').style;
        pole.setProperty('--background', `${kolor}`);
    });
};

const ustawPionki = () => {
    gracz.forEach(({ nazwa, kolor }) => {
        $('#p0').append(
            `<div class=pionek${nazwa} style="background-color:${kolor}; width:10px; height:10px; border-radius: 50%;"></div>`
        );
    });
};

const przesunPionek = ({ nazwa, kolor, pozycja }) => {
    let pionek = document.querySelector(`.pionek${nazwa}`);
    let lokalizacja = pionek.getBoundingClientRect();
    let left = Math.round(lokalizacja.left);
    let top = Math.round(lokalizacja.top);

    $(`.przesun${nazwa}`).remove();
    $('body').append(
        `<div class=przesun${nazwa} style="background-color:${kolor}; width:10px; height:10px; top:${top}px; left:${left}px; position: absolute; border-radius: 50%;"></div>`
    );

    $(`.pionek${nazwa}`).remove();
    $(`#p${pozycja}`).append(
        `<div class=pionek${nazwa} style="background-color:${kolor}; width:10px; height:10px; visibility: hidden; border-radius: 50%;"></div>`
    );

    pionek = document.querySelector(`.pionek${nazwa}`);
    lokalizacja = pionek.getBoundingClientRect();
    left = Math.round(lokalizacja.left);
    top = Math.round(lokalizacja.top);
    const przesun = document.querySelector(`.przesun${nazwa}`);
    const tl = new TimelineMax();
    tl.set(przesun, { display: 'block' })
        .to(przesun, 2, { top: `${top}px`, left: `${left}px` })
        .set(pionek, { visibility: 'visible' })
        .set(przesun, { display: 'none' });
};

const rzutKoscmi = () => {
    kostka1 = Math.floor(Math.random() * 6) + 1;
    kostka2 = Math.floor(Math.random() * 6) + 1;
};
const czyDublet = () => {
    return kostka1 == kostka2;
};

const wyswietlAkcje = () => {
    aktualny = kolejnosc[kto];
    obecny = gracz[aktualny];

    zablokowany = true;
    $('#okienko').css('border-color', obecny.kolor);
    //Wyświetlenie okna akcji gracza

    if (obecny.wiezienie == 0) {
        $('#okienko').html(
            `<h1><span style="color: ${obecny.kolor}">${obecny.nazwa}</span></h1>
        <h3 class="akcja"><span class="czerwony">${obecny.pieniadze}$</span><h3>
        <h3 class="akcja"><span class="czerwony">${pole[obecny.pozycja].nazwa}</span><h3>
        <div class="guziki">
            <div class="guzik akcja" id="rzut"><p>Rzuć koścmi</p></div>
            <div class="guzik akcja" id="zarzadzaj"><p>Zarządzaj nieruchomościami</p></div>
            <div class="guzik akcja" id="wymiana"><p>Wymiana</p></div>
        </div>`
        );

        wyswietlOkienko();

        $('#rzut').click(function () {
            schowajOkienko();
            wykonajRuch();
        });
        $('#wymiana').click(function () {
            wyswietlWymiane();
        });
    } else {
        obecny.wiezienie--;
        $('#okienko').html(
            `<h1><span style="color: ${obecny.kolor}">${obecny.nazwa}</span></h1>
        <h3 class="akcja"><span class="czerwony">${obecny.pieniadze}$</span><h3>
        <h3 class="akcja"><span class="czerwony">${pole[obecny.pozycja].nazwa}</span><h3>
        <h3 id="wiezienieTury">Liczba tur do wyjścia z więzienia: ${obecny.wiezienie}<h3>
        <div class="guziki">
            <div class="guzik akcja" id="dublet"><p>Rzuć koścmi</p></div>
            <div class="guzik akcja" id="kaucja"><p>Zapłać kaucję</p></div>
        </div>`
        );
        if (obecny.wiezienie == 0) $('#wiezienieTury').text('Wychodzisz z więzenia!');
        wyswietlOkienko();

        $('#dublet').click(function () {
            schowajOkienko();
            wykonajRuch();
        });
        if (!obecny.czyPieniadze(50)) $('#kaucja').addClass('nieaktywny');
        else {
            $('#kaucja').click(function () {
                obecny.odejmijPieniadze(50);
                schowajOkienko();
                wykonajRuch();
            });
        }
    }
};

const wyswietlWymiane = () => {
    let oferowane = 0;
    let chciane = 0;
    let lista = '<select id="wybor-oferta">';
    gracz.forEach(({ nazwa, kolor }, index) => {
        if (obecny.nazwa !== nazwa) lista += `<option value="${index}" style="color:${kolor}">${nazwa}</option>`;
    });
    lista += '</select>';

    //Wyświetlenie okna wymiany
    $('#okno').html(
        `<h1><span class="czerwony">Wymiana</span></h1>
            <div class="oferta">
                <div class="ofertaL">
                    <h3><span class="czerwony">${obecny.nazwa}</span></h3>
                    <h3 class="oferowane"><span class="czerwony">${oferowane}$</span></h3>
                    <div class="guziki">
                        <div class="guzik kwota" id="ofertaL1"><p>1$</p></div>
                        <div class="guzik kwota" id="ofertaL10"><p>10$</p></div>
                        <div class="guzik kwota" id="ofertaL50"><p>50$</p></div>
                        <div class="guzik kwota" id="ofertaL100"><p>100$</p></div>
                        <div class="guzik kwota" id="ofertaL0"><p>Reset</p></div>
                    </div>
                    <div class="kontynuuj oferuj" id="zloz">Złóż ofertę</div>
                </div>
                <div class="ofertaP">
                    ${lista}
                    <h3><span class="czerwony">${chciane}$</span></h3>
                    <div class="guziki">
                        <div class="guzik kwota" id="ofertaP1"><p>1$</p></div>
                        <div class="guzik kwota" id="ofertaP10"><p>10$</p></div>
                        <div class="guzik kwota" id="ofertaP50"><p>50$</p></div>
                        <div class="guzik kwota" id="ofertaP100"><p>100$</p></div>
                        <div class="guzik kwota" id="ofertaP0"><p>Reset</p></div>
                    </div>
                    <div class="kontynuuj oferuj" id="anuluj">Anuluj ofertę</div>
                </div>
            </div>`
    );

    wyswietlOkienko('#okno');

    //Zmiana kwot pieniężnych transakcji
    $('.guzik').click(function () {
        const kwota = parseInt(this.id.substr(7));
        const strona = this.id.substr(6, 1);
        const numer = $('#wybor-oferta').children('option:selected').val();
        const drugastrona = gracz[numer];

        if (strona == 'L') {
            if (kwota != 0) {
                if (!obecny.czyPieniadze(oferowane + kwota)) {
                    alert('nie masz tyle pieniedzy');
                } else {
                    oferowane += kwota;
                    $('h3.oferowane > span').text(`${oferowane}$`);
                }
            } else {
                oferowane = 0;
                $('h3.oferowane > span').text(`${oferowane}$`);
            }
        } else if (strona == 'P') {
            if (kwota != 0) {
                if (!drugastrona.czyPieniadze(chciane + kwota)) {
                    alert('nie masz tyle pieniedzy');
                } else {
                    chciane += kwota;
                    $('.ofertaP h3 > span').text(`${chciane}$`);
                }
            } else {
                chciane = 0;
                $('.ofertaP h3 > span').text(`${chciane}$`);
            }
        }
    });

    //Złożenie, bądź anulowanie oferty wymiany
    $('.kontynuuj').click(function () {
        const numer = $('#wybor-oferta').children('option:selected').val();
        const drugastrona = gracz[numer];

        if (this.id == 'anuluj') schowajOkienko('#okno');
        else if (this.id == 'zloz') {
            console.log(drugastrona.nazwa);
        }
    });
};

const wykonajRuch = () => {
    const nieZakup = [0, 2, 4, 7, 10, 17, 20, 22, 30, 33, 36, 38];
    const poleKarty = [2, 7, 17, 22, 33, 36];

    rzutKoscmi();

    if (!czyDublet()) {
        kto++;
        if (kto > liczba_graczy - 1) {
            kto = 0;
            tura++;
        }
    }

    if (obecny.wiezienie == 0 || (obecny.wiezienie > 0 && czyDublet())) {
        obecny.zmianaPozycji(kostka1, kostka2);
        przesunPionek(obecny);
        obecny.wiezienie = 0;
    }

    //Wyświetlenie odpowiedniego okna w zależności od pola, na którym stoi gracz
    !nieZakup.includes(obecny.pozycja)
        ? !pole[obecny.pozycja].czyWlasciciel(aktualny)
            ? pole[obecny.pozycja].wlasciciel == -1
                ? wyswietlRuch(1)
                : wyswietlRuch(3)
            : wyswietlRuch(2)
        : poleKarty.includes(obecny.pozycja)
        ? wyswietlRuch(4)
        : wyswietlRuch(0);
};

const wyswietlRuch = (kod) => {
    const obecnePole = pole[obecny.pozycja];
    let kodHTML = `<h1><span class="czerwony">${obecnePole.nazwa}<span></h1>
    <h3><span style="color: ${obecny.kolor}">${obecny.nazwa} | ${obecny.pieniadze}$</span></h3>`;

    //Kody możliwości na jakie mógł trafić gracz
    //0 - Pole bez akcji
    //1 - Pole bez właściciela
    //2 - Gracz jest właścicielem
    //3 - Właścicielem pola jest inny gracz
    //4 - Pole doboru kart

    switch (kod) {
        case 0:
            //Pole bez akcji
            obecny.pozycja == 30
                ? (kodHTML += `<h3>Trafiasz do żukowa na 3 tury. Podczas swojej tury możesz spróbować wyrzucić dublet lub zapłacić kaucję w wysokości 50$.</h3>`)
                : obecny.wiezienie == 0
                ? (kodHTML += `<h3>Totalna czilera</h3>`)
                : (kodHTML += `<h3>Nie udało Ci się trafić dubletu. Pozostajesz w Żukowie.</h3>`);

            kodHTML += `<div class="kontynuuj" id="dalej">Kontynuuj</div>`;

            $('#okienko').html(kodHTML);
            wyswietlOkienko();

            $('#dalej').click(function () {
                if (obecny.pozycja == 30 && obecny.wiezienie == 0) doWiezienia();
                schowajOkienko();
                wyswietlAkcje();
                $('#dalej').off();
            });
            break;
        case 1:
            //Pole bez właściciela
            kodHTML += `
            <h3><span class="czerwony">Cena: ${obecnePole.cena}$</span></h3>
            <div class="zakup">
                <div class="guzik akcja" id="kup">Kup pole</div>
                <div class="guzik akcja" id="licytuj">Licytuj</div>
            </div>`;

            $('#okienko').html(kodHTML);
            wyswietlOkienko();

            $('#licytuj').click(function () {
                schowajOkienko();
                licytujPole(obecny.pozycja);
                $('#licytuj').off();
            });
            if (!obecny.czyPieniadze(obecnePole.cena)) $('#kup').addClass('nieaktywny');
            else {
                $('#kup').click(function () {
                    obecny.kupPole(obecny.pozycja);
                    schowajOkienko();
                    wyswietlAkcje();
                    $('#kup').off();
                });
            }
            break;
        case 2:
            //Gracz jest właścicielem
            kodHTML += `
            <h3><span class="czerwony">Ilość domków: ${obecnePole.domek}</span></h3>
            <h3><span class="czerwony">Aktualny czynsz: ${obecnePole.czynsz}$</span></h3>
            <div class="guziki">
                <div class="guzik akcja" id="kup">Kup domek</div>
                <div class="guzik akcja" id="koniec">Zakończ ruch</div>
            </div>`;

            $('#okienko').html(kodHTML);
            wyswietlOkienko();

            $('#koniec').click(function () {
                schowajOkienko();
                wyswietlAkcje();
                $('#koniec').off();
            });
            if (!obecny.czyPieniadze(200) && obecnePole.domek < 6) $('#kup').addClass('nieaktywny');
            else {
                $('#kup').click(function () {
                    console.log('click');
                    obecny.kupDomek(obecny.pozycja);
                    schowajOkienko();
                    wyswietlAkcje();
                    $('#kup').off();
                });
            }
            break;
        case 3:
            //Właścicielem pola jest inny gracz
            kodHTML += `
            <h3><span class="czerwony">Czynsz: ${obecnePole.czynsz}$</span></h3>
            <div class="guziki">
                <div class="guzik akcja" id="zaplac">Zapłać czynsz</div>
                <div class="guzik akcja" id="zarzadzaj">Zarządzaj nieruchomościami</div>
                <div class="guzik akcja" id="wymiana">Wymień się</div>
            </div>`;

            $('#okienko').html(kodHTML);
            wyswietlOkienko();

            if (!obecny.czyPieniadze(obecnePole.czynsz)) $('#zaplac').addClass('nieaktywny');
            else {
                $('#zaplac').click(function () {
                    obecny.zaplacCzynsz(obecny.pozycja);
                    schowajOkienko();
                    wyswietlAkcje();
                    $('#zaplac').off();
                });
            }
            break;
        case 4:
            //Pole doboru kart
            var wylosowanaKarta = karta[losujKarte()];

            kodHTML += `
            <h3>${wylosowanaKarta.tekst}</h3>
            <div class="kontynuuj" id="dalej">Kontynuuj</div>`;

            $('#okienko').html(kodHTML);
            wyswietlOkienko();

            $('#dalej').click(function () {
                wylosowanaKarta.wykonaj();
                schowajOkienko();
                wyswietlAkcje();
                $('#dalej').off();
            });
            break;
        default:
            alert('Błąd! Odśwież stronę!');
            break;
    }
};

const losujKarte = () => {
    const iloscKart = karta.length - 1;
    return Math.round(Math.random() * iloscKart);
};

const doWiezienia = () => {
    obecny.zmianaPozycji(0, 0, 10);
    przesunPionek(obecny);
    obecny.wiezienie = 3;
};

const licytujPole = (licytowane) => {
    const licytowanePole = pole[licytowane];
    let zaklad = 0;
    let uczestnicy = [...kolejnosc];
    let teraz = kto;
    let licytator = gracz[uczestnicy[teraz]];
    let ile_uczestnikow = liczba_graczy;
    let LicytatorNazwa = `<span style="color: ${licytator.kolor}">${licytator.nazwa}</span>`;

    zablokowany = true;

    $('#okienko').html(
        `<h1><span class="czerwony">${licytowanePole.nazwa}</span></h1>
        <h3 class="zaklad">Aktualna oferta: <span class="czerwony">${zaklad}$</span></h3>
        <h3 class="licytator">Obecny licytator: ${LicytatorNazwa}</h3>
        <div class="guziki">
            <div class="guzik kwota" id="kwota1"><p>1$</p></div>
            <div class="guzik kwota" id="kwota10"><p>10$</p></div>
            <div class="guzik kwota" id="kwota50"><p>50$</p></div>
            <div class="guzik kwota" id="kwota100"><p>100$</p></div>
            <div class="guzik kwota" id="kwota0"><p>Pas</p></div>
        </div>`
    );
    wyswietlOkienko();

    $('.guzik').click(function () {
        const kwota = parseInt(this.id.replace('kwota', ''));
        const index = uczestnicy.indexOf(gracz.findIndex((gracz) => gracz.nazwa === licytator.nazwa));

        if (kwota !== 0) {
            if (!licytator.czyPieniadze(zaklad + kwota)) {
                alert('nie masz tyle pieniedzy');
            } else {
                zaklad += kwota;
                $('.zaklad').html(`Aktualna oferta: <span class="czerwony">${zaklad}$</span>`);
            }
        } else {
            index > -1 ? (uczestnicy[index] = -1) : alert('Błąd! Odśwież stronę');
            ile_uczestnikow--;
        }
        do {
            teraz + 1 > liczba_graczy - 1 ? (teraz = 0) : teraz++;
        } while (uczestnicy[teraz] == -1);

        //Koniec licytacji - ekran wygranej
        licytator = gracz[uczestnicy[teraz]];
        LicytatorNazwa = `<span style="color: ${licytator.kolor}">${licytator.nazwa}</span>`;

        $('.licytator').html(`Obecny licytator: ${LicytatorNazwa}</span>`);
        if (ile_uczestnikow === 1) {
            $('#okienko').html(`
            <h1><span class="czerwony">${licytowanePole.nazwa}</span></h1>
            <h3>Zwycięzcą licytacji jest ${LicytatorNazwa}</span>!</h3>
            <h3>Najwyższa oferta: <span class="czerwony">${zaklad}$</span></h3>
            <div class="kontynuuj">Kontynuuj</div>
            `);

            licytator.dodajPosiadane(licytowane);
            licytator.odejmijPieniadze(zaklad);

            $('.kontynuuj').click(function () {
                schowajOkienko();
                zablokowany = false;
                $('.kontynuuj').off();
                wyswietlAkcje();
            });
        }
    });
};
