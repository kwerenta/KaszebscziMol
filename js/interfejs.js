const maksymalna_liczba_graczy = 6;
let liczba_graczy = 3; //TY^MCZASOWO 3 zamiast 2
let zablokowany = false;
let aktywnynr = 0;
const kolejnosc = [];

const zmienEkran = (doSchowania, doPokazania, czas = 500) => {
    $(`${doSchowania}, ${doPokazania}`).css('transition', `${czas / 1000}s`);
    $(`${doSchowania}, ${doPokazania}`).css('-moz-transition', `${czas / 1000}s`);
    $(`${doSchowania}, ${doPokazania}`).css('-webkit-transition', `${czas / 1000}s`);
    $(doSchowania).css('opacity', '0');
    setTimeout(function () {
        $(doSchowania).css('display', 'none');
        $(doPokazania).css('display', 'flex');
    }, czas);
    setTimeout(function () {
        $(doPokazania).css('opacity', '1');
    }, czas + 20);
};
//Przejście do ekranu przygotowywania rozgrywki
$('.graj#glowna').click(function () {
    zmienEkran('#graj, .gora.glowna, #logo, .dol.glowna, .cechy', '#przygotowanie');
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
        aktywnynr = parseInt(id.substr(id.length - 1)) - 1;

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
        zmienEkran('.gora, .dol', '#plansza');
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
            $('#powiekszenie').css('visibility', 'visible');
            $('#powiekszenie').css('opacity', '1');
        }
    },
    function () {
        licznik = setTimeout(function () {
            $('#powiekszenie').css('opacity', '0');
            setTimeout(function () {
                $('#powiekszenie').css('visibility', 'hidden');
            }, 300);
        }, 20);
    }
);

function wyswietlKolejnosc() {
    zablokowany = true;
    $('#okienko').html(function () {
        let lista = '';
        // Losowanie kolejności graczy
        while (kolejnosc.length < liczba_graczy) {
            let losowa = Math.floor(Math.random() * liczba_graczy);
            if (kolejnosc.indexOf(losowa) === -1) kolejnosc.push(losowa);
        }
        for (i = 0; i < liczba_graczy; i++) {
            nr = kolejnosc[i];
            lista += `<li><span style="color:${gracz[nr].kolor};">${gracz[nr].nazwa}</span></li>`;
        }
        return `<h1>Kolejność startu:</h1><ol>${lista}</ol><div class="kontynuuj">Kontynuuj</div>`;
    });
    $('.kontynuuj').click(function () {
        zmienEkran('#okienko');
        zablokowany = false;
        zmianaGracza();
    });
}
