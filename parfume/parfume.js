function calculParfume()
{
    var itemLVL = document.getElementById("itemLVL").value;
    var rareLVL = document.getElementById("rareLVL").value;

    var tabParfume = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,5,10],
        [0,0,5,5,10,20,40],
        [0,5,10,10,20,40,80],
        [5,10,10,20,40,80,120],
        [10,10,20,40,80,120,160],
        [10,20,40,80,120,160,200],
        [20,40,80,120,160,200,300]
    ];

    var coutParfume = tabParfume[itemLVL][rareLVL];
    document.getElementById("nbrParfume").value = coutParfume;

}