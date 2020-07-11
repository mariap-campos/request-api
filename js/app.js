var gitUser = document.getElementById('user');
var dataList = document.querySelector('ul');
var placeImg = document.querySelector('.img')
var gitAvatar;
var gitBio;

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

    axios
    .get(`https://api.github.com/users/${user}`)
    .then(function(response){
        gitAvatar = response.data.avatar_url;
        gitBio = response.data.bio;
        console.log(gitAvatar);

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
    placeImg.innerHTML = "";
    const textelement = document.createTextNode('Carregando...');
    const listitem = document.createElement('li');
    listitem.appendChild(textelement);
    dataList.appendChild(listitem);

}

const fillList = repositorios => {
    console.log("Repositórios", repositorios);
    dataList.innerHTML = "Repositórios:";

    const userbio = document.createTextNode(gitBio);
    const userimg = document.createElement('img');
    userimg.setAttribute('src',gitAvatar)

    placeImg.appendChild(userimg);
    placeImg.appendChild(userbio);

    for (repo of repositorios){
        const reponame = document.createTextNode(repo.name);
        const repoitem = document.createElement('li');

        repoitem.appendChild(reponame);
        dataList.appendChild(repoitem);
    }
};
