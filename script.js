let currentPart = 'head'; // Изначально показываем голову

// Ссылки на изображения для каждой части тела
const partOptions = {
    head: [
        'https://imgur.com/6toXVN5.jpg', 
        'https://imgur.com/BsnmHJp.jpg' // Добавляем несколько вариантов изображений
    ],
    torso: [
        'https://imgur.com/aTjW0jd.jpg',
        'https://imgur.com/yVeDF2M.jpg' // Добавляем несколько вариантов изображений
    ],
    legs: [
        'https://imgur.com/2kcmZGf.jpg',
        'https://imgur.com/ClKnI7K.jpg' // Добавляем несколько вариантов изображений
    ]
};

// Функция обновления миниатюр в зависимости от выбранной части
function updateImages() {
    const selectedPartImages = partOptions[currentPart];
    const selectedImage = selectedPartImages[0]; // Берем первое изображение для начала
    document.getElementById('selected-image').src = selectedImage;
    
    // Обновляем миниатюры внизу
    let thumbnailsContainer = document.getElementById('image-thumbnails');
    thumbnailsContainer.innerHTML = ''; // Очищаем старые миниатюры

    selectedPartImages.forEach((imageUrl, index) => {
        let imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.classList.add('image-thumbnail');
        imgElement.onclick = function() {
            document.getElementById('selected-image').src = imageUrl; // Меняем большое изображение
            document.getElementById(currentPart).src = imageUrl; // Меняем картинку на человеке
        };
        thumbnailsContainer.appendChild(imgElement);
    });
}

// Функция обновления текста
function updateText() {
    const partText = {
        head: 'Голова',
        torso: 'Торс',
        legs: 'Ноги'
    };

    document.getElementById('selected-part').innerText = partText[currentPart]; // Меняем текст в выбранной части
}

// Перелистывание частей тела
document.getElementById('next-part').addEventListener('click', () => {
    const parts = ['head', 'torso', 'legs'];
    let currentIndex = parts.indexOf(currentPart);
    currentIndex = (currentIndex + 1) % parts.length;
    currentPart = parts[currentIndex];
    updateText(); // Обновляем текст
    updateImages(); // Обновляем изображения для выбранной части
});

document.getElementById('prev-part').addEventListener('click', () => {
    const parts = ['head', 'torso', 'legs'];
    let currentIndex = parts.indexOf(currentPart);
    currentIndex = (currentIndex - 1 + parts.length) % parts.length;
    currentPart = parts[currentIndex];
    updateText(); // Обновляем текст
    updateImages(); // Обновляем изображения для выбранной части
});

// Стрелки для смены изображения
document.getElementById('right-image').addEventListener('click', () => {
    const selectedPartImages = partOptions[currentPart];
    const currentIndex = selectedPartImages.indexOf(document.getElementById('selected-image').src);
    const nextIndex = (currentIndex + 1) % selectedPartImages.length;
    document.getElementById('selected-image').src = selectedPartImages[nextIndex];
    document.getElementById(currentPart).src = selectedPartImages[nextIndex]; // Обновляем картинку на человеке
});

document.getElementById('left-image').addEventListener('click', () => {
    const selectedPartImages = partOptions[currentPart];
    const currentIndex = selectedPartImages.indexOf(document.getElementById('selected-image').src);
    const prevIndex = (currentIndex - 1 + selectedPartImages.length) % selectedPartImages.length;
    document.getElementById('selected-image').src = selectedPartImages[prevIndex];
    document.getElementById(currentPart).src = selectedPartImages[prevIndex]; // Обновляем картинку на человеке
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.info-btn'); // Кнопка подсказки
    const tooltips = document.querySelectorAll('.tooltip'); // Текст подсказки
    let hideTimeout;

    buttons.forEach((button, index) => {
        button.addEventListener('click', function () {
            toggleTooltip(tooltips[index]);
        });

        button.addEventListener('touchstart', function (e) {
            e.preventDefault(); // Отключаем "двойное нажатие" на телефоне
            toggleTooltip(tooltips[index]);
        });
    });

    function toggleTooltip(tooltip) {
        clearTimeout(hideTimeout); // Очищаем старый таймер

        if (tooltip.style.visibility === 'visible') {
            tooltip.style.visibility = 'hidden'; // Скрываем подсказку
        } else {
            tooltip.style.visibility = 'visible'; // Показываем подсказку
            hideTimeout = setTimeout(() => {
                tooltip.style.visibility = 'hidden'; // Автоматически скрываем через 2 сек
            }, 2000);
        }
    }
});

// Инициализация изображения и текста при загрузке
updateImages();
updateText();
