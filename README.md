# Progress Bar Component

Компонент - круговая диаграмма прогресса, предназначена для мобильных веб-приложений: отображает ход выполнения процесса в виде дуги, управляется через API, поддерживает три состояния (Normal, Animated, Hidden).

![Portrait image](images\Portrait.png)

*Вертикальная ориентация (Portrait)*

![Landscape image](images\Landscape.png)

*Горизонтальная ориентация (Landscape)*

## Демо

[GitHub Pages](https://alexstukovnikov.github.io/ozon-test-progress/)

## API

Класс `ProgressBar` предоставляет три метода для управления состоянием:

| Метод            | Описание |
|------------------|----------|
| `setValue(val)`  | Устанавливает текущее значение прогресса. `val` — число от 0 до 100. Значения за пределами диапазона автоматически приводятся к границам. |
| `setAnimated(flag)` | Включает (`true`) или выключает (`false`) анимацию вращения блока. |
| `setHidden(flag)`   | Показывает (`false`) или скрывает (`true`) блок со страницы. |

## Конструктор и параметры

Создание экземпляра происходит через `new ProgressBar(container, options)`.

#### `container`
DOM-элемент, в который будет встроена SVG-диаграмма.

#### `options` (объект, необязательный)

| Параметр        | Тип     | По умолчанию | Описание |
|-----------------|---------|--------------|----------|
| `color`         | string  | `'#005dff'`  | Цвет активной дуги. |
| `bgColor`         | string  | `'#eff3f7'`  | Цвет остатка дуги, недостающего до 100 (полного). |
| `strokeWidth`   | number  | `8`          | Толщина линии (в логических единицах viewBox). |
| `size`          | number  | `160`        | Размер контейнера в пикселях (ширина и высота). |
| `radius`        | number  | `40`         | Радиус круга (в логических единицах viewBox). |
| `initialValue`  | number  | `50`         | Начальное значение прогресса (от 0 до 100). |

**Пример создания с настройками:**
```javascript
const container = document.querySelector('#container');
const progress = new ProgressBar(container, {
  color: '#e74c3c',
  bgColor: '#eff3f7',
  strokeWidth: 12,
  size: 200,
  radius: 35,
  initialValue: 75
});

