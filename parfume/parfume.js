function calculParfume()
{
    var itemLVL = parseInt(document.getElementById("itemLVL").value);
    var rareLVL = parseInt(document.getElementById("rareLVL").value);
    var tabParfume = [
        [0,0,0,0,0,5,10],
        [0,0,5,5,10,20,40],
        [0,5,10,10,20,40,80],
        [5,10,10,20,40,80,120],
        [10,10,20,40,80,120,160],
        [10,20,40,80,120,160,200],
        [20,40,80,120,160,200,300],
        [65,105,145,185,225,256,305,345]
    ];
    var tabGold = [5000,8000,10000,12500,15000,17500,20000,100000];

    if(rareLVL==7 && itemLVL!=7){rareLVL=6;document.getElementById("rareLVL").value=6;}
    if(itemLVL==7){document.getElementById("HeroiqueLVL").hidden=false;document.getElementById("legendaire").disabled = false;}
    else{document.getElementById("HeroiqueLVL").hidden=true;document.getElementById("legendaire").disabled = true;}

    

    var coutParfume = tabParfume[itemLVL][rareLVL];

    document.getElementById("nbrParfume").value = coutParfume + parseInt(document.getElementById("HeroiqueLVL").value);
    document.getElementById("nbrOr").value = tabGold[itemLVL];

    document.getElementById("prixTotal").value = parseInt(document.getElementById("nbrParfume").value * document.getElementById("prixParfum").value) + parseInt(tabGold[itemLVL]);
}