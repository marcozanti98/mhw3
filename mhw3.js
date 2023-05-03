//funzione che cerca una poesia
function cerca(event){

    event.preventDefault();
    //leggi campo di testo
    const content = document.querySelector('#content').value;

    //verifico che ci sia del testo
    if(content){
        const text = encodeURIComponent(content);
        console.log('sto cercando riguardo a ' + text);

        const titolo = document.querySelector('#content').value;
        console.log('cerco riguardo a:' + titolo);

        const tipo= document.querySelector('#tipo').value;

        if(tipo === "poesia"){

        poesia_richiesta = poesia_endpoint + text + '/title,lines';
        fetch(poesia_richiesta).then(onResponse).then(onJson_poesia);
        }else if(tipo === 'libro'){
        libro_richiesta=  libro_endpoint + 'inauthor:' + text + '&key=AIzaSyBkpbgsAe7SNkV4MO_JtSQhqofAweFwhyE'
        fetch(libro_richiesta).then(onResponse).then(onJson_libro);
        }
    }else {
        alert("Hai lasciato la barra di ricerca vuota :(");
    }
    library.classList.remove('hidden');
}


function onJson_libro(json){
  console.log('JSON libri ricevuto');
  console.log(json);

  library.innerHTML = '';

  const array_libri=json.items;
  
  //controllo che esistano dei libri 
  if(!array_libri){
    alert("Nessun libro trovato (ricorda di inserire il nome dell'autore) :(");
  }else{

  for(i=0; i<array_libri.length; i++) {

  const libro_img = json.items[i].volumeInfo.imageLinks.smallThumbnail;
  const libro_titolo = json.items[i].volumeInfo.title;

  //controllo che ci siano sia titolo che immagine del libro
  if( !libro_img || !libro_titolo){
    i++ }
  else {  
  //creo il div che conterrà immagine e titolo del libro
  const spazio_img_libro = document.createElement('div');
  spazio_img_libro.classList.add('spazio_libro');
  //creo l'immagine  
  const img = document.createElement('img');
  img.src = libro_img;
  //creo il titolo
  const title = document.createElement('span');
  title.textContent= libro_titolo;
  //aggiungo immagine e titolo
  spazio_img_libro.appendChild(img);
  spazio_img_libro.appendChild(title);
  //aggiungo il div alla libreria
  library.appendChild(spazio_img_libro);
} }
} }



function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }



function onJson_poesia(json){
    console.log(json);
    //svuoto libreria
    library.innerHTML = '';

    const risultato = json[0];

    //controllo che ci sia la poesia richiesta
    if(!risultato){
      alert( " Nessuna poesia trovata, prova ad inserire il titolo in Inglese :( ");
    }else{

    const spazio_poesia = document.createElement('div');
    spazio_poesia.classList.add('spazio_poesia');
    results = json[0].lines;
    console.log(results);
    
    for( i=0; i<results.length; i++){
      results=json[0].lines[i];
      console.log(results);      
      const versi = document.createElement('h1');
      versi.textContent = results;
      spazio_poesia.appendChild(versi);
      library.appendChild(spazio_poesia);
    }
  }
}


//funzione che chiude 'api-view' quando viene cliccata e ritorna al punto di partenza
function chiudi_api(event){
  library.classList.add('hidden');
  library.innerHTML= '';
  window.scroll(0,600);

}

// Aggiungo un event listener al form per la RICERCA
const form = document.querySelector('#search_content');
form.addEventListener('submit', cerca);

//aggiungo un event listener sull'api-view per chiuderla quando viene cliccata
const library = document.querySelector('#api-view');
library.addEventListener('click', chiudi_api);

const poesia_endpoint = 'https://poetrydb.org/title/';
const libro_endpoint = 'https://www.googleapis.com/books/v1/volumes?q=';

let results;