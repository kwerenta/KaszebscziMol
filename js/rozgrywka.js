const maksymalna_liczba_graczy = 4;
var liczba_graczy = 2;
var zablokowany = false;

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
$(".gracz").on("click", function () {
    for(i=1;i<=maksymalna_liczba_graczy;i++)
    {
        if($(this).hasClass("nr"+i))
        {
            $(".gracz.nr"+i).addClass("aktywny");
            $("#nazwa_gracza, #wyb_kolor, #wyb_awatar").removeAttr("disabled");
            var kolor = "red";
            switch(i)
            {
                case 1:
                    kolor = "red";
                    break;
                case 2:
                    kolor = "green";
                    break;
                case 3:
                    kolor = "blue";
                    break;
                case 4:
                    kolor = "yellow";
                    break;
            }
            $("#wyb_kolor").val(kolor);
        }
        else
        {
            $(".gracz.nr"+i).removeClass("aktywny");
        }
        var nazwa = $(".aktywny h2").text();
        $("#nazwa_gracza").val(nazwa);
    }
});

$("#nazwa_gracza").focusout(function(){
    var nazwa = $(this).val();
    $(".aktywny h2").html(nazwa);
});

$("#wyb_kolor").change(function(){
    var kolor = $(this).children("option:selected").val();
    $(".aktywny .kolor").css("background-color", kolor);
});