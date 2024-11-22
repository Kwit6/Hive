// Данные для сайта (обновленный пример)
const data = {
    classes: {
        8: ['Алгебра', 'Геометрия', 'Физика', 'Теория вероятности и статистика', 'ОБЗР', 'Литература', 'Русский язык', 'Информатика', 'Биология', 'Химия', 'Английский язык', 'География', 'История', 'Обществознание']
    },
    topics: {
        8: {
            'Алгебра': ['ФСУ', 'Квадратные уравнения'],
            'Геометрия': ['Геометрические фигуры', 'Теорема Фаллеса'],
			'Физика': ['Законы Ньютона', 'Удельная теплота плавления']
        }
    },
    details: {
        'ФСУ': {
            title: 'ФСУ',
            content: 'Формулы сокращённого умножения (ФСУ) — это формулы, которые позволяют проводить умножение, возведение в степень чисел и многочленов сокращённо, то есть быстрее при более компактной записи решения. ',
            image: 'https://github.com/Kwit6/Hive/blob/main/FSU.jpg?raw=true',
            subtopics: [
                //{ title: 'Формула 1', description: 'Описание первой формулы.' },
                //{ title: 'Формула 2', description: 'Описание второй формулы.' }
            ]
        },
        'Геометрические фигуры': {
            title: 'Геометрические фигуры',
            content: 'Геометрия — это раздел математики, изучающий фигуры и их свойства.',
            image: 'path_to_image/geometry.png',
            subtopics: [
                { title: 'Фигура 1', description: 'Описание первой фигуры.' },
                { title: 'Фигура 2', description: 'Описание второй фигуры.' }
            ]
        },
        'Законы Ньютона': {
            title: 'Законы Ньютона',
            content: 'пупупупупупу',
            image: 'path_to_image/numbers.png',
            subtopics: [
                { title: '1 закон', description: 'Описание первого' },
				{ title: '2 закон', description: 'Описание второго' },
                { title: '3 закон', description: 'Описание третьего' }
            ]
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
                ${topicDetails.subtopics.map(subtopic => `
                    <div class="panel">
                        <h4>${subtopic.title}</h4>
                        <p>${subtopic.description}</p>
                    </div>
                `).join('')}
            `;
        } else {
            contentDiv.innerHTML += `<p>Нет данных для этой темы.</p>`;
        }
    }
}

// Навигация между экранами
function navigateTo(view, currentData) {
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
        renderView(previousState.view, previousState.data);
    }
}

// Первоначальный рендеринг
renderView('classes', null);
