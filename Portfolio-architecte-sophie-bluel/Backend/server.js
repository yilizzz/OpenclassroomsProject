//gardian, if it's logged in, show the modify fonction, otherwise hide the button

if(localStorage.getItem('token') != "none"){
	document.querySelector(".btnModify").style.display="block";
	document.querySelector("#logout").style.display="block";
	document.querySelector("#login").style.display="none";
	
}else{
	document.querySelector(".btnModify").style.display="none";
	document.querySelector("#logout").style.display="none";
	document.querySelector("#login").style.display="block";
}
const linkLogin=document.querySelector("#login");
linkLogin.addEventListener("click", function () {
	window.location.replace("login.html");
});
const linkLogout=document.querySelector("#logout");
linkLogout.addEventListener("click", function () {
	localStorage.setItem("token", "none");
	location.reload();
});


//Récupération des works eventuellement stockées dans le localStorage
let works = window.localStorage.getItem('works');


if (works === null) {
    // Récupération des works depuis l'API
    const reponse = await fetch('http://localhost:5678/api/works/');
    works = await reponse.json();
    // Transformation des works en JSON
    const valeurWorks = JSON.stringify(works);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("works", valeurWorks);
} else {
    works = JSON.parse(works);
}

function generateGallery(works) {
	// Récupération de l'élément du DOM qui accueillera les photos
	const divGallery = document.querySelector(".gallery");
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

generateGallery(works);

//gestion des filter bouttons 
const btnAll = document.querySelector(".allCategory");

btnAll.addEventListener("click", function () {
	document.querySelector(".gallery").innerHTML = "";
    generateGallery(works);
});

const btnObject = document.querySelector(".objCategory");

btnObject.addEventListener("click", function () {
    const worksObj = works.filter(function (work) {
        return work.categoryId == 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(worksObj);
});

const btnAppartment = document.querySelector(".appCategory");

btnAppartment.addEventListener("click", function () {
    const worksApp = works.filter(function (work) {
        return work.categoryId == 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(worksApp);
});

const btnHR = document.querySelector(".hrCategory");

btnHR.addEventListener("click", function () {
    const worksHR = works.filter(function (work) {
        return work.categoryId == 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(worksHR);
});

//get works for window modify

function generateTobeEdit(works) {
	// Récupération de l'élément du DOM qui accueillera les photos
	const divWorks = document.querySelector("#works");
    for (let i = 0; i < works.length; i++) {
		const oneWork = document.createElement("div");
        const work = works[i];
        // Création des balises 
        const imgWork = document.createElement("img");
        imgWork.src = work.imageUrl;
        imgWork.alt = work.title ?? "(No Title)";
		imgWork.setAttribute("crossorigin","anonymous");
		const btnEdit = document.createElement("button");
		btnEdit.innerText = "edit";

        // On rattache la balise au div
		divWorks.appendChild(oneWork);
        oneWork.appendChild(imgWork);
		oneWork.appendChild(btnEdit);
	}
}
// show or hide the window modify with a layer who covers other elements 
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btnModify");
const closeModalBtn = document.querySelector(".btnClose");


const openModal = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
	document.querySelector("#works").innerHTML = "";
	generateTobeEdit(works);
};
openModalBtn.addEventListener("click", openModal);

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
	//addModal.classList.add("hidden");
};
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//window for add a work
const addModal = document.querySelector(".addWork");


//Récupération des categories 
let ctg = window.localStorage.getItem('ctg');

if (ctg === null) {
    // Récupération des works depuis l'API
    const reponse = await fetch('http://localhost:5678/api/categories');
    ctg = await reponse.json();
    // Transformation des works en JSON
    const valeurCtg = JSON.stringify(ctg);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("ctg", valeurCtg);
} else {
    ctg = JSON.parse(ctg);
}
//generate all the categories in a select
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
//fonction of button "Ajouter une photo", hide modify window, show adding window, list all the categories in a select
const btnAdd = document.querySelector("#btnAdd");

const inputElement = document.getElementById("upload_input");
const uploadDiv = document.querySelector("#upload_div");
const icon = document.querySelector("#icon_img");

btnAdd.addEventListener("click", function(){
	modal.classList.add("hidden");
	addModal.classList.remove("hidden");
	document.getElementById('show').classList.add("hidden");
	uploadDiv.classList.remove("hidden");
	inputElement.classList.remove("hidden");
	icon.classList.remove("hidden");
	document.querySelector("#optionCtg").innerHTML = "";
	listCategories(ctg);
});
//button X for close the window adding a work
const btnAddClose = document.querySelector("#btnAddClose");
const closeAddModal = function () {
	addModal.classList.add("hidden");
	overlay.classList.add("hidden");
};
btnAddClose.addEventListener("click", closeAddModal);
//button <-- for return the the window modify
const btnEsc = document.querySelector("#btnEsc");
const returnModify = function(){
	addModal.classList.add("hidden");
	modal.classList.remove("hidden");
};
btnEsc.addEventListener("click", returnModify);
//get photo'url
function getObjectURL(file) {
	var url = null ;

	if (window.createObjectURL!=undefined) { // basic
		url = window.createObjectURL(file) ;
	} else if (window.URL!=undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file) ;
	} else if (window.webkitURL!=undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file) ;
	}
	return url ;
}
//when input load a photo, show the photo on position where input was
inputElement.addEventListener("change", function(){

	var newSrc=getObjectURL(this.files[0]);
	var imgSize = this.files[0].size;  
	if(imgSize>(1024*1024*4)){//4M
		return alert("Des photos jusqu'à 4mo peuvent être téléchargées");
	}else{
		document.getElementById('show').classList.remove("hidden");
		document.getElementById('show').src=newSrc;
		
		uploadDiv.classList.add("hidden");
		inputElement.classList.add("hidden");
		icon.classList.add("hidden");
	}
	
});

function ListenerEnvoyerNewwork() {
	const formWork = document.querySelector("#form_work");
	formWork.addEventListener("submit", async function (event) {
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
			headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")},
			body: formData
		}).then(response => response.json());
		console.log(response);
		console.log(works);
		if(response.title!=""){
			alert("upload suceed");
		}else{
			alert("upload failed");
		}
	});
	
 }
 // on appel la fonction pour ajouter le listener au formulaire
 ListenerEnvoyerNewwork();