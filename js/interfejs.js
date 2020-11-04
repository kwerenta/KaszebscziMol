const maksymalna_liczba_graczy = 6;
let liczba_graczy = gracz.length; //TYMCZASOWO zamiast 2
let zablokowany = true;
let aktywnynr = 0;
const kolejnosc = [];

//Ukrywanie ekranu ładowania/głównego
const menu = () => {
    const tlo = document.querySelector('.menu');
    TweenMax.to(tlo, 3, { y: '-100%', display: 'none' })
};

//Animacja wzoru kaszubskiego
const animacjaWzor = () => {
    const tl = new TimelineMax();
    const obiekt = document.getElementById('wzor').contentDocument;
    const wzor = document.getElementById('wzor');

    const wszystko = obiekt.querySelectorAll('g[id^="g"]');
    const inne = obiekt.querySelectorAll(
        'g[id^="g"]:not([class^="ped"]):not([class^="srodek"]):not([class^="lodyga"])'
    );
    const srodek = obiekt.querySelectorAll('.srodek');
    const lodygaPrawa = obiekt.getElementById('g88');
    const lodygaLewa = obiekt.getElementById('g1876');
    const pedyPrawe = obiekt.querySelectorAll('.pedPrawy');
    const pedyLewe = obiekt.querySelectorAll('.pedLewy');

    const startAnimacja = document.querySelector('.startAnimacja');
    const start = document.querySelector('.kontynuuj.start');

    tl.set(wszystko, { opacity: 0 })
        .set([srodek, wzor], { opacity: 1 })
        .from(srodek, 2, { y: 500, ease: Elastic.easeOut.config(1, 0.75), onComplete: animacjaNapis })
        .set([lodygaPrawa, lodygaLewa], { opacity: 1 })
        .from(lodygaPrawa, 2, {
            scale: 0,
            transformOrigin: 'left top',
            rotate: -20,
            ease: Power3.easeOut,
        })
        .from(lodygaLewa, 2, {
            scale: 0,
            rotate: 20,
            transformOrigin: 'right top',
            ease: Power3.easeOut,
            delay: -2,
        })
        .set([pedyPrawe, pedyLewe], { opacity: 1 })
        .from([pedyPrawe, pedyLewe], 1.5, { scale: 0, ease: Power3.easeOut })
        .staggerFromTo(
            inne,
            0.05,
            { opacity: 0, scale: 0.5, delay: 1 },
            { opacity: 1, scale: 1, stagger: { amount: 4, from: 'center' } }
        )
        .set(startAnimacja, { display: 'block', y: -210 })
        .fromTo(
            startAnimacja,
            1,
            { x: '-50%', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ee1919' },
            {
                x: '-50%',
                y: -50,
                ease: Elastic.easeOut.config(1, 0.5),
            }
        )
        .to(startAnimacja, 1, { width: '150px', height: '65px', borderRadius: '15px', backgroundColor: '#00497C' })
        .to(start, 0.5, { opacity: 1, display: 'block' })
        .to(startAnimacja, 0.2, { opacity: 0, display: 'none', delay: 0.5 });
};
//Animacja logo (napisu)
const animacjaNapis = () => {
    const fontSize = 72;
    const vara = new Vara(
        '.napis',

        'js/fonts/Satisfy/SatisfySL.json',

        [
            {
                text: 'K',
                duration: 650,
                x: -190,
                y: 5,
                color: '#00497c',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 'a',
                y: 50,
                x: -140,
                color: '#1f8ab2',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 's',
                y: 50,
                x: -105,
                color: '#72c5dd',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 'z',
                y: 55,
                x: -70,
                color: '#fad247',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 'ë',
                y: 35,
                x: -20,
                color: '#ee1919',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 'b',
                y: 30,
                x: 30,
                color: '#ee1919',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 's',
                y: 50,
                x: 65,
                color: '#fad247',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 'c',
                y: 55,
                x: 110,
                color: '#72c5dd',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 'z',
                y: 55,
                x: 150,
                color: '#1f8ab2',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 'i',
                y: 35,
                x: 195,
                color: '#00497c',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 'M',
                duration: 650,
                y: 120,
                x: -60,
                color: '#1f8ab2',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 'ó',
                y: 140,
                x: 0,
                color: '#fad247',
                fromCurrentPosition: { y: false, x: false },
            },
            {
                text: 'l',
                y: 140,
                x: 30,
                color: '#ee1919',
                fromCurrentPosition: { y: false, x: false },
            },
        ],
        {
            strokeWidth: 3,
            color: '#000',
            fontSize: fontSize,
            textAlign: 'center',
            duration: 400,
        }
    );
};

const wyswietlOkienko = (element = '#okienko') => {
    TweenMax.fromTo(
        element,
        1,
        {
            visibility: 'hidden',
            opacity: 0,
            scale: 0.5,
        },
        {
            visibility: 'visible',
            opacity: 1,
            scale: 1,
            transformOrigin: 'center center',
            ease: Elastic.easeOut.config(1, 0.5),
        }
    );
};
const schowajOkienko = (element = '#okienko') => {
    const ustawHidden = () => {
        TweenMax.set(element, { visibility: 'hidden' });
    };
    TweenMax.fromTo(
        element,
        1,
        {
            visibility: 'visible',
            opacity: 1,
            scale: 1,
        },
        {
            opacity: 0,
            scale: 0.5,
            transformOrigin: 'center center',
            onComplete: ustawHidden,
            ease: Back.easeInOut.config(4),
        }
    );
};

//Przejście do ekranu przygotowywania rozgrywki
$('.kontynuuj.start').click(function () {
    menu();
    wyswietlKolejnosc();
    $('.kontynuuj.start').off();
});

//Dodanie kolejnego gracza
$('.gracz.dodaj').click(function () {
    if (!zablokowany) {
        zablokowany = true;
        gracz[liczba_graczy] = new Gracz();
        liczba_graczy++;
        zmienEkran('.gracz.dodaj', `.gracz.dodaj, .gracz.nr${liczba_graczy}`);
        setTimeout(function () {
            zablokowany = false;
            if (liczba_graczy >= maksymalna_liczba_graczy) {
                $('.gracz.dodaj').css('display', 'none');
            }
        }, 500);
    }
});

//Oznaczenie wybranego gracza aktywnym do edycji oraz wczytanie jego ustawień do pól wyboru
$('.gracz').click(function () {
    if ($(this).attr('class') != 'gracz dodaj' && !$(this).hasClass('aktywny')) {
        const id = $(this).attr('class');
        aktywnynr = parseInt(id.substr(id.length - 1)) - 1; //Zamiana klasy na numer gracza

        $('.gracz.aktywny').removeClass('aktywny');
        $(this).addClass('aktywny');
        $('#nazwa_gracza, #wyb_kolor, #wyb_awatar').removeAttr('disabled');

        $('#nazwa_gracza').val(gracz[aktywnynr].nazwa);
        $('#wyb_kolor').val(gracz[aktywnynr].kolor);
    }
});

//Zmiana nazwy gracza
$('#nazwa_gracza').on('focusout keydown', function (e) {
    const nazwa = $(this).val();
    e.preventDefault();
    if (e.type === 'focusout' || e.keyCode === 13) {
        if (nazwa != '' && nazwa.length > 2) {
            $('.aktywny h2').html(nazwa);
            gracz[aktywnynr].nazwa = nazwa;
        }
    }
    if (e.keyCode === 13) $(this).blur();
});

//Zmiana koloru gracza
$('#wyb_kolor').on('change click', function () {
    const kolor = $(this).children('option:selected').val();
    $('.aktywny .kolor').css('background-color', kolor);
    $('.aktywny h4').css('color', kolor);
    gracz[aktywnynr].kolor = kolor;
});

//Weryfikacja wprowadzonych danych i przejście do ekranu rozgrywki
$('.graj#start').click(function () {
    /* WERYFIKACJA DANYCH
    gracz.forEach(gracz => {
        if(gracz.kolor === "rgb(245, 246, 250)") $("#blad h3").html("Nie wybrano koloru dla co najmniej jednego gracza!");
        else if(gracz.nazwa === undefined) $("#blad h3").html("Nie ustawiono nazwy dla co najmniej jednego gracza!");
        else $("#blad h3").html("");
    }); */

    if ($('#blad h3').text() == '') {
        $('body').css('background-color', '#353b48');
        wyswietlKolejnosc();
    }
});

//Wyświetlanie powiększania najechanej karty
let licznik;
$('.pole').hover(
    function () {
        if (!zablokowany) {
            clearTimeout(licznik);
            $('#powiekszenie').html(`<h3>${this.id}</h3>`);
            wyswietlOkienko('#powiekszenie');
        }
    },
    function () {
        if (!zablokowany) {
            licznik = setTimeout(function () {
                schowajOkienko('#powiekszenie');
            }, 300);
        }
    }
);

function wyswietlKolejnosc() {
    wyswietlOkienko('#okno');
    zablokowany = true;
    $('#okno').html(function () {
        let lista = '';
        // Losowanie kolejności graczy
        while (kolejnosc.length < liczba_graczy) {
            let losowa = Math.floor(Math.random() * liczba_graczy);
            if (kolejnosc.indexOf(losowa) === -1) kolejnosc.push(losowa);
        }
        // Tworzenie graficznej listy graczy 
        for (i = 0; i < liczba_graczy; i++) {
            const nr = kolejnosc[i];
            let wielkosc = '';
            // Zmiana wielkości czcionki w zależności od długości nazwy
            gracz[nr].nazwa.length > 11 ? (wielkosc = 'font-size: 14px;') : (wielkosc = '');
            lista += `<li style="background-color:${gracz[nr].kolor}; ${wielkosc}">
            ${gracz[nr].nazwa}<h1 class="numer">${i + 1}</h1></li>`;
        }
        ustawPionki();
        pomalujPola();
        return `<h1 class="tytul" style="color: #00497c;">Kolejność startu:</h1><ol>${lista}</ol><div class="kontynuuj">Kontynuuj</div>`;
    });
    $('.kontynuuj').click(function () {
        schowajOkienko('#okno');
        zablokowany = false;
        wyswietlAkcje();
        $('.kontynuuj').off();
    });
}
$('.menu').css('display','none');
wyswietlKolejnosc();