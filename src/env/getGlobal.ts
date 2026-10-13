export type TGlobal = typeof globalThis;

/**
 * 获取不同环境下的全局对象
 * 如浏览器环境下的 window 对象，node 环境下的 globalThis 对象
 * @returns 不同环境下的全局对象
 */
export function getGlobal(): TGlobal {

    let temp: TGlobal | undefined;
    // worker / browser
    if (typeof self !== 'undefined') {
        temp = self;
    }
    // nodejs / browser
    if (typeof globalThis !== 'undefined') {
        temp = globalThis;
    }
    // browser
    if (typeof window !== 'undefined') {
        temp = window;
    }
    if (temp) {
        return temp;
    }
    throw new Error('unable to locate global object');
}
