// Текущая выбранная часть тела
let currentPart = 'head';

// Объект для хранения данных из JSON
let partOptions = {};
const selectedIndices = {
    head: 0,
    torso: 0,
    legs: 0
};

// Загрузка данных из JSON файла
fetch('images.json')
    .then(response => response.json())
    .then(data => {
        partOptions = data; // Сохраняем данные из JSON
        updateImages(); // Обновляем изображения после загрузки
        updateText(); // Обновляем текст
    })
    .catch(error => console.error('Ошибка загрузки данных из JSON:', error));

// Функция обновления миниатюр в зависимости от выбранной части
function updateImages() {
    const selectedPartImages = partOptions[currentPart];
    const currentIndex = selectedIndices[currentPart];
    const selectedImage = selectedPartImages[currentIndex];

    // Обновляем основное изображение и изображение на фигуре
    document.getElementById('selected-image').src = selectedImage;
    document.getElementById(currentPart).src = selectedImage;

    // Обновляем миниатюры
    let thumbnailsContainer = document.getElementById('image-thumbnails');
    thumbnailsContainer.innerHTML = '';

    selectedPartImages.forEach((imageUrl, index) => {
        let imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.classList.add('image-thumbnail');
        if (index === currentIndex) imgElement.classList.add('selected');

        imgElement.onclick = function () {
            document.getElementById('selected-image').src = imageUrl;
            document.getElementById(currentPart).src = imageUrl;
            selectedIndices[currentPart] = index;
            updateImages();
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
    document.getElementById('selected-part').innerText = partText[currentPart];
}

// Перелистывание частей тела
function changePart(direction) {
    const parts = ['head', 'torso', 'legs'];
    let currentIndex = parts.indexOf(currentPart);
    currentIndex = (currentIndex + direction + parts.length) % parts.length;
    currentPart = parts[currentIndex];
    updateText();
    updateImages();
}

document.getElementById('next-part').addEventListener('click', () => changePart(1));
document.getElementById('prev-part').addEventListener('click', () => changePart(-1));

// Смена изображения (вперед/назад)
function changeImage(direction) {
    const selectedPartImages = partOptions[currentPart];
    let currentIndex = selectedIndices[currentPart];
    currentIndex = (currentIndex + direction + selectedPartImages.length) % selectedPartImages.length;
    selectedIndices[currentPart] = currentIndex;
    const selectedImage = selectedPartImages[currentIndex];

    document.getElementById('selected-image').src = selectedImage;
    document.getElementById(currentPart).src = selectedImage;
}

document.getElementById('right-image').addEventListener('click', () => changeImage(1));
document.getElementById('left-image').addEventListener('click', () => changeImage(-1));

// Подсказки и их обработка
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.info-btn');
    const tooltips = document.querySelectorAll('.tooltip');

    buttons.forEach((button, index) => {
        const icon = button.querySelector('.info-icon');

        button.addEventListener('click', () => {
            toggleTooltip(tooltips[index]);

            if (icon.classList.contains('active')) {
                icon.classList.remove('active');
            } else {
                icon.classList.add('active');
                setTimeout(() => icon.classList.remove('active'), 2000);
            }
        });
    });

    function toggleTooltip(tooltip) {
        if (tooltip.classList.contains('active')) {
            tooltip.classList.remove('active');
        } else {
            document.querySelectorAll('.tooltip').forEach(t => t.classList.remove('active'));
            tooltip.classList.add('active');
            setTimeout(() => tooltip.classList.remove('active'), 2000);
        }
    }
});
