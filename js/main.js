
let siteNameInput = document.getElementById("siteName");
let siteUrlInput = document.getElementById("siteUrl");
let siteList;
let searchInput = document.getElementById("searchInput");
let searchBtn = document.querySelector(".searchBtn");

if (localStorage.getItem("webSites") == null) {
    siteList = [];
}
else {
   siteList = JSON.parse(localStorage.getItem("webSites"));
    displaySiteList();
}

function submitBtn() {

    if (siteNameInput.value != "" && siteUrlInput.value != "") {
       let site =
        {
            name: siteNameInput.value,
            url: siteUrlInput.value
        }

        siteList.push(site);
        displaySiteList();
        localStorage.setItem("webSites", JSON.stringify(siteList));
        clearInputs()
    }
    else if (siteNameInput.value == "" && siteUrlInput.value == "") {
        document.querySelector(".alertError1").classList.remove("d-none");
        document.querySelector(".alertError2").classList.remove("d-none");
      

    }
    else if (siteNameInput.value == "" && siteUrlInput.value != "") {
        document.querySelector(".alertError1").classList.remove("d-none");
        document.querySelector(".alertError2").classList.add("d-none");
    }

    else {
        document.querySelector(".alertError2").classList.remove("d-none");
        document.querySelector(".alertError1").classList.add("d-none");
    }

}


function displaySiteList() {
    cartoona = ``;
    for (i = 0; i < siteList.length; i++) {
        cartoona += `  <div  class=" webSiteList p-3 py-5 font-weight-bold d-flex mb-3  ">
       <p> ${siteList[i].name} </p>
        <div class="btnsList m-auto ">
        <a href=" ${siteList[i].url}"  class="btn btn-info px-3"> Visit </a>
        <button class="btn btn-danger"  onclick="deleteSite(${i})" > Delete </button>
        <button class="btn btn-warning text-light" onclick="updateSite(${i})" > Update </button>
    </div>
</div>`
    }

    document.getElementById("webList").innerHTML = cartoona;

}


function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem("webSites", JSON.stringify(siteList));
    displaySiteList();
}

function clearInputs() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function updateSite(index) {
    gIndex = index;

    siteNameInput.value = siteList[index].name;
    siteUrlInput.value = siteList[index].url;
    document.querySelector(".btn-submit").style.display = " none ";
    document.querySelector(".btn-update").classList.remove("d-none");
    // document.querySelector(".btn-update").style.display = " inlin-block " ; 
}

function updateSiteInfo() {


    siteList[gIndex].name = siteNameInput.value;
    siteList[gIndex].url = siteUrlInput.value;
    displaySiteList()
    localStorage.setItem("webSites", JSON.stringify(siteList));
    clearInputs();

    document.querySelector(".btn-update").classList.add("d-none");
    document.querySelector(".btn-submit").style.display = " inline-block ";


}

function searchSite() {

    cartoona = ``;
    for (i = 0; i < siteList.length; i++) 
    {
        if (siteList[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) == true)
         {
            cartoona += `  
            <div  class=" webSiteList p-3 py-5 font-weight-bold d-flex mb-3  ">
                <p> ${siteList[i].name} </p>
                <div class="btnsList m-auto ">
                    <a href=" ${siteList[i].url}"  class="btn btn-info px-3"> Visit </a>
                    <button class="btn btn-danger"  onclick="deleteSite(${i})" > Delete </button>
                    <button class="btn btn-warning text-light" onclick="updateSite(${i})" > Update </button>
                </div>
            </div>`
        }
    }

    document.getElementById("webList").innerHTML = cartoona;

}

searchInput.addEventListener("keyup", searchSite)
searchBtn.addEventListener("click", searchSite)