type TFunc = (...args: unknown[]) => any;
/**
 * 节流
 * @param func 待执行函数
 * @param wait 执行函数的间隔阈值，单位毫秒
 */
export function throttle(func: TFunc, wait: number): TFunc {

    let lastTime = 0;
    let timer: any;
    return (...args) => {
        if (timer) {
            clearTimeout(timer); // 不使用 window.clearTimeout，确保 node 环境和浏览器环境都可执行
        }
        const currentTime = Date.now();
        if (!lastTime || currentTime >= lastTime + wait) {
            lastTime = currentTime;
            func(...args);
        }
        else {
            timer = setTimeout(() => {
                lastTime = currentTime;
                func(...args);
            }, wait);
        }
    };
}
