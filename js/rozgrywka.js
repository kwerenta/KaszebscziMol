const maksymalna_liczba_graczy = 4;
var liczba_graczy = 2;
var zablokowany = false;

var aktywnynr = 0;
var kolory = [];
var nazwy = [];
var awatary = [];

//Przejście do ekranu przygotowywania rozgrywki
$(".graj#glowna").on("click",function () {
    $(".gora.glowna, .dol.glowna").css("opacity","0");
    setTimeout(function(){ 
        $("#graj, .gora.glowna, #logo, .dol.glowna, .cechy").css("display","none"); 
        $("#przygotowanie").css("display","block");
    }, 500);
    setTimeout(function(){ 
        $("#przygotowanie").css("opacity","1");
    }, 520);
});

//Dodanie kolejnego gracza
$(".gracz.dodaj").on("click", function () {  
    if(!zablokowany)
    {  
        zablokowany = true;
        $(".gracz.nr1").css("margin-left","15px");
        $(this).css("opacity","0");
        liczba_graczy++;
        setTimeout(function() {
            if(liczba_graczy>=maksymalna_liczba_graczy) {
                $(".gracz.dodaj").css("display","none");
            }
            $(".gracz.nr"+liczba_graczy).css("display","block"); 
        }, 500 );
        setTimeout(function(){ 
            $(".gracz.dodaj, .gracz.nr"+liczba_graczy).css("opacity","1");
            zablokowany = false;
        }, 520);
    }
});

//Oznaczenie wybranego gracza aktywnym do edycji oraz wczytanie jego ustawień do pól wyboru
$(".gracz").on("click", function () {
    for(i=1;i<=maksymalna_liczba_graczy;i++)
    {
        if($(this).hasClass("nr"+i))
        {
            $(".gracz.nr"+i).addClass("aktywny");
            aktywnynr=i;
            var kolor = $(".aktywny h4").css("color");
            if(kolor=="rgb(245, 246, 250)") $("#wyb_kolor").val("pusty");
            else $("#wyb_kolor").val(kolor);
            $("#nazwa_gracza").val(nazwy[i]);
        }
        else
        {
            $(".gracz.nr"+i).removeClass("aktywny");
        }
        $("#nazwa_gracza, #wyb_kolor, #wyb_awatar").removeAttr("disabled");
    }
});

//Zmiana nazwy gracza
$("#nazwa_gracza").on("focusout", function(){
        var nazwa = $(this).val();
        if(nazwa!="" && nazwa.length>2) 
        {
            $(".aktywny h2").html(nazwa);
            nazwy[aktywnynr] = nazwa;
        }
});

//Zmiana koloru gracza
$("#wyb_kolor").on("change click",function(){
    var kolor = $(this).children("option:selected").val();
    $(".aktywny .kolor").css("background-color", kolor);
    $(".aktywny h4").css("color",kolor);
    kolory[aktywnynr] = kolor;
});

//Weryfikacja wprowadzonych danych i przejście do ekranu rozgrywki
$(".graj#start").on("click",function(){
    for(i=1;i<=liczba_graczy;i++)
    {
        if(kolory[i]=== undefined) $("#blad h3").html("Nie wybrano koloru dla co najmniej jednego gracza!");
        else if(nazwy[i] === undefined) $("#blad h3").html("Nie ustawiono nazwy dla co najmniej jednego gracza!");
        else $("#blad h3").html("");
    }
    if($("#blad h3").text() == "")
    {
        $(".gora, .dol").css("opacity","0");
        setTimeout(function(){ 
            $("#start, .gora, .gracze_edycja .dol, #przygotowanie").css("display","none"); 
            $("#plansza").css("display","block");
        }, 500);
        setTimeout(function(){ 
            $("#plansza").css("opacity","1");
        }, 520);
    }
});