class TShirt {
    name;
    description;
    path;
    tags;
    liked;

    constructor(name, description, path, tags, liked = false) {
        this.name = name;
        this.description = description;
        this.path = path;
        this.tags = tags;
        this.liked = liked;
    }
}

tshirts = [
    new TShirt('Komori Soda', 'A cute black shirt with a pink Komori Soda print.', 'public/shirt1.jpg', ['black', 'soda', 'pink', 'animal'], true),
    new TShirt('Cat King', 'A fat cat sitting in a lavender colored castle as a throne.', 'public/shirt2.jpg', ['white', 'purple, lavender', 'cat', 'castle', 'animal']),
    new TShirt('Moon cat', 'A cute vampire cat sitting on a moon', 'public/shirt3.jpg', ['pink', 'cat', 'moon','blue','vampire', 'animal']),
    new TShirt('Zombie Teddy', 'A cute plush bear sewn from different parts.', 'public/shirt4.jpg', ['bear', 'pink', 'animal', 'zombie']),
    new TShirt('Goth Cat', 'A pastel goth skeleton cat.', 'public/shirt5.webp', ['black', 'cat', 'skeleton', 'pastel', 'goth', 'animal']),
    new TShirt('Goth Rabbit', 'A goth pastel witchy rabbit.', 'public/shirt6.webp', ['black', 'witch', 'rabbit', 'pastel', 'goth', 'animal']),
    new TShirt('Goth Eye', 'A goth pastel eye.', 'public/shirt7.webp', ['black', 'eye', 'pastel', 'goth', 'animal']),
    new TShirt('Goth Skeleton', 'A goth cute death reaper.', 'public/shirt8.webp', ['black', 'pink', 'pastel', 'goth', 'skeleton']),
    new TShirt('Goth Rabbit', 'A fat witchy cat.', 'public/shirt9.webp', ['cat', 'pink', 'witch', 'pastel', 'goth', 'animal']),
    new TShirt('Chill Pills', 'Very cute pills that will delete your girlfiend.', 'public/shirt10.webp', ['white', 'pastel', 'medicine', 'ops']),
    new TShirt('Alien Cat', 'Cat is going to space!', 'public/shirt11.webp', ['blue', 'cat', 'pastel', 'alien', 'animal']),
    new TShirt('Cute Goat', 'A very cute deadly goat.', 'public/shirt12.webp', ['pink', 'goat', 'pastel', 'animal']),
    new TShirt('Fatass Cat', 'A cat who should start dieting.', 'public/shirt13.webp', ['white', 'cat', 'food', 'pastel', 'animal']),
    new TShirt('Coffee Baphomet', 'Even the devil needs coffee.', 'public/shirt14.webp', ['blue', 'goat', 'food', 'pastel', 'animal']),
];

const audioOn = new Audio("public/click.wav");
audioOn.volume = 0.3;
const audioOff = new Audio("public/click-off.wav");
audioOff.volume = 0.3;
const select = new Audio("public/select.wav");
select.volume = 0.2;

const ns = "http://www.w3.org/2000/svg";

document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('grid');
    console.log("Starting");
    if (localStorage.tshirts)   {
        console.log("Loading from local storage");
        tshirts = JSON.parse(localStorage.tshirts);
        tshirts[0].liked = true;
    } else {
        localStorage.tshirts = JSON.stringify(tshirts);
    }
    tshirts.forEach((tshirt, index) => {
        const gridItem = document.createElement('button');
        gridItem.classList.add('grid-item');
        gridItem.id = `grid-item-${index}`;

        const img = document.createElement('img');
        img.src = tshirt.path;
        img.alt = tshirt.name;


        const heart = document.createElementNS(ns, 'svg');
        heart.setAttribute('viewBox', '0 0 24 24')
        heart.setAttribute('data-index', index);
        heart.classList.add('grid-heart')
        heart.id = `grid-heart-${index}`;
        if (tshirt.liked) {
            heart.classList.add('liked');
        }
        if (index == 0) {
            gridItem.classList.add('selected');
        }

        let path = document.createElementNS(ns, "path")
        path.setAttributeNS(null, "d", "m23.85806,7.05914c0,-3.27414 -2.76556,-5.92902 -6.17674,-5.92902c-2.54948,0 -4.73928,1.48358 -5.68133,3.6009c-0.94205,-2.11732 -3.13185,-3.6009 -5.68265,-3.6009c-3.40853,0 -6.17541,2.65488 -6.17541,5.92902c0,9.51281 11.85806,15.81074 11.85806,15.81074s11.85806,-6.29796 11.85806,-15.81074z")
        heart.appendChild(path)

        gridItem.appendChild(img);
        gridItem.appendChild(heart);
        grid.appendChild(gridItem);

        gridItem.addEventListener('click', function () {
            displayShirt(tshirt, gridItem, index);
            history.pushState({ index: index }, `TShirt ${index}`, `?shirt=${index}`);
            select.play();
        });
        if (index == 0) {
            displayShirt(tshirt, gridItem, index);
        }
    });

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.index !== undefined) {
            const index = event.state.index;
            const tshirt = tshirts[index];
            const gridItem = document.getElementById(`grid-item-${index}`);
            displayShirt(tshirt, gridItem, index);
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const shirtIndex = urlParams.get('shirt');
    if (shirtIndex !== null) {
        const index = parseInt(shirtIndex);
        if (!isNaN(index) && index >= 0 && index < tshirts.length) {
            const tshirt = tshirts[index];
            const gridItem = document.getElementById(`grid-item-${index}`);
            displayShirt(tshirt, gridItem, index);
            history.pushState({ index: index }, `TShirt ${index}`, `?shirt=${index}`);
        } else {
            history.pushState({ index: 0 }, 'TShirt 0', '?shirt=0');
        }
    } else {
        history.pushState({ index: 0 }, 'TShirt 0', '?shirt=0');
    }
});

function displayShirt(tshirt, gridItem, index) {
    const currentShirtImg = document.getElementById('current-shirt-img');
    const currentShirtName = document.getElementById('current-shirt-name');
    const currentShirtDesc = document.getElementById('current-shirt-desc');
    const currentShirtTags = document.getElementById('current-shirt-tags');
    const currentHeart = document.getElementById('current-heart');
    const currentSelected = document.querySelector('.selected');
    currentSelected.classList.remove('selected');

    currentShirtImg.src = tshirt.path;
    currentHeart.setAttribute('data-index', index);
    currentShirtName.textContent = tshirt.name;
    currentShirtDesc.textContent = tshirt.description;
    currentShirtTags.textContent = `Tags: ${tshirt.tags.join(', ')}`;
    gridItem.classList.add('selected');

    if (tshirt.liked) {
        currentHeart.classList.add('liked');
    } else {
        currentHeart.classList.remove('liked');
    }

    const separator = document.getElementById('search-bar');
    separator.scrollIntoView({behavior: "smooth"})

    // $('html,body').animate({
        // scrollTop: $("#search-bar").offset().top},
        // 'slow');
}

useFilterBar = function () {
    const search = document.getElementById('search-bar').value.split(',').map(tag => tag.toLowerCase().trim());
    const btn = document.getElementsByClassName('filter-button')[0];
    console.log(btn.checked);
    console.log(search);
    tshirts.forEach((tshirt, index) => {
        const gridItem = document.getElementById(`grid-item-${index}`);
        if (search.length === 1 && search[0] === '') {
            gridItem.style.display = 'flex';
            if (btn.checked) {
                if (!tshirt.liked) {
                    gridItem.style.display = 'none';
                } else {
                    gridItem.style.display = 'flex';    
                }
            }
        } else {
            let found = false;
            search.forEach(tag => {
                if (tshirt.tags.includes(tag)) {
                    found = true;
                }
            });
            if (found) {
                gridItem.style.display = 'flex';
            } else {
                gridItem.style.display = 'none';
            }
            if (btn.checked) {
                if (tshirt.liked && found) {
                    gridItem.style.display = 'flex';
                } else {
                    gridItem.style.display = 'none';    
                }
            }
        }
    });
 };

document.getElementById('current-heart').addEventListener('click', () => {
    const heart = document.getElementById('current-heart');
    const data_index = heart.getAttribute('data-index');
    const index = parseInt(data_index);
    tshirts[index].liked = !tshirts[index].liked;
    const gridHeart = document.getElementById(`grid-heart-${index}`);
    gridHeart.classList.toggle('liked');
    if (tshirts[index].liked) {
        audioOff.play();
    } else {
        audioOn.play();
    }
    heart.classList.toggle('liked');

    let filterButton = document.getElementsByClassName('filter-button')[0];
    if (filterButton.checked) {
        if (!tshirts[index].liked) {
            document.getElementById(`grid-item-${index}`).style.display = 'none';
        } else {
            document.getElementById(`grid-item-${index}`).style.display = 'flex';
        }
    }
    localStorage.tshirts = JSON.stringify(tshirts);
});
