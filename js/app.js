
var dataList = document.querySelector('ul');
var placeImg = document.querySelector('.img')

const getUser = function(name){
    var user = gitUser.value;
    if (!user){
        renderError();
        alert("Preencha o campo de usuário!");
    }
    renderLoading();

    axios
    .get(`https://api.github.com/users/${user}/repos`)
    .then(function(response){
        fillList(response.data);
    })
    .catch(function(error){
        alert("Usuário não encontrado.");
        renderError(error);
    });
    
}

function renderError(loading) {
    dataList.innerHTML = "";
    var user = gitUser.value;
    var msgUserEmpty = !user ? "Preencha o usuário" : "Erro ao efetuar busca";

  }

function renderLoading(loading){
    dataList.innerHTML = "";
    const textelement = document.createTextNode('Carregando...');
    const listitem = document.createElement('li');
    listitem.appendChild(textelement);
    dataList.appendChild(listitem);

}

const fillList = repositorios => {
    console.log("Repositórios", repositorios);
    dataList.innerHTML = "Repositórios:";

    for (repo of repositorios){
        const reponame = document.createTextNode(repo.name);
        const repoitem = document.createElement('li');

        repoitem.appendChild(reponame);
        dataList.appendChild(repoitem);
    }
};
