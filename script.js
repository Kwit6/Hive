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
			'Английский язык': ['Past Tences', 'Present Tences', 'Определенные и неопределенные артикли'],
			'Химия': ['Использование кислорода', 'Воздух']
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
		},
			
		'Использование кислорода': {
			title: 'Использование кислорода',
			content: 'Кислород используется в различных научных сферах, здесь перечисленны самые главные из них',
			subtopics: [
				{ title: '1. Медицина', description: 'Кислород незаменим в медицине и используется в различных процедурах. Кислородная терапия помогает при респираторной недостаточности и гипоксии, а также применяется во время анестезии. ИВЛ (аппараты искусственной вентиляции легких) используют кислород для поддержания дыхания у пациентов в критическом состоянии. Барокамеры обеспечивают подачу кислорода под высоким давлением, что эффективно при лечении ожогов, хронических ран и декомпрессионной болезни.'},
				{ title: '2. Авиация', description: 'В авиации кислород обеспечивает нормальную жизнедеятельность на больших высотах. В системах жизнеобеспечения он используется для подачи пилотам и экипажу из-за низкого содержания кислорода в разреженной атмосфере. Экстренные кислородные маски позволяют пассажирам и экипажу дышать при разгерметизации самолета.'},
				{ title: '3. Сварка металлов', description: 'Газокислородная сварка невозможна без кислорода. Он усиливает горение ацетилена, создавая пламя с высокой температурой, необходимой для плавления металлов. Благодаря чистому горению швы получаются аккуратными и качественными, а рабочая зона эффективно очищается от загрязнений.'},
				{ title: '4. Резка металлов', description: 'Кислородная резка металлов основана на использовании высоких температур и активного окисления. Металл нагревается до температуры воспламенения с помощью подогревающего пламени. Окисление удаляет расплавленные частицы, что позволяет выполнять точные и ровные разрезы.'},
				{ title: '5. Взрывные работы', description: 'Кислород незаменим в процессах, связанных с взрывами и добычей. Его включают в состав взрывчатых веществ для увеличения энергии взрыва.'},
				{ title: '6. Металлургия', description: 'В металлургии кислород используется для улучшения качества металлов. Конвертерное производство стали: кислород помогает удалять примеси, такие как углерод и сера. Обогащение воздуха в печах ускоряет плавку и увеличивает температуру процессов. Кислород участвует в рафинировании металлов, улучшая их химический состав.'}
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
