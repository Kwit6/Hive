// Данные для сайта
const data = {
    classes: {
        1: ['Математика', 'Русский язык', 'Природоведение'],
        2: ['Математика', 'Чтение', 'Окружающий мир'],
        3: ['Математика', 'Литература', 'Музыка']
    },
    topics: {
        1: { // Темы для класса 1
            'Математика': ['Алгебра', 'Геометрия'],
            'Русский язык': ['Грамматика', 'Синтаксис'],
            'Природоведение': ['Экосистемы', 'Организмы']
        },
        2: { // Темы для класса 2
            'Математика': ['Числа', 'Дроби'],
            'Чтение': ['Литературные произведения', 'Словарный запас'],
            'Окружающий мир': ['Природа', 'Животные']
        },
        3: { // Темы для класса 3
            'Математика': ['Уравнения', 'Геометрия'],
            'Литература': ['Поэзия', 'Проза'],
            'Музыка': ['Инструменты', 'Композиции']
        }
    },
    details: {
        'Алгебра': {
            title: 'Основные правила',
            content: 'Алгебра — это раздел математики, изучающий уравнения и функции.',
            image: 'path_to_image/algebra.png'
        },
        'Геометрия': {
            title: 'Основные фигуры',
            content: 'Геометрия — это раздел математики, изучающий формы и их свойства.',
            image: 'path_to_image/geometry.png'
        },
        'Числа': {
            title: 'Введение в числа',
            content: 'Числа — это основа математики, они используются для счета.',
            image: 'path_to_image/numbers.png'
        }
    }
};

// Состояние приложения
const appState = {
    currentView: 'classes', // Текущий экран
    currentData: null, // Данные текущего экрана
    previousViews: [] // История предыдущих экранов
};

// Отображение интерфейса
function renderView(view, currentData) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    if (view === 'classes') {
        // Очистка истории на главной странице
        appState.previousViews = [];
        contentDiv.innerHTML = '<h2>Выберите класс:</h2>';
        Object.keys(data.classes).forEach(cls => {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.textContent = `${cls} класс`;
            panel.onclick = () => navigateTo('subjects', cls);
            contentDiv.appendChild(panel);
        });
    } else if (view === 'subjects') {
        contentDiv.innerHTML = `<button onclick="goBack()">Назад</button><h2>Выберите предмет:</h2>`;
        data.classes[currentData].forEach(subject => {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.textContent = subject;
            panel.onclick = () => navigateTo('topics', { class: currentData, subject: subject });
            contentDiv.appendChild(panel);
        });
    } else if (view === 'topics') {
        contentDiv.innerHTML = `<button onclick="goBack()">Назад</button><h2>Выберите тему:</h2>`;
        const { class: classId, subject } = currentData;
        (data.topics[classId] && data.topics[classId][subject] || []).forEach(topic => {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.textContent = topic;
            panel.onclick = () => navigateTo('details', topic);
            contentDiv.appendChild(panel);
        });
    } else if (view === 'details') {
        const topicDetails = data.details[currentData];
        contentDiv.innerHTML = `<button onclick="goBack()">Назад</button>`;
        if (topicDetails) {
            contentDiv.innerHTML += `
                <h2>${topicDetails.title}</h2>
                <p>${topicDetails.content}</p>
                ${topicDetails.image ? `<img src="${topicDetails.image}" alt="${currentData}" class="topic-image">` : ''}
            `;
        } else {
            contentDiv.innerHTML += `<p>Нет данных для этой темы.</p>`;
        }
    }
}

// Навигация между экранами
function navigateTo(view, currentData) {
    // Сохраняем текущий экран в историю перед переходом
    appState.previousViews.push({ view: appState.currentView, data: appState.currentData });
    appState.currentView = view;
    appState.currentData = currentData;
    renderView(view, currentData);
}

// Возврат к предыдущему экрану
function goBack() {
    if (appState.previousViews.length > 0) {
        const previousState = appState.previousViews.pop();
        appState.currentView = previousState.view;
        appState.currentData = previousState.data;

        // Показать кнопки для выбора предмета/темы/класса
        if (previousState.view === 'classes') {
            renderView('classes', null);
        } else if (previousState.view === 'subjects') {
            renderView('subjects', previousState.data);
        } else if (previousState.view === 'topics') {
            renderView('topics', previousState.data);
        }
    }
}

// Первоначальный рендеринг
renderView('classes', null);
