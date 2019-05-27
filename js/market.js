var dataLink = "https://docs.google.com/spreadsheets/d/1P-6rgqU9mipblhcLXVVBQ8IYQm44gRhavxgeCECQbzw/edit?usp=sharing";
function Application(name,author,downloaded){
	this.name = name;
	this.author = author;
	this.downloaded = downloaded;

	this.getName=function(){ return this.name;}
	this.getAuthor=function(){ return this.author;}
}

function init() {
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1P-6rgqU9mipblhcLXVVBQ8IYQm44gRhavxgeCECQbzw/edit?usp=sharing',
                   callback: function(data, tabletop) {
						console.log(data);
                       populateList(data);
                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init);



function populateList(data){
	var apps=[];
	for(row = 0; row < data.length; row++) {
		apps.push(new Application(data[row]["Name"],data[row]["Author"],data[row]["Downloaded"]));
		
	}
	apps.forEach(function(app){
		console.log(app);
		var listDiv = document.getElementById("Programs"); //Find div with the apps	
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
	})
	
}
	