class ProgressBar {
    constructor(container, options = {}) {
        /**
         * @param {HTMLElement} container - DOM-элемент для размещения прогресс-бара
         * @param {Object} [options] - настройки внешнего вида
         * @param {string} [options.color='#005dff'] - цвет активной дуги
         * @param {string} [options.bgColor='#eff3f7'] - цвет фоновой дуги (остаток)
         * @param {number} [options.strokeWidth=8] - толщина линии в единицах viewBox
         * @param {number} [options.size=160] - размер контейнера в пикселях
         * @param {number} [options.radius=40] - радиус круга в единицах viewBox
         * @param {number} [options.initialValue=50] - начальное значение дуги (0–100)
         */
        this.container = container;
        this.options = {
            color: '#005dff',
            bgColor: '#eff3f7',
            strokeWidth: 8,
            size: 160,
            radius: 40,
            initialValue: 50,
            ...options,
        };

        this.value = Math.min(100, Math.max(0, this.options.initialValue));
        this.animated = false;
        this.hidden = false;

        this.container.style.width = this.options.size + 'px';
        this.container.style.height = this.options.size + 'px';
        this.container.style.position = 'relative';

        this._initSVG();
        this.setValue(this.value);
    }

    /**
     * Создаёт SVG-структуру
     * @private
     */
    _initSVG() {
        const svgNS = 'http://www.w3.org/2000/svg';
        this.svg = document.createElementNS(svgNS, 'svg');
        this.svg.setAttribute('viewBox', '0 0 100 100');
        this.svg.style.display = 'block';
        this.svg.style.width = '100%';
        this.svg.style.height = '100%';

        this.bgCircle = document.createElementNS(svgNS, 'circle');
        this.bgCircle.setAttribute('cx', '50');
        this.bgCircle.setAttribute('cy', '50');
        this.bgCircle.setAttribute('r', this.options.radius);
        this.bgCircle.setAttribute('fill', 'none');
        this.bgCircle.setAttribute('stroke', this.options.bgColor);
        this.bgCircle.setAttribute('stroke-width', this.options.strokeWidth);

        this.circle = document.createElementNS(svgNS, 'circle');
        this.circle.setAttribute('cx', '50');
        this.circle.setAttribute('cy', '50');
        this.circle.setAttribute('r', this.options.radius);
        this.circle.setAttribute('fill', 'none');
        this.circle.setAttribute('stroke', this.options.color);
        this.circle.setAttribute('stroke-width', this.options.strokeWidth);
        this.circle.setAttribute('stroke-dasharray', this._circumference());
        this.circle.setAttribute('stroke-dashoffset', this._circumference());
        this.circle.setAttribute('transform', 'rotate(-90 50 50)');
        this.circle.style.transition = 'stroke-dashoffset 0.3s ease-in-out';

        this.svg.appendChild(this.bgCircle);
        this.svg.appendChild(this.circle);
        this.container.appendChild(this.svg);
    }

    /**
     * Длина окружности для текущего радиуса.
     * @returns {number}
     * @private
     */
    _circumference() {
        return 2 * Math.PI * this.options.radius;
    }

    /**
     * Обновляет длину дуги в соответствии с текущим значением value.
     * @private
     */
    _updateProgress() {
        const offset = this._circumference() * (1 - this.value / 100);
        this.circle.setAttribute('stroke-dashoffset', offset);
    }

    /**
     * Устанавливает значение прогресса (0–100). Некорректные значения приводятся к границам.
     * @param {number|string} val - новое значение прогресса
     */
    setValue(val) {
        let num = Number(val);
        if (isNaN(num)) num = 0;
        this.value = Math.min(100, Math.max(0, num));
        this._updateProgress();
    }

    /**
     * Включает/выключает анимацию вращения дуги.
     * @param {boolean} flag - true для включения, false для выключения
     */
    setAnimated(flag) {
        this.animated = flag;
        this.svg.style.animation = flag ? 'spin 1.5s linear infinite' : 'none';
    }

    /**
     * Показывает/скрывает блок прогресса.
     * @param {boolean} flag - true для скрытия, false для показа
     */
    setHidden(flag) {
        this.hidden = flag;
        this.container.style.display = flag ? 'none' : '';
    }
}

// ===== Инициализация и создание блока для демо =====
const progressContainer = document.querySelector('#bar');
const valueEl = document.querySelector('#value');
const animateEl = document.querySelector('#animate');
const hideEl = document.querySelector('#hide');

const progress = new ProgressBar(progressContainer);

valueEl.addEventListener('input', (e) => {
    progress.setValue(e.target.value);
    e.target.value = progress.value;
});

animateEl.addEventListener('change', (e) => {
    progress.setAnimated(e.target.checked);
});

hideEl.addEventListener('change', (e) => {
    progress.setHidden(e.target.checked);
});
