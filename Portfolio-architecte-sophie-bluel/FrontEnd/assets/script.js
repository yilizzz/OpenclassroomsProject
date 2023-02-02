//////////////gardian, if it's logged in, show the modify fonction, otherwise hide the button

if(sessionStorage.getItem('token') === "none"  || sessionStorage.getItem('token') === null ){
	document.querySelector(".btnModify").style.display="none";
	document.querySelector("#logout").style.display="none";
	document.querySelector("#login").style.display="block";
    document.querySelector("#mode").style.display="none";
    document.querySelector(".categories").style.display = "block";
}else{
    document.querySelector(".btnModify").style.display="block";
	document.querySelector("#logout").style.display="block";
	document.querySelector("#login").style.display="none";
    document.querySelector("#mode").style.display="block";
    document.querySelector(".categories").style.display = "none";

}
const linkLogin=document.querySelector("#login");
linkLogin.addEventListener("click", function () {
	window.location.replace("login.html");
});
const linkLogout=document.querySelector("#logout");
linkLogout.addEventListener("click", function () {
	sessionStorage.setItem("token", "none");
	location.reload();
});

/////////////////////////////////////////////////////////////Récupération tous les works 

var reponse = await fetch('http://localhost:5678/api/works/');
var allWorks = await reponse.json();
       
async function updateAllWorks(){
    
    let reponse = await fetch('http://localhost:5678/api/works/');
    allWorks = await reponse.json();
    
}
//////////////////////////////////////////////////generate the elements to show all the works
function generateGallery(works) {

	// Récupération de l'élément du DOM qui accueillera les photos
	const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        // Création d’une balise dédiée à un work
        const figureElement = document.createElement("figure");
        figureElement.dataset.id = works[i].id;
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title ?? "(No Title)";
		imageElement.setAttribute("crossorigin","anonymous");
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = work.title ?? "(No Figcaption)";

        // On rattache la balise figure au div
        divGallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
	}
}

generateGallery(allWorks);


////////////////////////////////////////////////////////button publier les changements
const btnUpdate = document.querySelector("#btn_update");
btnUpdate.addEventListener("click", function(){
    updateAllWorks();
    generateGallery(allWorks);
});

////////////////////////////////////////////////////////////////gestion des filter bouttons 

////click on one category, switch this category button's color to white and other's to green 
function changeBtnCtgColors(self, others){
    document.querySelector(self).style.backgroundColor = "#1D6154";
    document.querySelector(self).style.color = "white";

    others.forEach((element)=>{
        document.querySelector(element).style.backgroundColor = "white";
        document.querySelector(element).style.color = "#1D6154";
    })
}
const btnAll = document.querySelector(".allCategory");

btnAll.addEventListener("click", function () {
    generateGallery(allWorks);
    changeBtnCtgColors(".allCategory", [".objCategory",".appCategory",".hrCategory"]);
});

const btnObject = document.querySelector(".objCategory");

btnObject.addEventListener("click", function () {
    const worksObj = allWorks.filter(function (work) {
        return work.categoryId == 1;
    });
    generateGallery(worksObj);
    changeBtnCtgColors(".objCategory", [".allCategory",".appCategory",".hrCategory"]);
});

const btnAppartment = document.querySelector(".appCategory");

btnAppartment.addEventListener("click", function () {
    const worksApp = allWorks.filter(function (work) {
        return work.categoryId == 2;
    });
    generateGallery(worksApp);
    changeBtnCtgColors(".appCategory", [".allCategory",".objCategory",".hrCategory"]);
});

const btnHR = document.querySelector(".hrCategory");

btnHR.addEventListener("click", function () {
    const worksHR = allWorks.filter(function (work) {
        return work.categoryId == 3;
    });
    generateGallery(worksHR);
    changeBtnCtgColors(".hrCategory", [".allCategory",".objCategory",".appCategory"]);
});

/////////////////////////////////////////////////////////generate the elements in window modify


function generateTobeEdit(works) {
	// Récupération de l'élément du DOM qui accueillera les photos
	const divWorks = document.querySelector("#works");
    divWorks.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
		const oneWork = document.createElement("div");
        const work = works[i];
        // Création des balises 
        const imgWork = document.createElement("img");
        imgWork.id = work.id;
        imgWork.src = work.imageUrl;
        imgWork.alt = work.title ?? "(No Title)";
		imgWork.setAttribute("crossorigin","anonymous");
		const btnEdit = document.createElement("button");
        btnEdit.classList.add("edit");
		btnEdit.innerText = "éditer";

        const moveIcon = document.createElement("i");
        moveIcon.classList.add("fa-solid");
        moveIcon.classList.add("fa-up-down-left-right");
        moveIcon.classList.add("fa-sm");
        const delIcon = document.createElement("i");
        delIcon.classList.add("fa-solid");
        delIcon.classList.add("fa-trash");
        delIcon.classList.add("fa-sm");
        
        delIcon.id = work.id;

        // On rattache la balise au div
		divWorks.appendChild(oneWork);
        oneWork.appendChild(imgWork);
        oneWork.appendChild(moveIcon);
        oneWork.appendChild(delIcon);
		oneWork.appendChild(btnEdit);
	}
}
//////////////////////////////////add click event listener to every delete icon on every photo
//////////////////////////because addEventListener doesn't work on the elements generated, 
//////////////////////////so bind delete function to the parent element

const delFunc = document.getElementById("works");
delFunc.addEventListener("click", async function(event){
    
    let tagTrash = event.target.classList.contains("fa-trash");
    let id = event.target.id;
    if(tagTrash){
        let confirmDel = confirm("Êtes-vous sûr de supprimer cette photo?");
        if(confirmDel==true){
            const res = await fetch("http://localhost:5678/api/works/"+id,{
                method:"DELETE",
                headers:{
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }
            });
            if(res.status==204){
            alert("Une photo a été supprimée.");
            }else{
            alert("Échec de la suppression.");
            }

        }
        // updateAllWorks();
        // generateGallery(allWorks);
        // generateTobeEdit(allWorks);
    }
});
//////////////////////////show or hide the window modify with a layer who covers other elements 
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".overlay");
var openModalBtn = document.querySelector(".btnModify");
var closeModalBtn = document.querySelector(".btnClose");
var btnAdd = document.querySelector("#btnAdd");
var sectionPortfolio = document.querySelector("#portfolio");
//function button "modifier"
const openModal = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
	generateTobeEdit(allWorks);
};
openModalBtn.addEventListener("click", openModal);
//function button X on window modify
const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};
closeModalBtn.addEventListener("click", closeModal);
//overlay clicked: close window modify or window adding photo
const closeWindows = function(){
    closeModal();
    if(document.getElementById("addWork") != null){
        sectionPortfolio.removeChild(document.getElementById("addWork"));
    }
}
overlay.addEventListener("click", closeWindows);

///////////////////////////////////////////////////////////////////delete all

const delAll= document.querySelector("#btnDeleteAll");
delAll.addEventListener("click",async function(){
    
    let res = confirm("Êtes-vous sûr de supprimer tous?");
    if(res==true){
        allWorks.forEach(async (element)=>{
           
            const res = await fetch("http://localhost:5678/api/works/"+parseInt(element.id),{
                method:"DELETE",
                headers:{
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }
            })
        });
    }     
});


//////////////////////////////////////fonction of button "Ajouter une photo", hide modify window, generate a window for adding a work


/////////////////////////////////////////////////////////Récupération des categories 
var ctg = window.localStorage.getItem('ctg');
var inputCount;
if (ctg === null) {
    // Récupération des categories depuis l'API
    const reponse = await fetch('http://localhost:5678/api/categories');
    ctg = await reponse.json();
    // Transformation des categories en JSON
    const valeurCtg = JSON.stringify(ctg);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("ctg", valeurCtg);
} else {
    ctg = JSON.parse(ctg);
}
///////////////////////////////////////////generate all the categories in a select
function listCategories(ctg){
	const divCtg = document.querySelector("#optionCtg");
	const optDefault = document.createElement("option");
	optDefault.value = 0;
	optDefault.innerText="";
	divCtg.appendChild(optDefault);
    for (let i = 0; i < ctg.length; i++) {
		// Création des balises 
		const opt = document.createElement("option");
        const category = ctg[i];
        
        opt.innerText = category.name;
		opt.value = category.id;

        // On rattache la balise au div
		divCtg.appendChild(opt);
	}
}
//create all the elements on window for adding new work
btnAdd.addEventListener("click", function(){
    //hide window for modify
	modal.classList.add("hidden");
    //generate parent div
    const addModel = document.createElement("div");
    addModel.id="addWork";
    sectionPortfolio.appendChild(addModel);
    //generate a div for button X and button <---
    const operation = document.createElement("div");
    operation.id="operation";

    const iconReturn = document.createElement("i");
    iconReturn.classList.add("fa-solid");
    iconReturn.classList.add("fa-arrow-left");
    iconReturn.classList.add("fa-2x");
    iconReturn.id = "btnEsc";

    const iconClose = document.createElement("i");
    iconClose.classList.add("fa-sharp");
    iconClose.classList.add("fa-solid");
    iconClose.classList.add("fa-xmark");
    iconClose.classList.add("fa-2x");
    iconClose.id = "btnAddClose";

    addModel.appendChild(operation);
    operation.appendChild(iconReturn);
    operation.appendChild(iconClose);
    //generate a form for update a photo
    const form_work = document.createElement("form");
    form_work.id = "form_work";
    form_work.enctype="multipart/form-data";

    const h2Title = document.createElement("h2");
    h2Title.innerText = "Ajout photo";

    addModel.appendChild(form_work);
    form_work.appendChild(h2Title);
    //generate a div for input
    const upload_div = document.createElement("div");
    upload_div.id = "upload_div";

    const icon_img = document.createElement("i");
    icon_img.classList.add("fa-solid");
    icon_img.classList.add("fa-image");
    icon_img.classList.add("fa-4x");

    const btnUpload = document.createElement("a");
    btnUpload.href = "#";
    btnUpload.innerText = "+ Ajouter photo";
    btnUpload.id="btn_upload";
    

    const upload_input = document.createElement("input");
    upload_input.id = "upload_input";
    upload_input.type = "file";
    upload_input.name = "file";
    upload_input.accept = ".jpg, .png";
    btnUpload.appendChild(upload_input);
    
    
    
    const tip_p = document.createElement("p");
    tip_p.innerText = "jpg, png : 4mo max";

    //generate a img hidden for laterly showing the uploaded photo
    const show = document.createElement("img");
    show.id = "show";
    show.src = "";
    show.classList.add("hidden");

    upload_div.appendChild(icon_img);
    upload_div.appendChild(btnUpload);
    upload_div.appendChild(tip_p);
    upload_div.appendChild(show);
    form_work.appendChild(upload_div);
    
    //generate an input for photo's title and a select for photo'category
    const label1 = document.createElement("label");
    label1.innerText = "Titre";
    const inputTitle = document.createElement("input");
    inputTitle.id="title";
    inputTitle.name = "title";
    inputTitle.type = "text";

    const label2 = document.createElement("label");
    label2.innerText = "Catégorie";
    const optionCtg = document.createElement("select");
    optionCtg.id = "optionCtg";
    optionCtg.name = "optionCtg";

    const line = document.createElement("div");
    line.id="line_valid";

    const btnSend = document.createElement("input");
    btnSend.id="send";
    btnSend.type = "submit";
    btnSend.value = "Valider";
    line.appendChild(btnSend);

    form_work.appendChild(label1);
    form_work.appendChild(inputTitle);
    form_work.appendChild(label2);
    form_work.appendChild(optionCtg);
    form_work.appendChild(line);
   
	document.querySelector("#optionCtg").innerHTML = "";
	listCategories(ctg);
    //initiate form's input number for validation
    inputCount=0;
    document.getElementById('send').disabled = true;

});



////////////////////////////////////////function button valider
sectionPortfolio.addEventListener("submit", async function (event){
    event.preventDefault();
    // Création de l’objet du nouvel work.
    const formData = new FormData();
    formData.append("image", event.target.querySelector("[name=file]").files[0]);
    formData.append("title", event.target.querySelector("[name=title]").value);
    formData.append("category", parseInt(event.target.querySelector("[name=optionCtg]").value));
    
    // Appel de la fonction fetch avec toutes les informations nécessaires
    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        //headers: { "Content-Type": "application/json" },
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("token")},
        body: formData
    });
    if(response.status==201){
        alert("Votre photo a été téléchargée.");
    }else{
        alert("Le téléchargement de la photo a échoué: "+response.status);
    }
    
})
//get photo'url
function getObjectURL(file) {
	let url = null ;

	if (window.createObjectURL!=undefined) { // basic
		url = window.createObjectURL(file) ;
	} else if (window.URL!=undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file) ;
	} else if (window.webkitURL!=undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file) ;
	}
	return url ;
}
 ////////////////////////////valid check for the new photo's data: url, title and category

sectionPortfolio.addEventListener("change", function(event){
   
    if((event.target.id=="upload_input")&&(event.target.value!="")){
        //////////////////////////////////////show this photo in the input zone
        var newSrc=getObjectURL(document.getElementById('upload_input').files[0]);
        var imgSize = document.getElementById('upload_input').files[0].size;  
        if(imgSize>(1024*1024*4)){//4M
            return alert("Des photos jusqu'à 4mo peuvent être téléchargées");
        }else{
            document.getElementById('show').classList.remove("hidden");
            document.getElementById('show').src=newSrc;
            
            document.getElementById('upload_div').classList.add("hidden");
            document.getElementById('upload_input').classList.add("hidden");
        }

        inputCount++;
    }
    if((event.target.value!=="")&&(event.target.id=="title")){
        inputCount++;
    }
    if((event.target.id=="optionCtg")&&(event.target.value>0)){
        inputCount++;
    }
    if(inputCount>2){
        document.getElementById('send').disabled = false;
        document.getElementById('send').style.backgroundColor="#1D6154";
        document.getElementById('send').style.color = "white";
    }
 
})


////////////////////////////////////////function button X and button <---
sectionPortfolio.addEventListener("click", function(event){
    //event.stopPropagation();
    let whichButton = event.target.id;
    switch(whichButton){
        case 'btnAddClose':
            overlay.classList.add("hidden");
            sectionPortfolio.removeChild(document.getElementById("addWork"));
            break;
        case 'btnEsc':
            sectionPortfolio.removeChild(document.getElementById("addWork"));
            modal.classList.remove("hidden");
            break;
    }
      
})

