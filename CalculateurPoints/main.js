var LVL = 21;
var UP = 0;
var pointUP = 0;

var nombrePointMax = 3;
var nombrePointUtiliser = 3;

var Attaque = 0;
var Defense = 0;
var element = 0;
var Mana = 0;

var StatAttack = 0;
var StatDefense = 0;
var StatElement = 0;
var StatMana = 0;

function update() {
    maximum("LVL");maximum("UP");

    LVL = document.getElementById("LVL").value;
    UP = document.getElementById("UP").value;

    if (LVL<21) {
        LVL = 21;
        document.getElementById("LVL").value = LVL;
    }
    else if (LVL>99) {
        LVL = 99;
        document.getElementById("LVL").value = LVL;
    } 

    LVL <= 40 && (document.getElementById("UP").max = 5)
    LVL > 40 && LVL <= 50 && (document.getElementById("UP").max = 10)
    LVL > 50 && (document.getElementById("UP").max = 15);

    if (UP<0) {
        UP = 0;
        document.getElementById("UP").value = UP;
    }else if (UP>document.getElementById("UP").max){
        UP = document.getElementById("UP").max;
        document.getElementById("UP").value = UP;
    }     

    var UPtab = [0, 5, 10, 15, 20, 28, 36, 46, 56, 68, 80, 95, 110, 128, 148, 173];

    nombrePointMax = (LVL - 20) * 3 + UPtab[UP];
    nombrePointUtiliser = nombrePointMax - Attaque - Defense - element - Mana;

    document.getElementById("sortie").innerHTML = "Nombre de Points total : " + nombrePointMax + " Nombre de Points a utiliser : " + nombrePointUtiliser;

    scookie();
}

function number(id) {
    maximum(id)
    calcul(id);
    afficheBonus();
    scookie();
}

function calcul(id) {
    var max = parseInt(document.getElementById(id).value);

    var stat;
    if(id=="AtN")stat=0;
    else if(id=="DeN")stat=1;
    else if(id=="ElN")stat=2;
    else if(id=="MaN")stat=3;

    var cout = [
        {1:1, 11:2, 20:3, 40:4, 60:5, 80:6, 91:7, 98:8, 99:9, 100:10},
        {1:1, 11:2, 30:3, 41:4, 61:5, 76:6, 85:7, 95:8, 100:10},
        {1:1, 21:2, 31:3, 41:4, 51:5, 71:6, 81:7},
        {1:1, 21:2, 31:3, 41:4, 51:5, 71:6, 81:7}
    ];
    var pt = [
        {1:5, 11:6, 21:8, 31:7, 41:9, 51:10, 61:11, 71:13, 81:14, 91:15, 95:16, 96:17, 98:20},
        {1:1, 11:2, 21:3, 31:4, 41:5, 51:6, 61:7, 71:8, 81:9, 91:10},
        {1:1, 51:2},
        {1:1, 51:2}
    ];

    var val = 0;
    var valStat = 0;
    var point = 0;

    for (var k = 1; k <= max; k++) {
        if(cout[stat][k]!=null)point=cout[stat][k];
        val+=point;
    }
    for (var k = 1; k <= max + parseInt(document.getElementById(id.split("N")[0] +"b").value) + parseInt(document.getElementById("Glb").value); k++) {
        if(pt[stat][k]!=null)point=pt[stat][k];
        valStat+=point;
    }

    if(stat==0){Attaque=val;StatAttack=valStat;}
    else if(stat==1){Defense=val;StatAttack=valStat;}
    else if(stat==2){element=val;StatElement=valStat;}
    else{Mana=val;StatMana=valStat;}

    nombrePointUtiliser = nombrePointMax - Attaque - Defense - element - Mana;

    document.getElementById("sortie").innerHTML = "Nombre de Points total : " + nombrePointMax + " Nombre de Points a utiliser : " + nombrePointUtiliser;
    document.getElementById(id.split("N")[0] +"T").value = valStat;

    while (nombrePointUtiliser < 0) {
        document.getElementById(id).value--;
        calcul(id);
    }
}

//Gestion des items joueurs
function item(id) {
    maximum(id);
    if (id == "Glb") {
        item("Atb");
        item("Deb");
        item("Elb");
        item("Mab");
    }
    else {
        document.getElementById(id.split('b')[0] + 'N').max = 100 - parseInt(document.getElementById(id).value) - parseInt(document.getElementById("Glb").value);
        if (parseInt(document.getElementById(id.split('b')[0] + 'N').max) < parseInt(document.getElementById(id.split('b')[0] + 'N').value)) {
            document.getElementById(id.split('b')[0] + 'N').value = document.getElementById(id.split('b')[0] + 'N').max;
           }
        calcul(id.split('b')[0] + "N");
        scookie();
    }
}

function maximum(id)
{
    if(parseInt(document.getElementById(id).value)>parseInt(document.getElementById(id).max))
    {
        document.getElementById(id).value=document.getElementById(id).max;
    }
}

function afficheBonus() {
    var BonusAttaque = 0;
    var BonusPrecision = 0;
    var BonusNiveauExplosion = 0;
    var BonusDommageExplosion = 0;
    var BonusHp = 0;
    var BonusMp = 0;
    var BonusEsquive = 0;
    var BonusBaisseExplosion = 0;
    var BonusResistanceTout = 0;
    var BonusDommageMagique = 0;
    var BonusElement = 0;
    var BonusDommageDefense = 0;

    var _Attaque = document.getElementById("AtN").value;
    var _Defense = document.getElementById("DeN").value;
    var _element = document.getElementById("ElN").value;
    var _Mana = document.getElementById("MaN").value;

    if (_Attaque == 0);
    else if (_Attaque < 10) { BonusAttaque += 5; }
    else if (_Attaque < 20) { BonusAttaque += 5; BonusPrecision += 10; }
    else if (_Attaque < 30) { BonusAttaque += 5; BonusPrecision += 10; BonusNiveauExplosion += 2; }
    else if (_Attaque < 40) { BonusAttaque += 10; BonusPrecision += 20; BonusNiveauExplosion += 2; }
    else if (_Attaque < 50) { BonusAttaque += 10; BonusPrecision += 20; BonusNiveauExplosion += 2; BonusDommageExplosion += 10; }
    else if (_Attaque < 60) { BonusAttaque += 10; BonusPrecision += 20; BonusNiveauExplosion += 2; BonusDommageExplosion += 10; BonusHp += 200; BonusMp += 200; }
    else if (_Attaque < 70) { BonusAttaque += 10; BonusPrecision += 35; BonusNiveauExplosion += 2; BonusDommageExplosion += 10; BonusHp += 200; BonusMp += 200; }
    else if (_Attaque < 80) { BonusAttaque += 15; BonusPrecision += 50; BonusNiveauExplosion += 2; BonusDommageExplosion += 10; BonusHp += 200; BonusMp += 200; }
    else { BonusAttaque += 15; BonusPrecision += 50; BonusNiveauExplosion += 5; BonusDommageExplosion += 10; BonusHp += 200; BonusMp += 200; }

    if (_Defense < 10);
    else if (_Defense < 20) { BonusEsquive += 5; }
    else if (_Defense < 30) { BonusEsquive += 5; BonusBaisseExplosion += 2; }
    else if (_Defense < 40) { BonusEsquive += 5; BonusBaisseExplosion += 2; BonusHp += 100; }
    else if (_Defense < 50) { BonusEsquive += 5; BonusBaisseExplosion += 4; BonusHp += 100; }
    else if (_Defense < 60) { BonusEsquive += 10; BonusBaisseExplosion += 4; BonusHp += 100; }
    else if (_Defense < 70) { BonusEsquive += 10; BonusBaisseExplosion += 4; BonusHp += 300; }
    else if (_Defense < 75) { BonusEsquive += 10; BonusBaisseExplosion += 7; BonusHp += 300; }
    else if (_Defense < 80) { BonusEsquive += 10; BonusBaisseExplosion += 7; BonusHp += 300; BonusResistanceTout += 2; }
    else { BonusEsquive += 20; BonusBaisseExplosion += 10; BonusHp += 300; BonusResistanceTout += 2; }


    if (_element == 0);
    else if (_element < 10) { BonusElement += 2; }
    else if (_element < 20) { BonusElement += 2; BonusMp += 100; }
    else if (_element < 30) { BonusElement += 2; BonusMp += 100; BonusDommageMagique += 5; }
    else if (_element < 40) { BonusElement += 4; BonusMp += 100; BonusDommageMagique += 5; BonusResistanceTout += 4; }
    else if (_element < 50) { BonusElement += 4; BonusMp += 200; BonusDommageMagique += 5; BonusResistanceTout += 4; }
    else if (_element < 60) { BonusElement += 4; BonusMp += 200; BonusDommageMagique += 10; BonusResistanceTout += 4; }
    else if (_element < 70) { BonusElement += 6; BonusMp += 200; BonusDommageMagique += 10; BonusResistanceTout += 5; }
    else if (_element < 80) { BonusElement += 6; BonusMp += 300; BonusDommageMagique += 10; BonusResistanceTout += 5; }
    else { BonusElement += 6; BonusMp += 300; BonusDommageMagique += 15; BonusResistanceTout += 5; }

    if (_Mana < 5);
    else if (_Mana < 10) { BonusAttaque += 5; }
    else if (_Mana < 15) { BonusAttaque += 10; }
    else if (_Mana < 20) { BonusAttaque += 15; }
    else if (_Mana < 25) { BonusAttaque += 15; BonusDommageDefense += 10; }
    else if (_Mana < 30) { BonusAttaque += 25; BonusDommageDefense += 10; }
    else if (_Mana < 35) { BonusAttaque += 30; BonusDommageDefense += 10; }
    else if (_Mana < 40) { BonusAttaque += 35; BonusDommageDefense += 10; }
    else if (_Mana < 45) { BonusAttaque += 40; BonusDommageDefense += 10; BonusBaisseExplosion += 25; }
    else if (_Mana < 50) { BonusAttaque += 50; BonusDommageDefense += 10; BonusBaisseExplosion += 25; }
    else if (_Mana < 55) { BonusAttaque += 60; BonusDommageDefense += 10; BonusBaisseExplosion += 25; BonusResistanceTout += 2; }
    else if (_Mana < 60) { BonusAttaque += 70; BonusDommageDefense += 10; BonusBaisseExplosion += 25; BonusResistanceTout += 2 }
    else if (_Mana < 65) { BonusAttaque += 80; BonusDommageDefense += 10; BonusBaisseExplosion += 25; BonusResistanceTout += 2 }
    else if (_Mana < 70) { BonusAttaque += 90; BonusDommageDefense += 10; BonusBaisseExplosion += 25; BonusResistanceTout += 2 }
    else if (_Mana < 75) { BonusAttaque += 100; BonusDommageDefense += 45; BonusBaisseExplosion += 25; BonusResistanceTout += 2 }
    else if (_Mana < 80) { BonusAttaque += 115; BonusDommageDefense += 45; BonusBaisseExplosion += 25; BonusResistanceTout += 2 }
    else { BonusAttaque += 130; BonusDommageDefense += 45; BonusBaisseExplosion += 25; BonusResistanceTout += 2 }

    var texte = "Bonus :</br>";
    if (BonusAttaque != 0) texte += "Pouvoir d'attaque +" + BonusAttaque + "</br>";
    if (BonusPrecision != 0) texte += "Niveau de precision+" + BonusPrecision + "</br>";
    if (BonusNiveauExplosion != 0) texte += "Niveau d'explosion mortelle +" + BonusNiveauExplosion + "</br>";
    if (BonusDommageExplosion != 0) texte += "Dommage d'explosion mortelle +" + BonusDommageExplosion + "</br>";
    document.getElementById("bonusA").innerHTML = texte;

    texte = "";
    if (BonusEsquive != 0) texte += "Esquive longue/Courte Distance +" + BonusEsquive + "</br>";
    if (BonusBaisseExplosion != 0) texte += "Baisse d'explosion mortelle +" + BonusBaisseExplosion + "</br>";
    if (BonusResistanceTout != 0) texte += "Resistance tout element +" + BonusResistanceTout + "</br>";
    if (BonusDommageMagique != 0) texte += "Baisse dommage magique +" + BonusDommageMagique + "</br>";
    if (BonusDommageDefense != 0) texte += "Augmentation dommage defense +" + BonusDommageDefense + "</br>";
    document.getElementById("bonusD").innerHTML = texte;

    texte = "";
    if (BonusHp != 0) texte += "HP +" + BonusHp + "</br>";
    if (BonusMp != 0) texte += "MP +" + BonusMp + "</br>";
    document.getElementById("bonusM").innerHTML = texte;

    texte = "";
    if (BonusElement != 0) texte += "element +" + BonusElement + "</br>";
    document.getElementById("bonusE").innerHTML = texte;

}

//création du cookie
function scookie() {
    var value = LVL + "/" + UP + "/" + document.getElementById("AtN").value + "/" + document.getElementById("DeN").value + "/" + document.getElementById("ElN").value + "/" + document.getElementById("MaN").value + "/" + document.getElementById("Atb").value + "/" + document.getElementById("Deb").value + "/" + document.getElementById("Elb").value + "/" + document.getElementById("Mab").value + "/" + document.getElementById("Glb").value
    var expire = new Date();
    expire.setDate(expire.getDate() + 15);
    document.cookie = value + ';expires=' + expire.toGMTString();
}

//Récupération des données au chargement de la page (cookie ou URL)

function link() {
    if (document.cookie.length > 0) {
        init(document.cookie);       
    }
    var url = window.location.toString().split("?")[1];
    if (url != null) {
        init(url);
    }
}

function init(val)
{
    val = val.split('/');
        document.getElementById("LVL").value = val[0];
        document.getElementById("UP").value = val[1];
        update();

        maz("AtN", val[2]);
        maz("DeN", val[3]);
        maz("ElN", val[4]);
        maz("MaN", val[5]);

        document.getElementById("Atb").value = val[6];
        document.getElementById("Deb").value = val[7];
        document.getElementById("Elb").value = val[8];
        document.getElementById("Mab").value = val[9];
        document.getElementById("Glb").value = val[10];
        item("Glb");
        afficheBonus();
}

function maz(id, val) {
    document.getElementById(id).value = parseInt(val);
    number(id);
}

function createLink(){
    var lien = "http://noswiki.fr/points.html" ;
    lien +="?"+  LVL + "/" + UP + "/" + document.getElementById("AtN").value + "/" + document.getElementById("DeN").value + "/" + document.getElementById("ElN").value + "/" + document.getElementById("MaN").value + "/" + document.getElementById("Atb").value + "/" + document.getElementById("Deb").value + "/" + document.getElementById("Elb").value + "/" + document.getElementById("Mab").value + "/" + document.getElementById("Glb").value;
    
    document.getElementById("link").hidden = false;
    document.getElementById("link").value = lien;
    var copyText = document.querySelector("textarea");
    copyText.select();
    document.execCommand('copy');
    document.getElementById("link").hidden = true;
}

function reset() {
    maz("AtN", 0);
    maz("DeN", 0);
    maz("ElN", 0);
    maz("MaN", 0);

    document.getElementById("Atb").value = 0;
    document.getElementById("Deb").value = 0;
    document.getElementById("Elb").value = 0;
    document.getElementById("Mab").value = 0;
    document.getElementById("Glb").value = 0;
    item("Glb");
    afficheBonus();
}
