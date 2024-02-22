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
let selectObjects = {
    firstObjct:"",
    seconsObjct:"",
    selectCouple: false,
};
let timerStatistics = {
    timerId:"",
    clock: new Date(0,0,0,0,0,0),
    countAttempts: 0,
}
const originBody = document.querySelector("body");

createMenu(originBody);

function startGame(sourcesGifs, countImg, timer) {
    const containerCouple = document.querySelector("main.container");
    containerCouple.textContent = "";
    timer.timerId = fillStatistics(timer);

    redrawGame(sourcesGifs,countImg, timer.timerId);

    return timer.timerId;
}

function createMenu(originBody) {
    let menu = document.querySelector("main.menu-container");
    const containerCouple = document.querySelector("main.container");
    containerCouple.textContent = "";
    if (!menu) {
        menu = document.createElement("main");
        menu.classList.add("menu-container");
         menu .innerHTML= `<h1>Найди Пару</h1>
                            <h2> Выбери сложность</h2>`;

        menu.appendChild(createBtnMenu(10));
        menu.appendChild(createBtnMenu(12));
        menu.appendChild(createBtnMenu(14));
        menu.appendChild(createBtnMenu(16));

        originBody.prepend(menu);
    } else {
        menu.style !== "display:none"  ? menu.style = "display:grid" : menu.style = "display:none";
    }



}

function fillStatistics(timer) {
    const containerCouple = document.querySelector("main.container");
    const statistics = document.createElement("div");
    statistics.id = "statistics";
    statistics.innerHTML = `<h2 id="time">Время</h2>
    <h3 id="attempts">Попыток:</h3>`;

    containerCouple.appendChild(statistics);

    const time = document.getElementById("time");
    const attempts = document.getElementById("attempts");

    return setInterval(()=>{
        timer.clock.setSeconds(timer.clock.getSeconds()+1)
        time.textContent = `Время ${timer.clock.getHours() ? timer.clock.getHours()+":" :""} 
                                ${timer.clock.getMinutes() ? timer.clock.getMinutes()+":" :""}
                                ${timer.clock.getSeconds()}`;
        attempts.textContent =`Попыток:${timer.countAttempts}`;
    },1000);

}

function createBtnMenu(countCard) {
    const btnMenu = document.createElement("button");
    btnMenu.textContent = `${countCard} карт`;
    btnMenu.classList.add("SelectGame");
    btnMenu.addEventListener("click", ()=> {
        timerStatistics.countAttempts = 0;
        timerStatistics.clock = new Date(0,0,0,0,0,0);
        timerStatistics.timerId = startGame(sourcesGifs,countCard,timerStatistics);
        document.querySelector("main.menu-container").style = "display:none";
    })

    return btnMenu;
}

function redrawGame(sourcesGifs, count, timerId) {
    const containerCouple = document.querySelector("main.container");

    containerCouple.appendChild(createContainerCouple(sourcesGifs, count));
    containerCouple.appendChild(createBtnBackMenu(timerId));
}

function createContainerCouple(sourcesGifs, count) {
    const tableCourple = document.createElement("div");
    tableCourple.classList.add("container-couple",`couple-${count}`);
    let gifs =[];
    let newSourcesGifs = sourcesGifs.slice();
    shuffle(newSourcesGifs);
    for (let i=0; i<(count/2); i++) {
        let gif = {
            id: "id" + Math.random().toString(16).slice(2),
            srcGif: newSourcesGifs[i],
            couple: false,
        }
        gifs.push(gif)
        gifs.push(gif)
    }
    shuffle(gifs);
    for (let i=0; i<(count); i++) {
        tableCourple.appendChild(createCourp(gifs[i], i));
    }

    return tableCourple;
}

function randomMinMax(min, max) {
    return  Math.floor(Math.random() * (max - (min)) + (min))
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = randomMinMax(1, i);
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCourp(sourceGif,idCard) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.id = idCard;
    element.innerHTML = `
        <div class="front-card"></div>
        <img class="back-card" value="${sourceGif.id}" src="${sourceGif.srcGif}" alt="">
    `;
    element.addEventListener("click", (ev)=> {
        let statusEvent = eventRotateCard(ev.target, selectObjects);
        selectObjects = statusEvent.selectObjcts;
         if (statusEvent.selectCouple) {
             timerStatistics.countAttempts++;
             setTimeout(didPlayerWin,2000,timerStatistics.timerId, originBody);
             setTimeout(()=> selectObjects.selectCouple = false, 1000);
         }
    })

    return element;
}

function eventRotateCard(target, selectObjects) {
    let card = findCard(target);
    const cardFront = card.querySelector(".front-card");
    const cardBack = card.querySelector(".back-card");
    let newSelectObjects = selectObjects;
    if (!cardBack.classList.contains("couples") && !selectObjects.selectCouple){
        if (selectObjects.firstObjct !== "") {
            if (findCard(selectObjects.firstObjct).id !== card.id){
                cardFront.classList.toggle("front-card-active");
                cardBack.classList.toggle("back-card-active");
                selectObjects.seconsObjct = cardBack;
                setTimeout(changeCouple, 1200, selectObjects, checkCouple(selectObjects));
                newSelectObjects = {
                    firstObjct:"",
                    seconsObjct:"",
                    selectCouple:true,
                }
            } 

            return {selectObjcts:newSelectObjects, selectCouple:true};
        } else {
            cardFront.classList.toggle("front-card-active");
            cardBack.classList.toggle("back-card-active");

            selectObjects.firstObjct = cardBack;
        }
    }

    return {selectObjcts:selectObjects, selectCouple:false};
}

function findCard(target) {
    if (target.classList[0] !== "card"){
        return target.parentNode;
    } else {
        return target;
    }
}

function checkCouple(selectObjct) {
    return selectObjct.firstObjct.attributes.value.value === selectObjct.seconsObjct.attributes.value.value;
}

function changeCouple(selectObjcts, statusCouple) {
    if (statusCouple) {
        selectObjcts.firstObjct.classList.add("couples");
        selectObjcts.seconsObjct.classList.add("couples");
    } else {
        let firstCard = findCard(selectObjcts.firstObjct);
        let secondCard = findCard(selectObjcts.seconsObjct);

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

function createBtnBackMenu(timerId) {
    const btnMenu = document.createElement("button");
    btnMenu.textContent = "Меню";
    btnMenu.classList.add("back-menu");
    btnMenu.addEventListener("click", ()=> {
        createMenu(originBody);
        clearTimeout(timerId);
        originBody.classList.remove("bg-confetti-animated");
    })

    return btnMenu;
}

function didPlayerWin(timerId, originBody) {
    let cards = document.querySelectorAll("div.card img");
    if (cards.length !== 0 && checkAllCard(cards)){
        originBody.classList.add("bg-confetti-animated");
        clearTimeout(timerId);
    }
}

function checkAllCard(cards) {
    for (const card of cards) {
        if (card.classList[card.classList.length-1] !== "couples"){
            return false;
        }
    }
    return true;
}