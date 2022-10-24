/*  -----------------------------------------------------------------------------------------------
    Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
    Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post.
    Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
    - id del post, numero progressivo da 1 a n
    - nome autore,
    - foto autore,
    - data in formato americano (mm-gg-yyyy),
    - testo del post,
    - immagine (non tutti i post devono avere una immagine),
    - numero di likes.
    *Non è necessario creare date casuali*
    *Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)*
    Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
    Milestone 3- Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
    Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
    BONUS
    1. Formattare le date in formato italiano (gg/mm/aaaa)
    2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
    3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
--------------------------------------------------------------------------------------------------- */

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Prendo il div#container dal DOM
const containerHTML = document.getElementById('container');

// Creo un'array per contenere tutti i post in cui è stato cliccato il bottone "Mi Piace"
let likedPost = [];

createPost(); // Richiamo la funzione per la creazione dei Post

// Funzione per la creazione dei Post
function createPost(){
    posts.forEach((element) => {

        // Creo il div con tutto il contenuto dei post
        const post = document.createElement('div');
        post.innerHTML = `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${element.author.image}" alt="${element.author.name}">                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${element.author.name}</div>
                        <div class="post-meta__time">${element.created}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${element.content}</div>
            <div class="post__image">
                <img src="${element.media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#nogo" data-postid="${element.id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>`

        containerHTML.append(post); // Appendo il post al container
    });
}

const bottoneMiPiace = document.querySelectorAll('.likes__cta');
function miPiace() {    
    const a = document.querySelector('.js-like-button');
    for(let i = 0; i < bottoneMiPiace.length; i++) {
        // Prendo l'ancora e verifico se è stato cliccato
        if(!likedPost.includes(posts[i].id)) {
            a.classList.add('text-primary');
            posts[i].likes++;
            contatoreLike(true, posts[i].id);
            console.log(likedPost);
        } else {
            a.classList.remove('text-primary');
            posts[i].likes--;
            contatoreLike(false, posts[i].id);
            console.log(likedPost);
        }
    }
}


function miPiaceOver() {
    for(let i = 0; i < posts.length; i++) {
        if(likedPost.includes(posts[i].id)) {
            document.querySelectorAll('.like-button__label').innerHTML = ' Non Mi Piace Più';
        }
    }
}

function miPiaceLeave() {
    document.querySelector('.like-button__label').innerHTML = ' Mi Piace';
}

for(let element of bottoneMiPiace) {
    element.addEventListener('click', miPiace);
    element.addEventListener('mouseover', miPiaceOver);
    element.addEventListener('mouseleave', miPiaceLeave);
}


function contatoreLike(bool, id) {
    const counter = document.getElementById(`like-counter-${id}`);
    if(bool) {
        counter.innerHTML++;
        likedPost.push(id);
    } else {
        counter.innerHTML--;
        const index = likedPost.indexOf(id);
        likedPost.splice(index, 1);
    }
}