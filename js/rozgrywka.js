function Gracz(nazwa, kolor = 'rgb(245, 246, 250)', awatar) {
    this.nazwa = nazwa;
    this.kolor = kolor;
    this.awatar = awatar;

    this.pieniadze = 1500;
    this.pozycja = 0;
    this.wiezienie = 0;
    this.dublet = 0;

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
        if (this.czyPieniadze(pole[ktore].cenaDomek)) {
            this.odejmijPieniadze(pole[ktore].cenaDomek);
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
gracz[0] = new Gracz('SzesnaścieZnaków', 'rgb(41, 128, 185)');
gracz[1] = new Gracz('Dwanaście123', 'rgb(142, 68, 173)');
gracz[2] = new Gracz('Zbigniew', 'rgb(39, 174, 96)');
gracz[3] = new Gracz('Bronisław', 'rgb(230, 126, 34)');
gracz[4] = new Gracz('Kazimierz', 'rgb(192, 57, 43)');
gracz[5] = new Gracz('Wacław', 'rgb(127, 140, 141)');

let kostka1;
let kostka2;
let tura = 0;
let kto = 0;
let aktualny = 0;
let obecny;

const pomalujPola = () => {
    pole.forEach(({ kolor }, index) => {
        $(`#p${index}`).append('<div class="poleKolor"></div>');
        $(`#p${index} .poleKolor`).css('background-color', kolor);
    });
};
const ustawPionki = () => {
    gracz.forEach(({ nazwa, kolor }) => {
        $('#p0').append(`<div class="pionek pionek${nazwa}" style="background-color:${kolor};"></div>`);
    });
};

const przesunPionek = ({ nazwa, kolor, pozycja }) => {
    let pionek = document.querySelector(`.pionek${nazwa}`);
    let lokalizacja = pionek.getBoundingClientRect();
    let left = Math.round(lokalizacja.left);
    let top = Math.round(lokalizacja.top);

    $(`.przesuwanyPionek${nazwa}`).remove();
    $('body').append(
        `<div class="pionek przesuwanyPionek${nazwa}" style="background-color:${kolor}; top:${top}px; left:${left}px; position: absolute;"></div>`
    );
    $(`.pionek${nazwa}`).remove();

    $(`#p${pozycja}`).append(
        `<div class="pionek pionek${nazwa}" style="background-color:${kolor}; visibility: hidden;"></div>`
    );

    pionek = document.querySelector(`.pionek${nazwa}`);
    lokalizacja = pionek.getBoundingClientRect();
    left = Math.round(lokalizacja.left);
    top = Math.round(lokalizacja.top);
    const przesun = document.querySelector(`.przesuwanyPionek${nazwa}`);
    const czas = (kostka1 + kostka2) * 0.3;

    const tl = new TimelineMax();
    tl.set(przesun, { display: 'block' })
        .to(przesun, czas, { top: `${top}px`, left: `${left}px` })
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

const losujKarte = () => {
    const iloscKart = karta.length - 1;
    return Math.round(Math.random() * iloscKart);
};

const doWiezienia = () => {
    obecny.zmianaPozycji(0, 0, 10);
    przesunPionek(obecny);
    obecny.wiezienie = 3;
};

const wyswietlAkcje = () => {
    aktualny = kolejnosc[kto];
    obecny = gracz[aktualny];
    const obecnePole = pole[obecny.pozycja];
    let kolorInf = '';

    zablokowany = true;
    setTimeout(() => {
        $('#okienko').css('border-color', obecny.kolor);
    }, 150);
    setTimeout(() => {
        $('#okno').css('border-color', obecny.kolor);
    }, 300);

    if (['#f5f6fa', '#AAE0FA', '#FEF200'].includes(obecnePole.kolor)) kolorInf = 'color: #00497c;';
    const okienkoHTML = `<h1 class="tytul" style="background-color: ${obecny.kolor}">${obecny.nazwa}</h1>
    <div class="informacje">
        <div class="informacja stanKonta">
            <h3>${obecny.pieniadze}</h3><h1 class="numer">$</h1>
            <div class="ikona pieniadze"><i class="fas fa-wallet"></i></div>
        </div>
        <div class="informacja obecnePole" style="background-color: ${obecnePole.kolor}; ${kolorInf}">
            <h3>${obecnePole.nazwa}<h3>
        </div>
    </div>`;

    //Wyświetlenie okna akcji gracza

    if (obecny.wiezienie == 0) {
        $('#okienko').html(
            `${okienkoHTML}
            <div class="przyciski">
                <div class="przycisk akcja" id="rzut">
                    <h3>Rzut koścmi</h3>
                    <div class="ikona akcja rzut">
                        <i class="fas fa-dice"></i>
                    </div>
                </div>
                <div class="przycisk akcja" id="zarzadzaj">
                    <h3>Zarządzanie</h3>
                    <div class="ikona akcja zarzadzaj">
                        <i class="fas fa-edit"></i>
                    </div>
                </div>
                <div class="przycisk akcja" id="wymiana">
                    <h3>Wymiana</h3>
                    <div class="ikona akcja wymiana">
                        <i class="fas fa-exchange-alt"></i>
                    </div>
                </div>
            </div>`
        );

        wyswietlOkienko();

        $('#rzut').click(function () {
            schowajOkienko();
            wyswietlKosci();
        });
        $('#zarzadzaj').click(function () {
            wyswietlZarzadzaj();
        });
        $('#wymiana').click(function () {
            wyswietlWymiane();
        });
    } else {
        obecny.wiezienie--;
        $('#okienko').html(
            `${okienkoHTML}
            <h3 id="wiezienieTury">Liczba tur do wyjścia z więzienia: ${obecny.wiezienie}<h3>
            <div class="przyciski">
            <div class="przycisk akcja" id="dublet">
                <h3>Rzut koścmi</h3>
                <div class="ikona akcja rzut">
                    <i class="fas fa-dice"></i>
                </div>
            </div>
            <div class="przycisk akcja" id="kaucja">
                <h3>Zapłata kaucji</h3>
                <div class="ikona akcja wymiana">
                    <i class="fas fa-file-invoice-dollar"></i>
                </div>
            </div>
        </div>`
        );
        if (obecny.wiezienie == 0) $('#wiezienieTury').text('Wychodzisz z więzenia!');
        wyswietlOkienko();

        $('#dublet').click(function () {
            schowajOkienko();
            wyswietlKosci();
        });
        if (!obecny.czyPieniadze(50)) $('#kaucja').addClass('nieaktywny');
        else {
            $('#kaucja').click(function () {
                obecny.odejmijPieniadze(50);
                obecny.wiezienie = 0;
                schowajOkienko();
                wyswietlKosci();
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

const wyswietlZarzadzaj = () => {
    let lista = '';
    obecny.posiadane.forEach((numer) => {
        const nieruchomosc = pole[numer];
        lista += `
        <div class="posiadany" id="${numer}">
            <div class="kolor" style="background-color: ${nieruchomosc.kolor};"></div>
            <h3 class="nazwa">${nieruchomosc.nazwa}</h3>
            <div class="przyciski">
                <div class="przycisk zarzadzaj" id="kup${numer}">
                    <h3>Zakup domku</h3>
                    <h3>${nieruchomosc.cenaDomek}$</h3>
                    <div class="ikona akcja zakup">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
                <div class="przycisk zarzadzaj" id="zastaw${numer}">
                    <h3>Zastaw</h3>
                    <h3>${nieruchomosc.hipoteka}$</h3>
                    <div class="ikona akcja zakup">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
            </div>
        </div>`;
    });

    $('#okno').html(`
    <h1 class="tytul" style="background-color: ${obecny.kolor}">${obecny.nazwa}</h1>
    <div class="informacje">
        <div class="informacja stanKonta">
            <h3>${obecny.pieniadze}</h3><h1 class="numer">$</h1>
            <div class="ikona pieniadze"><i class="fas fa-wallet"></i></div>
        </div>
        <div class="przycisk akcja" id="bankructwo">
            <h3>Bankructwo<h3>
        </div>
    </div>
    <div class="posiadane">
        ${lista}
    </div>
    <div class="kontynuuj" id="wroc">Wróć</div>`);
    wyswietlOkienko('#okno');

    $('#wroc').click(function () {
        schowajOkienko('#okno');
        $('#wroc').off();
    });
};

const wyswietlKosci = () => {
    const cyfry = ['one', 'two', 'three', 'four', 'five', 'six'];

    rzutKoscmi();

    const ikona1 = `<i class="fas fa-dice-${cyfry[kostka1 - 1]}"></i>`;
    const ikona2 = `<i class="fas fa-dice-${cyfry[kostka2 - 1]}"></i>`;

    let kolorDublet = 'color: ';
    obecny.dublet == 1
        ? (kolorDublet += '#fad247;')
        : obecny.dublet == 2
        ? (kolorDublet += '#ee1919;')
        : (kolorDublet += '#fff;');

    let dublet;
    czyDublet() ? (dublet = `<h3 style="${kolorDublet}">Dublet!</h3>`) : (dublet = '');

    wyswietlOkienko();

    $('#okienko').html(
        `<h1 class="tytul" style="background-color: ${obecny.kolor}">${obecny.nazwa}</h1>
        <div class="informacje">
            <div class="informacja wylosowano">
                <h3>Przesuwasz się o ${kostka1 + kostka2}</h3>
                ${dublet}
            </div>
            <div class="informacja kosci">
                <div class="ikona kosci">
                    ${ikona1}
                    ${ikona2}
                </div>
            </div>
        </div>
        <div class="kontynuuj">Kontynuuj</div>`
    );

    $('.kontynuuj').click(() => {
        schowajOkienko();
        wykonajRuch();
    });
};

const wykonajRuch = () => {
    const nieZakup = [0, 2, 4, 7, 10, 17, 20, 22, 30, 33, 36, 38];
    const poleKarty = [2, 7, 17, 22, 33, 36];

    if (!czyDublet()) {
        obecny.dublet = 0;
        kto++;
        if (kto > liczba_graczy - 1) {
            kto = 0;
            tura++;
        }
    } else obecny.dublet++;

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
    let kolorInf = '';
    if (['#f5f6fa', '#AAE0FA', '#FEF200'].includes(obecnePole.kolor)) kolorInf = 'color: #00497c;';
    let kodHTML = `
    <h1 class="tytul" style="background-color: ${obecny.kolor}">${obecny.nazwa}</h1>
    <div class="informacje">
        <div class="informacja stanKonta">
            <h3>${obecny.pieniadze}</h3><h1 class="numer">$</h1>
            <div class="ikona pieniadze"><i class="fas fa-wallet"></i></div>
        </div>
        <div class="informacja obecnePole" style="background-color: ${obecnePole.kolor}; ${kolorInf}">
            <h3>${obecnePole.nazwa}<h3>
        </div>
    </div>`;

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
                ? (kodHTML += `<h3 class="kartaTekst">Trafiasz do żukowa na 3 tury. Podczas swojej tury możesz spróbować wyrzucić dublet lub zapłacić kaucję w wysokości 50$.</h3>`)
                : obecny.wiezienie == 0
                ? (kodHTML += `<h3 class="kartaTekst">Totalna czilera</h3>`)
                : (kodHTML += `<h3 class="kartaTekst">Nie udało Ci się trafić dubletu. Pozostajesz w Żukowie.</h3>`);

            kodHTML += `<div class="kontynuuj" id="dalej">Kontynuuj</div>`;

            $('#okno').html(kodHTML);
            wyswietlOkienko('#okno');

            $('#dalej').click(function () {
                if (obecny.pozycja == 30 && obecny.wiezienie == 0) doWiezienia();
                schowajOkienko('#okno');
                wyswietlAkcje();
                $('#dalej').off();
            });
            break;
        case 1:
            //Pole bez właściciela
            kodHTML += `
            <div class="przyciski">
                <div class="przycisk akcja" id="kup">
                    <h3>Zakup pola</h3>
                    <div class="ikona akcja zakup">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
                <div class="przycisk akcja" id="licytuj">
                    <h3>Licytacja</h3>
                    <div class="ikona akcja licytacja">
                        <i class="fas fa-file-invoice-dollar"></i>
                    </div>
                </div>
            </div>`;

            $('#okienko').html(kodHTML);
            wyswietlOkienko();

            $('.informacja.obecnePole').append(`<h3 class="dodatkowa">Cena: ${obecnePole.cena}$</h3>`);

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
            <div class="przyciski">
                <div class="przycisk akcja" id="kup">
                    <h3>Zakup domku</h3>
                    <h3>${obecnePole.cenaDomek}$</h3>
                    <div class="ikona akcja zakup">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
                <div class="przycisk akcja" id="koniec">
                    <h3>Zakończenie ruchu</h3>
                    <div class="ikona akcja zakonczenie">
                        <i class="fas fa-step-forward"></i>
                    </div>
                </div>
            </div>`;

            $('#okienko').html(kodHTML);
            wyswietlOkienko();

            $('.informacja.obecnePole').append(
                `<h3 class="dodatkowa">Czynsz: ${obecnePole.czynsz}$ | Ilość domków: ${obecnePole.domek}</i></h3>`
            );

            $('#koniec').click(function () {
                schowajOkienko();
                wyswietlAkcje();
                $('#koniec').off();
            });
            if (!obecny.czyPieniadze(obecnePole.cenaDomek) && obecnePole.domek < 6) $('#kup').addClass('nieaktywny');
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
            <div class="przyciski">
                <div class="przycisk akcja" id="zaplac">
                    <h3>Zapłata czynszu</h3>
                    <div class="ikona akcja zakup">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
                <div class="przycisk akcja" id="zarzadzaj">
                    <h3>Zarządzanie</h3>
                    <div class="ikona akcja zarzadzaj">
                        <i class="fas fa-edit"></i>
                    </div>
                </div>
                <div class="przycisk akcja" id="wymiana">
                    <h3>Wymiana</h3>
                    <div class="ikona akcja wymiana">
                        <i class="fas fa-exchange-alt"></i>
                    </div>
                </div>
            </div>`;

            $('#okienko').html(kodHTML);
            wyswietlOkienko();

            $('.informacja.obecnePole').append(`<h3 class="dodatkowa">Czynsz: ${obecnePole.czynsz}$</h3>`);

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
            const wylosowanaKarta = karta[losujKarte()];

            kodHTML += `
            <h3 class="kartaTekst">${wylosowanaKarta.tekst}</h3>
            <div class="kontynuuj" id="dalej">Kontynuuj</div>`;

            $('#okno').html(kodHTML);
            wyswietlOkienko('#okno');

            $('#dalej').click(function () {
                wylosowanaKarta.wykonaj();
                schowajOkienko('#okno');
                wyswietlAkcje();
                $('#dalej').off();
            });
            break;
        default:
            alert('Błąd! Odśwież stronę!');
            break;
    }
};

const licytujPole = (licytowane) => {
    const licytowanePole = pole[licytowane];
    let zaklad = 0;
    let uczestnicy = [...kolejnosc];
    let teraz = kto;
    let licytator = gracz[uczestnicy[teraz]];
    let ile_uczestnikow = liczba_graczy;

    zablokowany = true;

    $('#okienko').css('border-color', licytowanePole.kolor);

    $('#okienko').html(
        `
        <h1 class="tytul" style="background-color: ${licytowanePole.kolor}">${licytowanePole.nazwa}</h1>
        <div class="informacje">
            <div class="informacja licytator">
                <h3 class="licytatorNazwa">${licytator.nazwa}</h3>
                <h1 class="licytatorPieniadze">${licytator.pieniadze}$</h1>
                <div class="ikona czlowiek"><i class="fas fa-user"></i></div>
            </div>
            <div class="informacja obecnePole" style="background-color: ${licytowanePole.kolor}; flex: 1;">
                <h3 class="dodatkowa">Aktualna oferta</h3>
                <h1 class="zaklad">${zaklad}$</h1>
            </div>
        </div>
        <div class="przyciski">
            <div class="przycisk kwota" id="kwota1">
                <h3>1</h3>
                <div class="ikona dolar"><i class="fas fa-dollar-sign"></i></div>
            </div>
            <div class="przycisk kwota" id="kwota10">
                <h3>10</h3>
                <div class="ikona dolar"><i class="fas fa-dollar-sign"></i></div>
            </div>
            <div class="przycisk kwota" id="kwota50">
                <h3>50</h3>
                <div class="ikona dolar"><i class="fas fa-dollar-sign"></i></div>
            </div>
            <div class="przycisk kwota" id="kwota100">
                <h3>100</h3>
                <div class="ikona dolar"><i class="fas fa-dollar-sign"></i></div>
            </div>
            <div class="przycisk kwota" id="kwota0">
                <h3>Pas</h3>
                <div class="ikona akcja zakonczenie"><i class="fas fa-step-forward"></i></div>
            </div>
        </div>`
    );
    wyswietlOkienko();

    $('.przycisk.kwota').each(function () {
        const wartosc = parseInt(this.id.replace('kwota', ''));
        if (!licytator.czyPieniadze(zaklad + wartosc) && wartosc > 0) $(`#kwota${wartosc}`).addClass('nieaktywny');
    });

    $('.przycisk').click(function () {
        const kwota = parseInt(this.id.replace('kwota', ''));
        const index = uczestnicy.indexOf(gracz.findIndex((gracz) => gracz.nazwa === licytator.nazwa));

        if (kwota !== 0) {
            if (licytator.czyPieniadze(zaklad + kwota)) {
                do {
                    teraz + 1 > liczba_graczy - 1 ? (teraz = 0) : teraz++;
                } while (uczestnicy[teraz] == -1);
                zaklad += kwota;
                $('.zaklad').html(`${zaklad}$`);
            }
        } else {
            index > -1 ? (uczestnicy[index] = -1) : alert('Błąd! Odśwież stronę');
            ile_uczestnikow--;
            do {
                teraz + 1 > liczba_graczy - 1 ? (teraz = 0) : teraz++;
            } while (uczestnicy[teraz] == -1);
        }

        licytator = gracz[uczestnicy[teraz]];
        $('.licytatorNazwa').html(licytator.nazwa);
        $('.licytatorPieniadze').html(licytator.pieniadze + '$');

        $('.przycisk.kwota').each(function () {
            const wartosc = parseInt(this.id.replace('kwota', ''));
            if (!licytator.czyPieniadze(zaklad + wartosc) && wartosc > 0) $(`#kwota${wartosc}`).addClass('nieaktywny');
            else $(`#kwota${wartosc}`).removeClass('nieaktywny');
        });

        //Koniec licytacji - ekran wygranej
        if (ile_uczestnikow === 1) {
            $('#okienko').html(`
            <h1 class="tytul" style="background-color: ${licytowanePole.kolor}">${licytowanePole.nazwa}</h1>
            <div class="informacje">
                <div class="informacja licytator">
                    <h3 class="dodatkowa">Zwycięzca</h3>
                    <h3 class="licytatorNazwa">${licytator.nazwa}</h3>
                    <div class="ikona czlowiek"><i class="fas fa-user"></i></div>
                </div>
                <div class="informacja obecnePole" style="background-color: ${licytowanePole.kolor}; flex: 1;">
                    <h3 class="dodatkowa">Zwycięska oferta</h3>
                    <h1 class="zaklad">${zaklad}$</h1>
                </div>
            </div>
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
