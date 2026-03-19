class ProgressBar {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            color: '#005dff',
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
        this.bgCircle.setAttribute('stroke', '#eff3f7');
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

        this.svg.appendChild(this.bgCircle);
        this.svg.appendChild(this.circle);
        this.container.appendChild(this.svg);
    }

    _circumference() {
        return 2 * Math.PI * this.options.radius;
    }

    _updateProgress() {
        const offset = this._circumference() * (1 - this.value / 100);
        this.circle.setAttribute('stroke-dashoffset', offset);
    }

    setValue(val) {
        let num = Number(val);
        if (isNaN(num)) num = 0;
        this.value = Math.min(100, Math.max(0, num));
        this._updateProgress();
    }

    setAnimated(flag) {
        this.animated = flag;
        this.svg.style.animation = flag ? 'spin 2s linear infinite' : 'none';
    }

    setHidden(flag) {
        this.hidden = flag;
        this.container.style.display = flag ? 'none' : '';
    }
}

const progressContainer = document.querySelector('#bar')
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