var dataLink = "https://docs.google.com/spreadsheets/d/1P-6rgqU9mipblhcLXVVBQ8IYQm44gRhavxgeCECQbzw/edit?usp=sharing";
//Login window
function showLogin(){
	var overlayDiv = document.createElement("div");
	overlayDiv.className="loginOverlay";
	var exitBut = document.createElement("div");
	exitBut.className = "exitBut";
	exitBut.setAttribute("onclick","loginExit()");
	var exitText = document.createElement("p");
	exitText.innerHTML="X";
	exitBut.appendChild(exitText);
	overlayDiv.appendChild(exitBut);
	var nameText=document.createElement("p");
	nameText.className="loginText";
	nameText.innerHTML="Username:";
	overlayDiv.appendChild(nameText);
	var nameInput = document.createElement("input");
	nameInput.setAttribute("type","text");
	nameInput.className="loginInput w3-input";
	overlayDiv.appendChild(nameInput);
	var passwordText = document.createElement("p");
	passwordText.className="loginText";
	passwordText.innerHTML="Password:";
	overlayDiv.appendChild(passwordText);
	var passwordInput = document.createElement("input");
	passwordInput.className="loginInput w3-input";
	passwordInput.setAttribute("type","password");
	overlayDiv.appendChild(passwordInput);
	var loginBut = document.createElement("button");
	loginBut.className="w3-button w3-orange loginBut";
	overlayDiv.appendChild(loginBut);
	var loginText = document.createElement("p");
	loginText.innerHTML="Login";
	loginBut.appendChild(loginText);
	var body=document.getElementsByTagName("body")[0];
	body.appendChild(overlayDiv);
	console.log("kok");
	
	
}


function Application(name,author,downloaded){
	this.name = name;
	this.author = author;
	this.downloaded = downloaded;

	this.getName=function(){ return this.name;}
	this.getAuthor=function(){ return this.author;}
}
var apps=[];
var loaded = false;
function init() {
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1P-6rgqU9mipblhcLXVVBQ8IYQm44gRhavxgeCECQbzw/edit?usp=sharing',
                   callback: function(data, tabletop) {
						for(row = 0; row < data.length; row++){
							apps.push(new Application(data[row]["Name"],data[row]["Author"],data[row]["Downloaded"]));
						}
						
					var searchBox = document.getElementById("Search");
					searchBox.addEventListener("keyup",function(event){
					if(event.keyCode==13){
						Search();
					}
					});	 
						
                       nameSort(apps);
                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init);

var sortType = "downloadDesc";

function nameSort(){
	apps.sort(function(a, b){
		var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
		//if(sortType!="nameAsc"){
    		if (nameA < nameB) //sort by name ascending
    			return -1;
    		if (nameA > nameB)
      			return 1;
    		return 0 //default return value (no sorting)
		/*}else if(sortType=="nameAsc"){ //If it is already sorted by name switch the order
			if (nameA > nameB) //sort by name descending
    			return -1;
    		if (nameA < nameB)
      			return 1;
    		return 0 //default return value (no sorting)	
		}*/	
	}); 
	
	//sortType=="nameDesc" ? sortType="nameAsc":sortType="nameDesc";
	//console.log(sortType);
	populateList(apps);
}


function authorSort(){
	apps.sort(function(a, b){
		var authorA=a.author.toLowerCase(), authorB=b.author.toLowerCase();
	//	if(sortType!="authorAsc"){
    		if (authorA < authorB) //sort by name ascending
    			return -1;
    		if (authorA > authorB)
      			return 1;
    		return 0 //default return value (no sorting)
	/*	}else if(sortType=="authorAsc"){ //If it is already sorted by name switch the order
			if (authorA > authorB) //sort by name descending
    			return -1;
    		if (authorA < authorB)
      			return 1;
    		return 0 //default return value (no sorting)	
		}	*/
	});		
	// sortType=="authorDesc" ? sortType="authorAsc":sortType="authorDesc";
	populateList(apps);
}

function downloadedSort(){
	apps.sort(function(a, b){
		var downloadedA=parseInt(a.downloaded);
		var downloadedB=parseInt(b.downloaded);
	//	if(sortType!="downloadedAsc"){
	//		console.log("dis");
	//		return downloadedA-downloadedB;
	//	}else if(sortType=="downloadedAsc"){
	//		console.log("dat");
		return downloadedB-downloadedA;			
	//	}
	//	return 0;
	});
	//sortType=="downloadDesc"? sortType="downloadAsc" : sortType="downloadDesc";
	populateList(apps);
}

function populateList(apps){
	var listDiv = document.getElementById("Programs");
	while(listDiv.firstChild){ //Deleting the previous apps
		listDiv.removeChild(listDiv.firstChild);
		
	}
	
	apps.forEach(function(app,index){
		var appDiv = document.createElement("div"); 
		appDiv.className="appDiv";
		appDiv.setAttribute("onClick","appInfo("+index+")"); //onclick
		var nameDiv = document.createElement("div");
		nameDiv.className = "nameDiv";
		var appName = document.createElement("h2");
		appName.innerHTML = app.getName();
		nameDiv.appendChild(appName);
		var authorDiv = document.createElement("div");
		authorDiv.className="authorDiv";
		var authorName = document.createElement("h2");
		authorName.innerHTML = app.getAuthor();
		authorDiv.appendChild(authorName);
		var downloadedDiv = document.createElement("div");
		var downloaded = document.createElement("h2");
		downloadedDiv.className="downloadedDiv";
		downloaded.innerHTML = app.downloaded;
		downloadedDiv.appendChild(downloaded);
		
		appDiv.appendChild(nameDiv);
		appDiv.appendChild(authorDiv);
		appDiv.appendChild(downloadedDiv);
		
		listDiv.appendChild(appDiv);
	});
}

function appInfo(index){
	app = apps[index];
	var body = document.getElementsByTagName("body")[0];
	var exitDiv = document.createElement("div");
	exitDiv.className="exitDiv";
	exitDiv.setAttribute("onClick","infoExit()");
	body.appendChild(exitDiv);
	var overlayDiv = document.createElement("div");
	overlayDiv.className="overlay";
	body.appendChild(overlayDiv);
	var nameH=document.createElement("h3");
	nameH.className="appName";
	nameH.innerHTML=app.name;
	overlayDiv.appendChild(nameH);
	var authorH = document.createElement("h3");
	authorH.className="authorName";
	authorH.innerHTML="by:" + app.author;
	overlayDiv.appendChild(authorH);
	var downloadBut = document.createElement("button");
	downloadBut.className="w3-button overbutton";
	var downloadText = document.createElement("p");
	downloadText.className="overbuttontext";
	downloadText.innerHTML="DOWNLOAD";
	downloadBut.appendChild(downloadText);
	overlayDiv.appendChild(downloadBut);
	overlayDiv.appendChild(document.createElement("br"));
	var contributeBut = document.createElement("button");
	contributeBut.className="w3-button overbutton";
	var contributeText = document.createElement("p");
	contributeText.className="overbuttontext";
	contributeText.innerHTML="CONTRIBUTE";
	contributeBut.appendChild(contributeText);
	overlayDiv.appendChild(contributeBut);
	var exitBut = document.createElement("div");
	exitBut.className=("exitBut");
	exitBut.setAttribute("onclick","infoExit()");
	var exitText = document.createElement("p");
	exitText.innerHTML="X";
	exitBut.appendChild(exitText);
	overlayDiv.appendChild(exitBut);
	
}

function infoExit(){
	var overlayDiv=document.getElementsByClassName("overlay")[0];
	var exitDiv = document.getElementsByClassName("exitDiv")[0];
	while(overlayDiv.firstChild){
		overlayDiv.removeChild(overlayDiv.firstChild);
	}
	overlayDiv.parentNode.removeChild(overlayDiv);
	exitDiv.parentNode.removeChild(exitDiv);
}

function loginExit(){
	var overlayDiv=document.getElementsByClassName("loginOverlay")[0];
	console.log("EXIT");
	while(overlayDiv.firstChild){
		overlayDiv.removeChild(overlayDiv.firstChild);
	}
	overlayDiv.parentNode.removeChild(overlayDiv);
	
}


function Search(){
	var searchBox = document.getElementById("Search");
	sname = searchBox.value;
	var searchedApps = [];
	apps.forEach(function(app,index){
		if(app.name.includes(sname) || app.author.includes(sname)){
			searchedApps.push(app);
		}
	});
	apps = searchedApps;
	populateList(apps);
	
}
	