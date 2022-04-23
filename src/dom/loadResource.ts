/**
 * 异步加载样式资源
 * @param resource 资源地址
 * @param parentNode 要挂载的父节点
 * @returns 返回一个 Promise，加载失败会抛出错误
 */
export async function loadStyle(
    resource: string,
    parentNode: HTMLElement
): Promise<void> {
    return new Promise((resolve, reject) => {
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = resource;
        style.onload = () => resolve();
        style.onerror = () => reject();
        parentNode.appendChild(style);
    });
}

/**
 * 异步加载脚本
 * @param resource 资源地址
 * @param parentNode 要挂载的父节点
 * @returns 返回一个 Promise，加载失败会抛出错误
 */
export async function loadScript(
    resource: string,
    parentNode: HTMLElement
): Promise<void> {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = resource;
        s.onload = () => resolve();
        s.onerror = () => reject();
        parentNode.appendChild(s);
    });
}
