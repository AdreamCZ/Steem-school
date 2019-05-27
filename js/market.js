var dataLink = "https://docs.google.com/spreadsheets/d/1P-6rgqU9mipblhcLXVVBQ8IYQm44gRhavxgeCECQbzw/edit?usp=sharing";
function Application(name,author,downloaded){
	this.name = name;
	this.author = author;
	this.downloaded = downloaded;

	this.getName=function(){ return this.name;}
	this.getAuthor=function(){ return this.author;}
}
var apps=[];
function init() {
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1P-6rgqU9mipblhcLXVVBQ8IYQm44gRhavxgeCECQbzw/edit?usp=sharing',
                   callback: function(data, tabletop) {
						for(row = 0; row < data.length; row++){
							apps.push(new Application(data[row]["Name"],data[row]["Author"],data[row]["Downloaded"]));
						}
                       populateList(apps);
                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init);
var sortType = "";

function nameSort(){
	apps.sort(function(a, b){
		var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
		if(sortType!="nameAsc"){
			sortType="nameAsc";
    		if (nameA < nameB) //sort by name ascending
    			return -1;
    		if (nameA > nameB)
      			return 1;
    		return 0 //default return value (no sorting)
		}else if(sortType=="nameAsc"){ //If it is already sorted by name switch the order
			sortType="nameDesc";
			if (nameA > nameB) //sort by name descending
    			return -1;
    		if (nameA < nameB)
      			return 1;
    		return 0 //default return value (no sorting)	
		}	
	});		
	populateList(apps);
}

function authorSort(){
	apps.sort(function(a, b){
		var authorA=a.author.toLowerCase(), authorB=b.author.toLowerCase();
		if(sortType!="authorAsc"){
			sortType="authorAsc";
    		if (authorA < authorB) //sort by name ascending
    			return -1;
    		if (authorA > authorB)
      			return 1;
    		return 0 //default return value (no sorting)
		}else if(sortType=="authorAsc"){ //If it is already sorted by name switch the order
			sortType="authorDesc";
			if (authorA > authorB) //sort by name descending
    			return -1;
    		if (authorA < authorB)
      			return 1;
    		return 0 //default return value (no sorting)	
		}	
	});		
	populateList(apps);
}

function downloadedSort(){
	apps.sort(function(a, b){
		var downloadedA=parseInt(a.downloaded);
		var downloadedB=parseInt(b.downloaded);
		if(sortType!="downloadedAsc"){
			console.log("dwnASC");
			sortType="downloadedAsc";
			return downloadedA-downloadedB;
		}else if(sortType=="downloadedAsc"){
			console.log("dwnDESC");
			sortType="downloadedDesc";
			return downloadedB-downloadedA;			
		}
		return 0;
	});
	populateList(apps);
}

function populateList(apps){
	
	var listDiv = document.getElementById("Programs");
	while(listDiv.firstChild){
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
	var contributeBut = document.createElement("button");
	contributeBut.className="w3-button overbutton";
	var contributeText = document.createElement("p");
	contributeText.className="overbuttontext";
	contributeText.innerHTML="CONTRIBUTE";
	contributeBut.appendChild(contributeText);
	overlayDiv.appendChild(contributeBut);
	
}

function infoExit(){
	var overlayDiv=document.getElementsByClassName("overlay")[0];
	var exitDiv = document.getElementsByClassName("exitDiv")[0];
	console.log("Exit");
	while(overlayDiv.firstChild){
		overlayDiv.removeChild(overlayDiv.firstChild);
	}
	overlayDiv.parentNode.removeChild(overlayDiv);
	exitDiv.parentNode.removeChild(exitDiv);
}
	