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

const selectedIndices = {
    head: 0,
    torso: 0,
    legs: 0
};

// Функция обновления миниатюр в зависимости от выбранной части
function updateImages() {
    const selectedPartImages = partOptions[currentPart];
    const currentIndex = selectedIndices[currentPart]; // Получаем сохраненный индекс
    const selectedImage = selectedPartImages[currentIndex]; // Берем изображение по индексу
    
    document.getElementById('selected-image').src = selectedImage;
    document.getElementById(currentPart).src = selectedImage; // Обновляем картинку на человеке

    // Обновляем миниатюры
    let thumbnailsContainer = document.getElementById('image-thumbnails');
    thumbnailsContainer.innerHTML = ''; // Очищаем старые миниатюры

    selectedPartImages.forEach((imageUrl, index) => {
        let imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.classList.add('image-thumbnail');
        if (index === currentIndex) imgElement.classList.add('selected'); // Подсветка выбранной миниатюры
        
        imgElement.onclick = function() {
            document.getElementById('selected-image').src = imageUrl;
            document.getElementById(currentPart).src = imageUrl;
            selectedIndices[currentPart] = index; // Сохраняем индекс при клике
            updateImages(); // Обновляем миниатюры
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
    let currentIndex = selectedIndices[currentPart]; // Берем текущий индекс
    currentIndex = (currentIndex + 1) % selectedPartImages.length; // Сдвиг вперед
    selectedIndices[currentPart] = currentIndex; // Сохраняем индекс

    document.getElementById('selected-image').src = selectedPartImages[currentIndex];
    document.getElementById(currentPart).src = selectedPartImages[currentIndex]; // Обновляем картинку на человеке
});

document.getElementById('left-image').addEventListener('click', () => {
    const selectedPartImages = partOptions[currentPart];
    let currentIndex = selectedIndices[currentPart]; // Берем текущий индекс
    currentIndex = (currentIndex - 1 + selectedPartImages.length) % selectedPartImages.length; // Сдвиг назад
    selectedIndices[currentPart] = currentIndex; // Сохраняем индекс

    document.getElementById('selected-image').src = selectedPartImages[currentIndex];
    document.getElementById(currentPart).src = selectedPartImages[currentIndex]; // Обновляем картинку на человеке
});

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.info-btn'); // Кнопки
    const tooltips = document.querySelectorAll('.tooltip'); // Подсказки

    buttons.forEach((button, index) => {
        const icon = button.querySelector('.info-icon'); // Ищем иконку внутри кнопки

        button.addEventListener('click', () => {
            // Переключаем состояние подсказки
            toggleTooltip(tooltips[index]);

            // Переключаем эффект яркости на иконке
            if (icon.classList.contains('active')) {
                // Если эффект уже активен, удаляем его немедленно
                icon.classList.remove('active');
            } else {
                // Иначе добавляем эффект яркости
                icon.classList.add('active');
                // Убираем эффект через 2 секунды, если не было повторного клика
                setTimeout(() => {
                    icon.classList.remove('active');
                }, 2000);
            }
        });
    });

    function toggleTooltip(tooltip) {
        if (tooltip.classList.contains('active')) {
            tooltip.classList.remove('active'); // Скрываем подсказку
        } else {
            document.querySelectorAll('.tooltip').forEach(t => t.classList.remove('active')); // Скрываем другие подсказки
            tooltip.classList.add('active'); // Показываем выбранную подсказку

            setTimeout(() => tooltip.classList.remove('active'), 2000); // Автоматическое скрытие через 2 секунды
        }
    }
});


// Инициализация изображения и текста при загрузке
updateImages();
updateText();
