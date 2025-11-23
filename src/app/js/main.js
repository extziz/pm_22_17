/**
 * Resume JavaScript Functions
 * ============================
 * 1. Підстановка імені користувача
 * 2. Toggle видимості блоків зі стрілками
 * 3. Генерація розмітки з масиву даних
 */

// ============================================
// ЗАВДАННЯ 1: Підстановка імені користувача
// ============================================

/**
 * Заздалегідь визначені дані користувача (ОРИГІНАЛЬНІ)
 */
const USER_DATA = {
    fullName: "John Harrie",
    profession: "Graphic Designer",
    email: "john@yourwebsite.com",
    phone: "+4-756-822-5156"
};

/**
 * Функція для підстановки імені користувача в елемент за id
 * @param {string} elementId - ID елемента для вставки імені
 * @param {string} name - Ім'я для вставки (опціонально, за замовчуванням USER_DATA.fullName)
 */
function setUserName(elementId, name = USER_DATA.fullName) {
    const element = document.getElementById(elementId);
    
    if (element) {
        // Використовуємо textContent (без HTML) для безпеки
        element.textContent = name;
        console.log(`✅ Ім'я "${name}" встановлено в елемент #${elementId}`);
    } else {
        console.warn(`⚠️ Елемент з id="${elementId}" не знайдено`);
    }
}

/**
 * Функція для підстановки професії користувача
 * @param {string} elementId - ID елемента для вставки
 */
function setUserProfession(elementId) {
    const element = document.getElementById(elementId);
    
    if (element) {
        element.textContent = USER_DATA.profession;
        console.log(`✅ Професія встановлена в елемент #${elementId}`);
    }
}


// ============================================
// ЗАВДАННЯ 2: Toggle видимості блоків зі стрілками
// ============================================

/**
 * CSS класи для toggle функціоналу
 */
const TOGGLE_CLASSES = {
    hidden: 'content-hidden',      // Клас для прихованого контенту
    rotated: 'arrow-rotated',      // Клас для повернутої стрілки
    arrow: 'toggle-arrow'          // Клас для стрілки
};

/**
 * Ініціалізація toggle стрілок для всіх секцій
 * Додає стрілки до заголовків секцій та прив'язує обробники
 */
function initToggleArrows() {
    // Знаходимо всі заголовки секцій у колонках
    const sectionHeaders = document.querySelectorAll('.column .section-header');
    
    sectionHeaders.forEach((header, index) => {
        // Перевіряємо чи стрілка вже існує
        if (header.querySelector(`.${TOGGLE_CLASSES.arrow}`)) {
            return;
        }
        
        // Створюємо елемент стрілки
        const arrow = document.createElement('i');
        arrow.className = `fas fa-chevron-down ${TOGGLE_CLASSES.arrow}`;
        arrow.setAttribute('role', 'button');
        arrow.setAttribute('aria-expanded', 'true');
        arrow.setAttribute('aria-label', 'Згорнути/розгорнути секцію');
        arrow.setAttribute('tabindex', '0');
        
        // Додаємо стрілку до заголовка
        header.appendChild(arrow);
        
        // Знаходимо контент секції (наступні елементи після header)
        const content = getNextSiblingContent(header);
        
        // Прив'язуємо обробник click
        arrow.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSection(arrow, content);
        });
        
        // Додаємо підтримку клавіатури (Enter/Space)
        arrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSection(arrow, content);
            }
        });
        
        // Робимо весь header клікабельним
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            toggleSection(arrow, content);
        });
        
        console.log(`✅ Toggle стрілка додана до секції ${index + 1}`);
    });
}

/**
 * Отримує контент секції (всі елементи між поточним header і наступним)
 * @param {HTMLElement} header - Елемент заголовка секції
 * @returns {HTMLElement[]} - Масив елементів контенту
 */
function getNextSiblingContent(header) {
    const content = [];
    let sibling = header.nextElementSibling;
    
    // Збираємо всі елементи до наступного section-header або кінця контейнера
    while (sibling && !sibling.classList.contains('section-header')) {
        content.push(sibling);
        sibling = sibling.nextElementSibling;
    }
    
    return content;
}

/**
 * Перемикає видимість секції
 * @param {HTMLElement} arrow - Елемент стрілки
 * @param {HTMLElement[]} content - Масив елементів контенту для toggle
 */
function toggleSection(arrow, content) {
    const isHidden = arrow.classList.contains(TOGGLE_CLASSES.rotated);
    
    // Перемикаємо клас обертання стрілки
    arrow.classList.toggle(TOGGLE_CLASSES.rotated);
    
    // Оновлюємо ARIA атрибут
    arrow.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    
    // Перемикаємо видимість контенту
    content.forEach(element => {
        element.classList.toggle(TOGGLE_CLASSES.hidden);
    });
    
    console.log(`🔄 Секція ${isHidden ? 'розгорнута' : 'згорнута'}`);
}

/**
 * Програмне згортання/розгортання секції за індексом
 * @param {number} sectionIndex - Індекс секції (починаючи з 0)
 * @param {boolean} show - true = показати, false = приховати
 */
function toggleSectionByIndex(sectionIndex, show) {
    const arrows = document.querySelectorAll(`.${TOGGLE_CLASSES.arrow}`);
    
    if (arrows[sectionIndex]) {
        const arrow = arrows[sectionIndex];
        const header = arrow.closest('.section-header');
        const content = getNextSiblingContent(header);
        const isCurrentlyHidden = arrow.classList.contains(TOGGLE_CLASSES.rotated);
        
        // Тільки перемикаємо якщо стан відрізняється
        if ((show && isCurrentlyHidden) || (!show && !isCurrentlyHidden)) {
            toggleSection(arrow, content);
        }
    }
}


// ============================================
// ЗАВДАННЯ 3: Генерація розмітки з масиву даних
// ============================================

/**
 * Масив даних про досвід роботи (ОРИГІНАЛЬНІ ДАНІ)
 */
const workExperienceData = [
    {
        id: 1,
        title: "WEB DESIGNER",
        date: "2018 - Present",
        company: "Company Name / Location",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum",
        isActive: true
    },
    {
        id: 2,
        title: "GRAPHIC DESIGNER",
        date: "2015 - 2018",
        company: "Company Name / Location",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum",
        isActive: true
    },
    {
        id: 3,
        title: "MARKETING MANAGER",
        date: "2010 - 2015",
        company: "Company Name / Location",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum",
        isActive: false
    }
];

/**
 * Масив даних про навички (ОРИГІНАЛЬНІ ДАНІ)
 */
const skillsData = [
    { name: "Microsoft Word", level: 90 },
    { name: "Web Designing", level: 80 },
    { name: "Graphic Designing", level: 85 },
    { name: "Afinity Designer", level: 70 },
    { name: "MS Powerpoint", level: 75 }
];

/**
 * Масив даних про освіту (ОРИГІНАЛЬНІ ДАНІ)
 */
const educationData = [
    {
        id: 1,
        title: "MASTER OF CREATIVE ARTS",
        university: "University Name",
        date: "2018 - Present",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod facilisis.",
        isActive: true
    },
    {
        id: 2,
        title: "MASTER OF DESIGN",
        university: "University Name",
        date: "2015 - 2017",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod facilisis.",
        isActive: true
    },
    {
        id: 3,
        title: "MARKETING OFFICER",
        university: "University Name",
        date: "2010 - 2012",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod facilisis.",
        isActive: false
    }
];

/**
 * Генерує HTML розмітку для одного елемента досвіду роботи
 * @param {Object} item - Об'єкт з даними про роботу
 * @returns {string} - HTML рядок
 */
function generateWorkItemHTML(item) {
    const activeClass = item.isActive ? 'active' : '';
    
    return `
        <div class="card experience-item ${activeClass}" data-id="${item.id}">
            <div class="card-body">
                <h3 class="card-title">${escapeHTML(item.title)}</h3>
                <span class="badge date">${escapeHTML(item.date)}</span>
                <p class="company card-subtitle">${escapeHTML(item.company)}</p>
                <p class="description card-text">${escapeHTML(item.description)}</p>
            </div>
        </div>
    `;
}

/**
 * Генерує HTML розмітку для одного елемента навички
 * @param {Object} skill - Об'єкт з даними про навичку
 * @returns {string} - HTML рядок
 */
function generateSkillItemHTML(skill) {
    return `
        <div class="skill-item">
            <span class="skill-name">${escapeHTML(skill.name)}</span>
            <div class="progress progress-bar-custom" 
                 role="progressbar" 
                 aria-valuenow="${skill.level}" 
                 aria-valuemin="0" 
                 aria-valuemax="100"
                 aria-label="${escapeHTML(skill.name)} - ${skill.level}%">
                <div class="progress-bar progress-fill" style="width: ${skill.level}%"></div>
            </div>
        </div>
    `;
}

/**
 * Генерує HTML розмітку для одного елемента освіти
 * @param {Object} item - Об'єкт з даними про освіту
 * @returns {string} - HTML рядок
 */
function generateEducationItemHTML(item) {
    const activeClass = item.isActive ? 'active' : '';
    
    return `
        <div class="card education-item ${activeClass}" data-id="${item.id}">
            <div class="card-body">
                <h3 class="card-title">${escapeHTML(item.title)}</h3>
                <p class="university card-subtitle">
                    ${escapeHTML(item.university)}
                    <span class="badge date">${escapeHTML(item.date)}</span>
                </p>
                <p class="description card-text">${escapeHTML(item.description)}</p>
            </div>
        </div>
    `;
}

/**
 * Головна функція для генерації та вставки розмітки
 * @param {string} containerId - ID контейнера для вставки
 * @param {Array} dataArray - Масив даних
 * @param {Function} generateItemFn - Функція генерації HTML для одного елемента
 */
function renderDataToContainer(containerId, dataArray, generateItemFn) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.warn(`⚠️ Контейнер з id="${containerId}" не знайдено`);
        return;
    }
    
    // Очищаємо вміст контейнера перед вставкою
    container.innerHTML = '';
    
    // Генеруємо розмітку для кожного елемента
    const html = dataArray.map(item => generateItemFn(item)).join('');
    
    // Вставляємо розмітку
    container.innerHTML = html;
    
    console.log(`✅ Згенеровано ${dataArray.length} елементів у контейнер #${containerId}`);
}

/**
 * Функція для рендеру досвіду роботи
 * @param {string} containerId - ID контейнера (за замовчуванням 'work-experience-container')
 */
function renderWorkExperience(containerId = 'work-experience-container') {
    renderDataToContainer(containerId, workExperienceData, generateWorkItemHTML);
}

/**
 * Функція для рендеру навичок
 * @param {string} containerId - ID контейнера (за замовчуванням 'skills-container')
 */
function renderSkills(containerId = 'skills-container') {
    renderDataToContainer(containerId, skillsData, generateSkillItemHTML);
}

/**
 * Функція для рендеру освіти
 * @param {string} containerId - ID контейнера (за замовчуванням 'education-container')
 */
function renderEducation(containerId = 'education-container') {
    renderDataToContainer(containerId, educationData, generateEducationItemHTML);
}

/**
 * Утиліта для екранування HTML (захист від XSS)
 * @param {string} text - Текст для екранування
 * @returns {string} - Безпечний текст
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


// ============================================
// ІНІЦІАЛІЗАЦІЯ після завантаження DOM
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Resume JS завантажено');
    
    // ЗАВДАННЯ 1: Підстановка імені користувача
    setUserName('personName');
    setUserProfession('personProfession');
    
    // ЗАВДАННЯ 2: Ініціалізація toggle стрілок
    initToggleArrows();
    
    // ЗАВДАННЯ 3: Генерація контенту з масивів даних
    renderWorkExperience();
    renderSkills();
    renderEducation();
    
    console.log('✅ Всі функції ініціалізовано');
});


// ============================================
// ЕКСПОРТ ДЛЯ ТЕСТУВАННЯ (опціонально)
// ============================================

// Якщо потрібно використовувати функції глобально
window.ResumeApp = {
    // Завдання 1
    setUserName,
    setUserProfession,
    USER_DATA,
    
    // Завдання 2
    initToggleArrows,
    toggleSectionByIndex,
    
    // Завдання 3
    renderWorkExperience,
    renderSkills,
    renderEducation,
    workExperienceData,
    skillsData,
    educationData
};