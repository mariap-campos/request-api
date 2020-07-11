var gitUser = document.getElementById('user');
var dataList = document.querySelector('ul');
var placeImg = document.querySelector('.avatar-img')
var placeBio = document.querySelector('.avatar-bio')
var gitAvatar;
var gitBio;

const getUser = function(name){
    dataList.innerHTML = "";
    placeImg.innerHTML = "";
    placeBio.innerHTML = "";
    var user = gitUser.value;
    if (!user){
        renderError();
    }
    //renderLoading();

    axios
    .get(`https://api.github.com/users/${user}/repos`)
    .then(function(response){
        fillList(response.data);
    })
    .catch(function(error){
        renderError(error);
    });

    axios
    .get(`https://api.github.com/users/${user}`)
    .then(function(response){
        gitAvatar = response.data.avatar_url;
        gitBio = response.data.bio;
        console.log(gitAvatar);
    });
}

function renderError(loading) {
    dataList.innerHTML = "";
    placeImg.innerHTML = "";
    placeBio.innerHTML = "";
    var user = gitUser.value;
    var msgUserEmpty = !user ? "Preencha o usuário" : "Erro ao efetuar busca";
    alert(msgUserEmpty);

  }

/*function renderLoading(loading){
    dataList.innerHTML = "";
    const textelement = document.createTextNode('Carregando...');
    const listitem = document.createElement('li');
    listitem.appendChild(textelement);
    dataList.appendChild(listitem);

}*/

const fillList = repositorios => {
    dataList.innerHTML = "";
    placeImg.innerHTML = "";
    placeBio.innerHTML = "";
    console.log("Repositórios", repositorios);
    dataList.innerHTML = "Repositórios:";

    const userimg = document.createElement('img');
    userimg.setAttribute('src',gitAvatar);
    placeImg.appendChild(userimg);


    const userbio = document.createTextNode(gitBio);
    placeBio.appendChild(userbio);

    for (repo of repositorios){
        const reponame = document.createTextNode(repo.name);
        const repoitem = document.createElement('li');

        repoitem.appendChild(reponame);
        dataList.appendChild(repoitem);
    }
};
