function calculGain(){
    //on recupere le html formulaire
    let myForm = document.getElementById('formCalculGain'); //recupere tout le formulaire
    let formObj = new FormData(myForm);//transforme le formulaire en un objet avec tout les datas
    // le formData permet de créer un objet (ici formObj) avec toute les methodes et instances du formulaire
    //ne restera plus qu'a aller chercher avec la methode (get) le name par ex
    
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

    let total =gainHeures + gainTauxJournalierMoyen + gainExtras;

    document.getElementById('resultatBrut').innerText = total + "€";
}
