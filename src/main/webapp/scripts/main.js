
function haeAsiakkaat(){
	let url = "asiakkaat?hakusana=" + document.getElementById("hakusana").value;
	let requestOptions = {
			method: "GET",
			headers:{"Content-Type": "application/x-www-form-urlencoded"}
	};
	fetch (url, requestOptions)
	.then(response => response.json())
	.then(response => printItems(response))
	.catch(errorText => console.error("Fetch failed: " + errorText));
				
			} 
function printItems(respObjList){
	//console.log(respObjList);
	let htmlStr="";
	for(let item of respObjList){//yksi kokoelmalooppeista		
    	htmlStr+="<tr id='rivi_"+item.asiakas_id+"'>";
    	htmlStr+="<td>"+item.etunimi+"</td>";
    	htmlStr+="<td>"+item.sukunimi+"</td>";
    	htmlStr+="<td>"+item.puhelin+"</td>";
    	htmlStr+="<td>"+item.sposti+"</td>";   
    	htmlStr+="<td>"+"<td><a href='muutaasiakas.jsp?asiakas_id="+item.asiakas_id+"'>Muuta</a>&nbsp;";  
		htmlStr+="<td><span class = 'poista' onclick=varmistaPoisto('"+item.asiakas_id+",'"+encodeURI(item.sposti)+"')>Poista</span></td>";	
    	htmlStr+="</tr>";    	
	}	
	document.getElementById("tbody").innerHTML = htmlStr;	
}
function tutkiJaLisaa() {
	if(tutkiTiedot()){
		lisaaTiedot();
	}
	
}
function tutkiJaPaivita(){
	if(tutkiTiedot()){
		paivitaTiedot();
	}
	}
function tutkiTiedot(){
	let ilmo="";
	let d = new Date ();
	if(document.getElementById("etunimi").value.length<50){
		ilmo="etunimi ei kelpaa"
		document.getElementById("etunimi").focus();
		} else if (document.getElementById("sukunimi").value.length<50){
			ilmo="sukunimi ei kelpaa";
			document.getElementById("sukunimi").focus();
			
		} else if(document.getElementById("puhelin").value.length<20){
		ilmo="puhelin ei kelpaa";
		document.getElementById("puhelin").focus();
	}
	else if (document.getElementById("sposti").value.length<100){
		ilmo="sähköposti ei kelpaa";
		document.getElementById("sposti").focus();
	
		}
		if(ilmo!=""){
			document.getElementById("ilmo").innerHTLM=ilmo;
			setTimeout(function(){document.getElementById("ilmo").innerHTML="";},3000);
			return false;
		}else{
			document.getElementById("etunimi").value=siivoa(document.getElementById("etunimi").value.length)
			document.getElementById("sukunimi").value=siivoa(document.getElementById("sukunimi").value.length)
			document.getElementById("puhelin").value=siivoa(document.getElementById("puhelin").value.length)
			document.getElementById("sposti").value=siivoa(document.getElementById("sposti").value.length)
		return true;
		}
		function siivoa (teksti){
			teksti=teksti.replace(/</g,"");//&lt;
			teksti=teksti.replace(/>/g,"");//&lt;
			teksti=teksti.replace(/'/g,"");//&lt;
			
			return teksti;
		}
	function lisaaTiedot(){
		let formData = serialize_form(lomake);
		//console.log(formData);
		let url="asiakkaat";
		let requestOption = {
			method: "POST",
			headers: {"Content-Type": "application/json; charset=UTF-8"},
			body: formData
		};
		fetch (url, requestOptions)
		.then(response => response.json())
		.then(responseObj => {
			if (responseObj.response==0){
				document.getElementById("ilmo").innerHTML="Asiakkaan lisäys epäonnistui.";
				
			}else if (responseObj.response==1){
				document.getElementById("ilmo").innerHTML="Asiakkaan lisäys onnistui";
				document.lomake.reset();
			}
		})
		.catch(errorText => console.error("Fetch failed: " + errorText));
	}
	
function varmistaPoisto(asiakas_id,sposti){
	if(confirm("Poista asiakas " + decodeURI(sposti)+"?")) {
		poistaAsiakas(asiakas_id, encode(sposti));
	}
}
function poistaAsiakas(asiakas_id,sposti){
	let url ="asiakkaat?id" + id;
	let requestOptions= {
		method:"DELETE",
		headers: {"Content-Type": "application/json"},
			};
		fetch(url, requestOptions)
		.then(response => response.json())
		.then(responseObj => {
		if (responseObj.response==0){
				alert("Asiakkaan poisto epäonnistui.");
				
			}else if (responseObj.response==1){
				document.getElementById("rivi_"+asiakas_id).style.backgroundColor="red";
				alert("Asiakkaan " + decodeURI(sposti) + " poisto onnistui. ");
				haeAsiakkaat;
			}	
		
	})
}
function haeAsiakas(){
	let url = "asiakkaat?asiakas_id=" + requestURLParam("id"); //requestURLParam() on funktio, jolla voidaan hakea urlista arvo avaimen perusteella. Löytyy main.js -tiedostosta 	
	//console.log(url);
    let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }       
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
   	.then(response => {
   		//console.log(response);
   		document.getElementById("asiakas_id").value=response.asiakas_id;
   		document.getElementById("etunimi").value=response.etunimi;
   		document.getElementById("sukunimi").value=response.sukunimi;
   		document.getElementById("puhelin").value=response.puhelin;
   		document.getElementById("sposti").value=response.sposti;
   	}) 
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}
function paivitaTiedot(){
	let formData = serialize_form(lomake);
	let url = "asiakkaat";
	let requestOptions = {
		method: "PUT",
		headers: { "Content-Type":"application/json; charset=UTF-8"},
		body: formData
			
		};
		fetch(url, requestOptions)
		.then(response => response.json())
		.then(responseObj => {
			if(responseObj.response==0){
				document.getElementById("ilmo").innerHTML = "Asiakkaan muutos epäonnistui. ";
				} else if (responseObj.response==1){
					document.getElementById("ilmo").innerHTML = "Asiakkaan muutos onnistui.";
					document.lomake.reset();
				}
			})
			.catch(errorText => console.error("Fetch failed: " + errorText));
			}
	

}
