function Gracz(nazwa, kolor = 'rgb(245, 246, 250)', awatar) {
    this.nazwa = nazwa;
    this.kolor = kolor;
    this.awatar = awatar;
    this.pieniadze = 1500;
    this.pozycja = 0;

    this.posiadane = [];

    this.zmianaPozycji = (kostka1, kostka2) => {
        this.pozycja += kostka1 + kostka2;
        if (this.pozycja > 39) {
            this.pozycja -= 40;
            this.dodajPieniadze(200);
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
        }
    };
    this.przesunPionek = (gdzie) => {};
}

let gracz = [];
gracz[0] = new Gracz('Kamil', 'rgb(0, 151, 230)');
gracz[1] = new Gracz('Andrzej', 'rgb(232, 65, 24)');
gracz[2] = new Gracz('Zbigniew', 'rgb(68, 189, 50)');
// gracz[3] = new Gracz('Bronisław', 'rgb(225, 177, 44)');
// gracz[4] = new Gracz('Kazimierz', 'rgb(140, 122, 230)');
// gracz[5] = new Gracz('Wacław', 'rgb(119, 140, 163)');

let kostka1;
let kostka2;
let tura = 0;
let kto = 0;
let aktualny = 0;
let obecny;

const pomalujPola = () => {
    pole.forEach(({ kolor }, index) => {
        $('.pole::before').css('contet', 'XDD');
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

const zmianaGracza = () => {
    aktualny = kolejnosc[kto];
    obecny = gracz[aktualny];
    rzutKoscmi();
    obecny.zmianaPozycji(kostka1, kostka2);
    przesunPionek(obecny);

    kto++;
    if (kto > liczba_graczy - 1) {
        kto = 0;
        tura++;
    }

    if (![0, 10, 20, 30, 38].includes(obecny.pozycja)) {
        if (!pole[obecny.pozycja].czyWlasciciel(aktualny)) {
            if (pole[obecny.pozycja].wlasciciel == -1) {
                //licytujPole(obecny.pozycja);
            } else {
                alert('wlascicielem jest inny gracz');
            }
        } else {
            alert('jesteś właścicielem');
        }
    } else if (obecny.pozycja == 38) {
        alert('trafiłeś na pole 38');
    }
};

const licytujPole = (licytowane) => {
    let zaklad = 0;
    let uczestnicy = [...kolejnosc];
    let teraz = kto;
    let licytator = gracz[uczestnicy[teraz]];
    let ile_uczestnikow = liczba_graczy;

    zablokowany = true;

    zmienEkran(undefined, '#okienko');
    $('#okienko').html(
        `<h3 class="kwota">Aktualna kwota to ${zaklad}$</h3><h3 class="licytator">Aktualny licytator to ${licytator.nazwa}</h3><div class="guzik" id="kwota1">1</div><div class="guzik" id="kwota10">10</div><div class="guzik" id="kwota50">50</div><div class="guzik" id="kwota100">100</div><div class="guzik" id="pas">Pas</div>`
    );

    $('.guzik').click(function () {
        const kwota = parseInt(this.id.replace('kwota', ''));
        const index = uczestnicy.indexOf(gracz.findIndex((gracz) => gracz.nazwa === licytator.nazwa));

        if (this.id != 'pas') {
            if (!licytator.czyPieniadze(zaklad + kwota)) {
                alert('nie masz tyle pieniedzy');
            } else {
                zaklad += kwota;
                $('.kwota').html(`Aktualna kwota to ${zaklad}$`);
            }
        } else {
            index > -1 ? (uczestnicy[index] = -1) : alert('Błąd! Odśwież stronę');
            ile_uczestnikow--;
        }
        do {
            teraz + 1 > liczba_graczy - 1 ? (teraz = 0) : teraz++;
        } while (uczestnicy[teraz] == -1);

        licytator = gracz[uczestnicy[teraz]];
        $('.licytator').html(`Aktualny licytator to ${licytator.nazwa}`);
        if (ile_uczestnikow === 1) {
            $('#okienko').html(`<h3>${licytator.nazwa} jest zwycięzcą licytacji!</h3>`);
            licytator.dodajPosiadane(licytowane);
            licytator.odejmijPieniadze(zaklad);
        }
    });
};
