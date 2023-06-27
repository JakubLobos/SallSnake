const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let snakePos = {
    x: 200,
    y: 200
}
let velocity = 4;
let snakeMaxLength = 15;
let snakeElem = [];
let direction = {
    x: 0,
    y: 0
};
let snakeColor = "lime"
let canvasPadding = 10;
let isFoodExist = false;
let foodPos = {
    x: Math.floor(Math.random() * (canvas.width - canvasPadding + 1) + canvasPadding),
    y: Math.floor(Math.random() * (canvas.height - canvasPadding + 1) + canvasPadding),
}

const draw = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
};

const updateSnake = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Wyczyść cały obszar canvasa

    snakePos.x += direction.x;
    snakePos.y += direction.y;

    snakeElem.push({ x: snakePos.x, y: snakePos.y }); // Dodaj nowy segment węża do tablicy
    if (snakeElem.length > snakeMaxLength) {
        snakeElem.shift(); // Usuń najstarszy segment węża, jeśli przekroczono maksymalną długość
    }

    for (let i = 0; i < snakeElem.length; i++) {
        draw(snakeElem[i].x, snakeElem[i].y, snakeColor); // Narysuj wszystkie segmenty węża
    }

    if(snakePos.x <= canvasPadding || snakePos.x >= canvas.width - canvasPadding || snakePos.y <= canvasPadding || snakePos.y >= canvas.height - canvasPadding) {
        clearInterval(1)
        window.alert("YOU DIED, REFRESH PAGE TO START AGAIN")

    }

    if (Math.abs(snakePos.x - foodPos.x) < 15 && Math.abs(snakePos.y - foodPos.y) < 15) {
        isFoodExist = false;
        snakeMaxLength += 10
    }

    generateFood();
    console.log("update");
};

document.addEventListener("DOMContentLoaded", () => {
    setInterval(updateSnake, 20);
    document.addEventListener("keydown", move);
});

const move = (event) => {
    switch (event.key) {
        case "w":
            direction.y = -velocity;
            direction.x = 0;
            break;
        case "a":
            direction.x = -velocity;
            direction.y = 0;
            break;
        case "s":
            direction.y = velocity;
            direction.x = 0;
            break;
        case "d":
            direction.x = velocity;
            direction.y = 0;
            break;
    }
};

const generateFood = () => {
    if(!isFoodExist) {
        foodPos.x = Math.floor(Math.random() * (canvas.width - canvasPadding + 1) + canvasPadding);
        foodPos.y = Math.floor(Math.random() * (canvas.height - canvasPadding + 1) + canvasPadding);
    };
    draw(foodPos.x, foodPos.y, "red")
    isFoodExist = true;
}