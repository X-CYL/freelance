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
    let myForm = document.getElementById('formCalculGain'); //recupere tout le formulaire
    let formObj = new FormData(myForm);//transforme le formulaire en un objet avec tout les datas

    let mydataCalcul ={
      tauxHoraire : formObj.get('tauxHoraire'),
      TauxJournalierMoyen : formObj.get('TJM'),
      extras : formObj.get('extras'),
      qteTauxHoraire : formObj.get('qteTH'),
      qteTauxJournalierMoyen : formObj.get('qteTJM'),
      qteExtras : formObj.get('qteExtras'),
      charges : formObj.get('Charges'),

      gainHeures : function(){
        return this.tauxHoraire * this.qteTauxHoraire
      },
      gainTauxJournalierMoyen : function(){
        return this.TauxJournalierMoyen * this.qteTauxJournalierMoyen
      },
      gainExtras : function(){
        return this.extras * this.qteExtras
      },
      totalBrut : function(){
        return this.gainHeures() + this.gainTauxJournalierMoyen() + this.gainExtras()
      },
      chargesADeduire : function(){
        return (this.totalBrut() * (this.charges/100))
      },
      totalNet : function(){
        return this.totalBrut() - this.chargesADeduire()
      }
      
    };
    //bloquer TauxHoraire si TJM utilisé et vice-versa
    disabledInputs();
    //afficher dans le DOM
    document.getElementById('resultatBrut').innerText = mydataCalcul.totalBrut().toFixed(2) + " €";
    document.getElementById('resultatTaxes').innerText = mydataCalcul.chargesADeduire().toFixed(2) + " €";
    document.getElementById('resultatNet').innerText = mydataCalcul.totalNet().toFixed(2) + " €";
}


//affecter le calcul sur le bouton

let bouton = document.getElementById('calcFunction');
bouton.addEventListener('click',calculGain);

//vider tous les champs de formulaires

function resetAllInputs(){                            // voir pour faire ca avec une boucle
  document.getElementById('tauxHoraire').value = "";
  document.getElementById('TJM').value = "";
  document.getElementById('extras').value = "";
  document.getElementById('qteTH').value = "";
  document.getElementById('qteTJM').value = "";
  document.getElementById('qteExtras').value = "";
  document.getElementById('Charges').value = "";
  document.getElementById('inputProject').value = "";
  calculGain();
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


function saveElementsInCookies(input){
    document.cookie = input.name +'='+ input.value;
}

function disabledInputs() {
    if (tauxHoraire.value != 0) {
      TJM.setAttribute('disabled', '');
      qteTJM.setAttribute('disabled', '');
      TJM.setAttribute("style", "background-color:lightgrey;");
      qteTJM.setAttribute("style", "background-color:lightgrey;");
    } else {
      TJM.removeAttribute('disabled', '');
      qteTJM.removeAttribute('disabled', '');
      TJM.removeAttribute("style", "background-color:lightgrey;");
      qteTJM.removeAttribute("style", "background-color:lightgrey;");
    }
    if (TJM.value != 0) {
      tauxHoraire.setAttribute('disabled', '');
      qteTH.setAttribute('disabled', '');
      tauxHoraire.setAttribute("style", "background-color:lightgrey;");
      qteTH.setAttribute("style", "background-color:lightgrey;");
    } else {
      tauxHoraire.removeAttribute('disabled', '');
      qteTH.removeAttribute('disabled', '');
      tauxHoraire.removeAttribute("style", "background-color:lightgrey;");
      qteTH.removeAttribute("style", "background-color:lightgrey;");
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


