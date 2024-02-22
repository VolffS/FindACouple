const sourcesGifs = [
    "https://media.tenor.com/HGHtFPR2y90AAAAi/derpatronic.gif",
    "https://media.tenor.com/OlMxYPnyIdYAAAAi/luigi-ryan-gosling.gif",
    "https://media.tenor.com/Lm9fnfWc_IUAAAAj/ryan-gosling.gif",
    "https://media.tenor.com/g14554OiR8UAAAAi/shaking-my-head-the-fall-guy.gif",
    "https://media.tenor.com/C9LaRXK6q8sAAAAi/kenough.gif",
    "https://media1.tenor.com/m/QeKLKSruQFIAAAAC/dog-funny.gif",
    "https://media1.tenor.com/m/VoFfPBRljsIAAAAd/shaking-dog-white-dog.gif",
    "https://media1.tenor.com/m/ij7bkUkOP5EAAAAC/ryan-gosling.gif",
    "https://media1.tenor.com/m/bMorSSFEsPgAAAAd/nightcrawler-gyllenhaal.gif",
    "https://media1.tenor.com/m/yFPzoLx64WYAAAAC/hey-girl.gif",
    "https://media1.tenor.com/m/T5Z5zA7wYlEAAAAd/jake-gyllenhaal-meme.gif",
    "https://media1.tenor.com/m/Oydz4tYgQ2UAAAAd/louis-bloom.gif",
    "https://media1.tenor.com/m/Xv92ltSnupgAAAAd/gosling-sad-gosling.gif",
    "https://media1.tenor.com/m/mFMNTzQUS3UAAAAd/deadp47-мобильный-геймер.gif",
    "https://media1.tenor.com/m/4TUwey42Mz0AAAAd/xqc-meme-xqc.gif",
    "https://media1.tenor.com/m/BOgRzBdY12UAAAAd/xqcl-xqc.gif",
    "https://media1.tenor.com/m/yNMGjXsoYGUAAAAd/cat-cats.gif",
    "https://media1.tenor.com/m/rgdUmG91pLAAAAAd/tobey-cry.gif",
    "https://media1.tenor.com/m/dWTaM2MSZx4AAAAd/cat-cats.gif",
    "https://media1.tenor.com/m/GZ8zw59v19EAAAAC/nicolas-cage.gif",
    "https://media1.tenor.com/m/YFzLI0nN_vQAAAAd/nicolas-cage-smoking.gif"
];
let selectObkectes = {
    firstObjct:"",
    seconsObjct:"",
    selectCouple: false,
};
let clock = new Date();
let countAttempts = 0;
clock.setHours(0,0,0);


createMenu();

function startGame(sourcesGifs, countImg) {
    const conteinerCouple = document.querySelector("main.container");
    conteinerCouple.textContent = "";
    fillStatistics(clock, countAttempts);

    redrawGame(sourcesGifs,countImg);
}

function createMenu() {
    const conteinerCouple = document.querySelector("main.container");
    conteinerCouple.innerHTML= `<h1>Найди Пару</h1>
     <h2> Выбери сложность</h2>`;

    conteinerCouple.appendChild(createBtnMenu(10));
    conteinerCouple.appendChild(createBtnMenu(12));
    conteinerCouple.appendChild(createBtnMenu(14));
    conteinerCouple.appendChild(createBtnMenu(16));
}

function fillStatistics(clock, countAttempts) {
    const conteinerCouple = document.querySelector("main.container");
    const statistics = document.createElement("div");
    statistics.id = "statistics";
    statistics.innerHTML = `<h2 id="time">Время</h2>
    <h3 id="attempts">Попыток:</h3>`;

    conteinerCouple.appendChild(statistics);

    const time = document.getElementById("time");
    const attempts = document.getElementById("attempts");

    setInterval(()=>{
        clock.setSeconds(clock.getSeconds()+1)
        time.textContent = `Время ${clock.getHours() ? clock.getHours()+":" :""} 
                                ${clock.getMinutes() ? clock.getMinutes()+":" :""}${clock.getSeconds()}`;
        attempts.textContent =`Попыток:${countAttempts}`;
    },1000);
}

function createBtnMenu(countCard) {
    const btnMenu = document.createElement("button");
    btnMenu.textContent = `${countCard} карт`;
    btnMenu.classList.add("SelectGame");
    btnMenu.addEventListener("click", ()=> {
        countAttempts = 0;
        clock.setHours(0,0,0);
        startGame(sourcesGifs,countCard);
    })

    return btnMenu;
}

function redrawGame(sourcesGifs, count) {
    const conteinerCouple = document.querySelector("main.container");

    conteinerCouple.appendChild(createConteinerCouple(sourcesGifs, count));
    conteinerCouple.appendChild(createBtnBackMenu());
}

function createConteinerCouple(sourcesGifs, count) {
    const tableCourple = document.createElement("div");
    tableCourple.classList.add("container-couple",`couple-${count}`);
    let gifs =[];

    for (let i=0; i<(count/2); i++) {
        gifs.push({
            id: "id" + Math.random().toString(16).slice(2),
            srcGif: sourcesGifs.splice(Math.floor(Math.random() * (sourcesGifs.length - (-1)) + (-1)),1).toString(),
            countGif: 0,
            couple: false,
        })
    }
    for (let i=0; i<(count); i++) {
        while (true){
            let randomIndex = Math.floor(Math.random() * (count/2 - (0)) + (0));
            if (!gifs[randomIndex].couple && gifs[randomIndex].couple !== "waiting") {
                tableCourple.appendChild(createCourp(gifs[randomIndex], i));
                gifs[randomIndex].couple = "waiting";
                break;
            } else {
                if (gifs[randomIndex].couple === "waiting") {
                    tableCourple.appendChild(createCourp(gifs[randomIndex], i));
                    gifs[randomIndex].couple = "true";
                    break;
                }
            }
        }
    }

    return tableCourple;
}

function createCourp(sourceGif,idCard) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.id = idCard;
    element.innerHTML = `
        <div class="front-card"></div>
        <img class="back-card" value="${sourceGif.id}" src="${sourceGif.srcGif}">
    `;
    element.addEventListener("click", (ev)=> {
        let statusEvent = eventRotateCard(ev.target, selectObkectes);
        selectObkectes = statusEvent.selectObjcts;
         if (statusEvent.selectCouple)  countAttempts++;
        setTimeout(didPlayerWin,3000);
    })

    return element;
}

function eventRotateCard(target, selectObjcts) {
    let card = findCard(target);
    const cardFront = card.querySelector(".front-card");
    const cardBack = card.querySelector(".back-card");

    if (!cardBack.classList.contains("couples")){
        cardFront.classList.toggle("front-card-active");
        cardBack.classList.toggle("back-card-active");

        if (selectObjcts.firstObjct) {
            if (findCard(selectObjcts.firstObjct).id !== card.id){
                selectObjcts.seconsObjct = cardBack;
                setTimeout(changeCouple, 1200, selectObjcts, checkCouple(selectObjcts));
            }
            selectObjcts = [];

            return {selectObjcts:selectObjcts, selectCouple:true};
        } else {
            selectObjcts.firstObjct = cardBack;
        }
    }

    return {selectObjcts:selectObjcts, selectCouple:false};
}

function findCard(target) {
    if (target.classList[0] !== "card"){
        return target.parentNode;
    } else {
        return target;
    }
}

function checkCouple(selectObjc) {
    return selectObjc.firstObjct.attributes.value.value === selectObjc.seconsObjct.attributes.value.value;
}

function changeCouple(selectObjcs, bool) {
    if (bool) {
        selectObjcs.firstObjct.classList.add("couples");
        selectObjcs.seconsObjct.classList.add("couples");
    } else {
        let firstCard = findCard(selectObjcs.firstObjct);
        let secondCard = findCard(selectObjcs.seconsObjct);

        const firstCardFront = firstCard.querySelector(".front-card");
        const firstCardBack = firstCard.querySelector(".back-card");
        firstCardFront.classList.toggle("front-card-active");
        firstCardBack.classList.toggle("back-card-active");

        const secondCardFront = secondCard.querySelector(".front-card");
        const secondCardBack = secondCard.querySelector(".back-card");
        secondCardFront.classList.toggle("front-card-active");
        secondCardBack.classList.toggle("back-card-active");
    }
}

function createBtnBackMenu() {
    const btnMenu = document.createElement("button");
    btnMenu.textContent = "Меню";
    btnMenu.classList.add("back-menu");
    btnMenu.addEventListener("click", ()=> {
        createMenu();
        const container = document.querySelector("body");
        container.classList.remove("bg-confetti-animated");
    })

    return btnMenu;
}

function didPlayerWin() {
    const cards = document.querySelectorAll("div.card img");
    const container = document.querySelector("body");

    if (checkAllCard(cards)){
        container.classList.add("bg-confetti-animated");
    }
}

function checkAllCard(cards) {
    for (const card of cards) {
        if (card.classList[card.classList.length-1] !== "couples"){
            return false;
        }
    }
    return true
}