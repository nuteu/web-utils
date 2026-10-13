# @neutoc7/web-utils

面向 Web 应用的常用 TypeScript 工具函数集合，包含防抖节流、对象与数组处理、异步辅助、DOM 资源加载及环境判断等工具。

## 安装

```bash
npm install @neutoc7/web-utils
```

## 导入

可以从包的根入口导入：

```ts
import { debounce, deepClone, sleep } from '@neutoc7/web-utils';
```

也可以从子路径导入需要的模块：

```ts
import { debounce, throttle } from '@neutoc7/web-utils/optimization';
import { deepClone, deepMerge, getValueByKey } from '@neutoc7/web-utils/object';
```

可用子路径：`optimization`、`object`、`number`、`env`、`dom`、`async`、`array`、`type`。

## 工具

### 性能优化：`optimization`

- `debounce(fn, wait)`：在连续调用停止 `wait` 毫秒后执行最后一次调用。适用于搜索输入等场景。
- `throttle(fn, wait)`：限制函数执行频率，适用于滚动、拖动等高频事件。
- `lazyload(target, source, sourceAttribute?)`：元素进入视口时将资源地址写入目标属性；默认属性为 `src`。不支持 `IntersectionObserver` 时会立即设置属性。

```ts
import { debounce, throttle, lazyload } from '@neutoc7/web-utils/optimization';

const search = debounce((keyword: string) => {
	console.log('search:', keyword);
}, 300);
input.addEventListener('input', () => search(input.value));

window.addEventListener('scroll', throttle(() => {
	console.log('scroll position:', window.scrollY);
}, 100));

const image = document.querySelector('img[data-src]')!;
lazyload(image, image.dataset.src!);
```

`lazyload` 依赖浏览器的 `window` / DOM API；`debounce` 和 `throttle` 可在浏览器和 Node.js 环境中使用。

### 对象：`object`

- `deepClone(value)`：递归复制数组和普通对象。
- `deepMerge(target, source)`：递归合并两个对象或两个数组，返回合并结果，不修改原参数。类型不同时由 `source` 覆盖；`source` 对应属性为 `undefined` 时保留 `target` 的值。
- `getValueByKey(object, path, delimiter?)`：按路径读取值，默认以 `.` 分隔；路径不存在时返回 `undefined`。
- `isPlainObject(value)`：判断值是否为普通对象（通过 `Object.prototype.toString` 判断）。

```ts
import { deepClone, deepMerge, getValueByKey, isPlainObject } from '@neutoc7/web-utils/object';

const original = { user: { name: 'Ada' }, tags: ['math'] };
const copy = deepClone(original);

const settings = deepMerge(
	{ display: { theme: 'light', compact: false } },
	{ display: { compact: true } }
);
// { display: { theme: 'light', compact: true } }

const name = getValueByKey<string>(original, 'user.name');
// 'Ada'

console.log(isPlainObject(original)); // true
```

`deepClone` 适用于普通对象和数组，不处理循环引用，也不保留 `Date`、`Map`、类实例等特殊对象的内部状态或原型。

### 类型与判断：`type`、`array`、`number`

- `getType(value)`：返回与 `Object.prototype.toString` 一致的类型字符串。
- `E_TYPE`：`getType` 使用的类型字符串枚举。
- `isReferenceType(value)`：仅对数组和普通对象返回 `true`。
- `isUndefined(value)`：判断值是否为 `undefined`。
- `isArray(value)`：判断值是否为数组。
- `isNumber(value)`：判断值是否为非 `NaN` 的数字；数字字符串不算数字。

```ts
import { E_TYPE, getType, isReferenceType, isUndefined } from '@neutoc7/web-utils/type';
import { isArray } from '@neutoc7/web-utils/array';
import { isNumber } from '@neutoc7/web-utils/number';

getType([]) === E_TYPE.ARRAY; // true
isReferenceType({}); // true
isUndefined(undefined); // true
isArray([]); // true
isNumber(42); // true
isNumber('42'); // false
```

### 异步：`async`

- `sleep(ms)`：等待指定毫秒数。
- `oneTime(fn)`：包装一个返回 Promise 的无参函数；首次调用完成后，后续调用返回首次结果。它不适用于要求并发调用共享同一个进行中 Promise 的场景。

```ts
import { oneTime, sleep } from '@neutoc7/web-utils/async';

await sleep(500);

const loadConfigOnce = oneTime(async () => {
    let retryTimes = 0;
    const MAX_RETRY_TIME = 2;
    while (retryTimes < MAX_RETRY_TIME) {
        try {
            const response = await fetch('/config.json');
	        return response.json();
        }
        catch {
            retryTimes++;
        }
    }
    return null;
});

// 页面header
const config = await loadConfigOnce();

// 页面footer
const config2 = await loadConfigOnce();
```

### DOM 资源加载：`dom`

- `loadStyle(resource, parentNode)`：添加样式表链接；加载成功时 Promise fulfilled，失败时 rejected。
- `loadScript(resource, parentNode)`：添加脚本元素；加载成功时 Promise fulfilled，失败时 rejected。

```ts
import { loadScript, loadStyle } from '@neutoc7/web-utils/dom';

const head = document.head;
await loadStyle('/assets/theme.css', head);
await loadScript('/assets/widget.js', document.body);
```

这两个函数需要浏览器 DOM 环境，`parentNode` 是要插入资源元素的父元素。

### 环境：`env`

- `getGlobal()`：获取当前环境的全局对象。
- `getGlobalProperty(property, defaultValue)`：获取全局对象上的属性；属性为 `null` 或 `undefined` 时返回默认值。

```ts
import { getGlobal, getGlobalProperty } from '@neutoc7/web-utils/env';

const globalObject = getGlobal();
const timerFunction = getGlobalProperty('setTimeout', setTimeout);
```

`getGlobalProperty` 的属性名受 TypeScript 全局对象类型约束；传入的默认值应与该属性类型相符。
