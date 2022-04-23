export type TGlobal = Window & typeof globalThis;

/**
 * 获取不同环境下的全局属性
 * 如浏览器环境下的 window 属性，node 环境下的 globalThis 属性
 * @returns 不同环境下的全局属性
 */
export function getGlobal(): TGlobal {

    let temp: any;
    if (typeof self !== 'undefined') {
        temp = self;
    }
    if (typeof window !== 'undefined') {
        temp = window;
    }
    if (typeof global !== 'undefined') {
        temp = global;
    }
    if (typeof globalThis !== 'undefined') {
        temp = globalThis;
    }
    if (temp) {
        return temp;
    }
    throw new Error('unable to locate global object');
}
