let url = "https://api.github.com/users/";

class GitHub{
    constructor(api, userName){
        this.api = api+`${userName}`;
 
    }

    getUserDeatils = async (callApi) => {
        try {
            let data = await fetch(callApi);
            let resJson = await data.json();
            this.createUserCard(resJson);
        }catch(error) {
            console.error("error while fetching data", error)
        }
    }

    createUserCard = (dataObj) => {
        const mainSection = document.getElementById("main");
        mainSection.setAttribute("class","git-user");
        const card = document.createElement("div");
        card.setAttribute("class","card mb-3 border-2 border-info-subtle rounded-4 pb-3 pt-3 text-bg-light");
        card.setAttribute("style","width: 600px");
        card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4 d-flex flex-column justify-content-center align-items-center ">
                <img src="${dataObj.avatar_url}" class="img-fluid rounded-circle border border-5 border-info-subtle" alt="..." height="100" width="100">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${dataObj.name}</h5>
                    <p class="card-text">${dataObj.bio}</p>
                    <div class="row">
                        <div class="col-sm"><small>Followers:${dataObj.followers}</small></div>
                        <div class="col-sm"><small>Following:${dataObj.following}</small></div>
                        <div class="col-sm"><small>Repos:${dataObj.public_repos}</small></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-8"><small>Twitter profile:${dataObj.twitter_username}</small></div>
                        <div class="col-sm-4"><small>Location:${dataObj.location}</small></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    mainSection.innerHTML = "";
    mainSection.append(card);
    }
}

const git = new GitHub(url, "Harikalyan99");
const api = git.api;
git.getUserDeatils(api);

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    let userName = document.getElementById("form").elements["search"].value;
    
    document.getElementById("form").elements["search"].value = "";

    const git = new GitHub(url, userName);
    const api = git.api;
    git.getUserDeatils(api);
})

