/**
 * 适用于多次调用只执行第一次，后续调用都等待第一次执行结果的场景
 * 如请求一段时间内不会变化的数据，请求某个配置文件（历史原因一个页面有多处会请求同个配置文件且无法合并到一处）
 */
export function oneTime<T>(fn: () => Promise<T>): () => Promise<T> {

    let p: Promise<T> | undefined;

    return async function() {
        if (!p) {
            p = fn();
        }
        const result = await p;
        return result;
    };
}
