//on recupere le N° de page
/*function showUsers (){
    let nbPages = document.getElementById('numberPageUser').value;
    getUsers(nbPages);
}*/
// la fonction showUsers n'est plus appelee car on affiche directement la premiere page
// acedc getUsers(1)a la fin du script en bas de cette page
//on lance l'appel ajax
const loader = '<div class="lds-hourglass"></div>';
function getUsers(numeroPage){
    document.getElementById('allUtilisateurs').innerHTML = loader;
    document.getElementById('pagination').innerHTML = '';
    const xhr = new XMLHttpRequest();
    const url = 'https://reqres.in/api/users?page='+ numeroPage;
    xhr.open('GET', url );
    xhr.addEventListener('readystatechange', function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200){
                //on gere le retour de notre appel ajax
                console.log("Response = " + xhr.response);
                const myObject = JSON.parse(xhr.response);
                setUsersInPages(myObject);
                    
                
            }else if(xhr.status == 404){
                alert('impossible de trouver l\'url de la requete ajax');
            }else{
                alert('une erreur est survenue');
            }
        };
    })
xhr.send();
};
//on affiche le le resultat de l'appel ajax dans le DOM
function setUsersInPages(listUsers){
    //on ajoute la liste des utilisateurs
    let myHtml = "";
    listUsers.data.forEach(element => {
        myHtml += '<div><img src ="'+ element.avatar +'" /><p>' + element.first_name + ' ' + element.last_name + '</p></div>'
    });
    document.getElementById('allUtilisateurs').innerHTML = myHtml
// on créé la pagination
   let nbPages = listUsers.total_pages;
   let currentPage = listUsers.page;

let htmlPagination = ""
for (let i = 1; i <= nbPages ;i++){
    if (i == currentPage){
        htmlPagination += '<button class="btn active" disabled>'+ i +'</button>'
    } else {
        htmlPagination += '<button class="btn" active onclick = "getUsers('+ i +')">'+ i +'</button>'
    }
    
}
document.getElementById('pagination').innerHTML = htmlPagination;
};

document.addEventListener('DOMContentLoaded', function(){
    getUsers(1)
})
