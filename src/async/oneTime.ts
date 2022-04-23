/**
 * 适用于多次调用只执行第一次，后续调用都等待第一次执行结果的场景
 * 如请求一段时间内不会变化的数据
 */
export function oneTime<T>(fn: () => Promise<T>): () => Promise<T> {

    let called = false;
    let result: T;
    return async function() {
        if (!called) {
            called = true;
            result = await fn();
        }
        return result;
    };
}
