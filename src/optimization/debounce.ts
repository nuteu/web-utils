type TFunc = (...args: unknown[]) => any;
/**
 * 防抖
 * @param fn 待执行函数
 * @param wait 执行函数的间隔阈值，单位毫秒
 */
export function debounce(fn: TFunc, wait: number): TFunc {

    let timer: any;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
            timer = 0;
        }, wait);
    };
}
