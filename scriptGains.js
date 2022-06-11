function calculGain(){
    //on recupere le html formulaire
    let myForm = document.getElementById('formCalculGain'); //recupere tout le formulaire
    let formObj = new FormData(myForm);//transforme le formulaire en un objet avec tout les datas
    // le formData permet de créer un objet (ici formObj) avec toute les methodes et instances du formulaire
    //ne restera plus qu'a aller chercher avec la methode (get) le name par ex
    //sert a acceder aux données du formulaire apres mise en forme de type dictionnaire
    //recupere les entrées de valeur
    let tauxHoraire = formObj.get('tauxHoraire');
    let TauxJournalierMoyen = formObj.get('TJM');
    let extras = formObj.get('extras');
    //recupere les entrées de Qté
    let qteTauxHoraire = formObj.get('qteTH');
    let qteTauxJournalierMoyen = formObj.get('qteTJM');
    let qteExtras = formObj.get('qteExtras');
    //recupere les charges
    let charges = formObj.get('Charges');
    // on commence le calcul
    let gainHeures= tauxHoraire * qteTauxHoraire;
    let gainTauxJournalierMoyen = TauxJournalierMoyen * qteTauxJournalierMoyen;
    let gainExtras = extras * qteExtras;

    let totalBrut =gainHeures + gainTauxJournalierMoyen + gainExtras;

    document.getElementById('resultatBrut').innerText = totalBrut + " €";
    // enlever les charges
//totalBrut - charges%
// chargeADeduire = totalBrut -(totalBrut * (charges/100))
let chargesADeduire = (totalBrut * (charges/100));
let totalNet = totalBrut - chargesADeduire;
document.getElementById('resultatTaxes').innerText = chargesADeduire.toFixed(2) + " €";
document.getElementById('resultatNet').innerText = totalNet.toFixed(2) + " €";
}

//recuperer tous les inputs et leur affecter des evenements
let inputs = document.querySelectorAll('#formCalculGain input.inpt');
inputs.forEach(monInput => {
    //si il a une valeur, lui donner.
    monInput.addEventListener('change', calculGain);
    monInput.addEventListener('keyup', calculGain);
})

//pour stocker dans les cookies
//cookie est stocke dans le navigateur en local
function saveElementsInCookies(input){
    document.cookie = input.name +'='+ input.value;
}
/* reste a faire
arrondir le résultat à deux décimales   FAIT 
raffraichir le resultat au changement d'input
onchane et on keyup
verifier si < a 0 
animation?
bouton et fonction imprimer
convertir en PDF
stocker en cookie le formulaire (dernier calcul)
historique de calcul seulement si click sur calculer*/
