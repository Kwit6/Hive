// Данные для сайта (обновленный пример)
const data = {
    classes: {
        8: ['Алгебра', 'Геометрия', 'Физика', 'Теория вероятности и статистика', 'ОБЗР', 'Литература', 'Русский язык', 'Информатика', 'Биология', 'Химия', 'Английский язык', 'География', 'История', 'Обществознание']
    },
    topics: {
        8: {
            'Алгебра': ['Квадратные уравнения', 'ФСУ', 'Функции и их графики'],
            'Геометрия': ['Свойства площедей', 'Теорема Фаллеса'],
			'Физика': ['Двигатель внутреннего сгорания(ДВС)', 'Удельная теплота плавления'],
			'Английский язык': ['Past Tences', 'Present Tences', 'Определенные и неопределенные артикли']
        }
    },
    details: {
        'Двигатель внутреннего сгорания(ДВС)': {
            title: 'Двигатель внутреннего сгорания(ДВС)',
            content: 'ДВС - это тепловой двигатель сгорание топлива в котором происходит внутри двигателя',
            image: '1.png',
            subtopics: [
                { title: '1 Такт - выпуск', description: 'Поршень движется сверху вниз, открывается впускной клапан, заходит горючая смесь(смесь паров бензина и воздуха)(Эта смесь образуется в карбюраторе, в него поступает воздух и бензин пройдя через воздушный и бензо насосы соответственно)'},
				{ title: '2 Такт - сжатие', description: 'Закрывается впускной клапан, поршень движется снизу вверх, сжимает горючую жидкость, в конце такта загорается свеча'},
                { title: '3 Такт - рабочий ход', description: 'Сгорающие газы под давлением толкают поршень вниз'},
				{ title: '4 Такт - выпуск', description: 'Поршень движется вверх, открывается впускной калапан, из цилиндра выходят остатки от сгоревшего газа'}
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
