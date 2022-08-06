/* reste a faire
FAIT arrondir le résultat à deux décimales
FAIT rafraichir le resultat au changement d'input 
FAIT onchane et on keyup 
FAIT verifier si < a 0 
stocker en cookie le formulaire (dernier calcul)
animation?
bouton et fonction imprimer
convertir en PDF
historique de calcul seulement si click sur calculer*/
document.body.addEventListener("load", focusOnFirstInput());
function focusOnFirstInput() {
  document.getElementById("inputProject").focus();
}
function checkInputs(){
    let inputs = document.querySelectorAll('#formCalculGain input.inpt');
    inputs.forEach(monInput =>{
        if(monInput.value <0){
            monInput.value = 0;
        }
        saveElementsInCookies(monInput);
    })
}

function calculGain(){
    checkInputs();
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

    //bloquer TauxHoraire si TJM utilisé et vice-versa
    disabledInputs();
      

    // on commence le calcul
    let gainHeures= tauxHoraire * qteTauxHoraire;
    let gainTauxJournalierMoyen = TauxJournalierMoyen * qteTauxJournalierMoyen;
    let gainExtras = extras * qteExtras;

    let totalBrut =gainHeures + gainTauxJournalierMoyen + gainExtras;


    document.getElementById('resultatBrut').innerText = totalBrut.toFixed(2) + " €";
    // enlever les charges
//totalBrut - charges%
// chargeADeduire = totalBrut -(totalBrut * (charges/100))
let chargesADeduire = (totalBrut * (charges/100));
let totalNet = totalBrut - chargesADeduire;
document.getElementById('resultatTaxes').innerText = chargesADeduire.toFixed(2) + " €";
document.getElementById('resultatNet').innerText = totalNet.toFixed(2) + " €";
}
//affecter le calcul sur le bouton

let bouton = document.getElementById('calcFunction');
bouton.addEventListener('click',calculGain);

//vider tous les champs de formulaires

function resetAllInputs(){
  document.getElementById('formCalculGain').value = "";
  document.getElementById('inputProject').value = "";
}

let resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetAllInputs);


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


function disabledInputs() {
    if (tauxHoraire.value != 0) {
      TJM.setAttribute('disabled', '');
      qteTJM.setAttribute('disabled', '');
    } else {
      TJM.removeAttribute('disabled', '');
      qteTJM.removeAttribute('disabled', '');
    }
    if (TJM.value != 0) {
      tauxHoraire.setAttribute('disabled', '');
      qteTH.setAttribute('disabled', '');
    } else {
      tauxHoraire.removeAttribute('disabled', '');
      qteTH.removeAttribute('disabled', '');
    }
  }
function inputNameControl(){
/*let inputProject = document.getElementById('inputProject');
inputProject.addEventListener('mouseout',() => {*/
  if (document.getElementById('inputProject').value == ""){
    document.getElementById('alertTextInputName').innerText = "ce champ ne peut pas être vide";
  }
  else{
    document.getElementById('alertTextInputName').innerText = "";
  }
};

let inputProject = document.getElementById('fieldsetProject');
inputProject.addEventListener('mouseout',inputNameControl);
inputProject.addEventListener('keydown', inputNameControl);


