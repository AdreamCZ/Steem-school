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
    		if (nameA > nameB)
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
		var downloadedA=parseInt(a.downloaded), downloadedB=parseInt(a.downloaded);
		if(sortType!="downloadedAsc"){
			sortType="downloadedAsc";
			return 1;
		}else if(sortType=="downloadedAsc"){
			sortType="downloadedDesc";
			return -1;
			
		}
	});
	populateList(apps);
}

function populateList(apps){
	console.log(sortType);
	var listDiv = document.getElementById("Programs");
	while(listDiv.firstChild){
		listDiv.removeChild(listDiv.firstChild);
		
	}
	
	apps.forEach(function(app){
		var appDiv = document.createElement("div"); //Div for 
		appDiv.className="appDiv";
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
	