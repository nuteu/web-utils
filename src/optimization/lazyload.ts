/**
 * 对某个元素的源实行懒加载处理，如图片懒加载、视频懒加载
 * @param target 目标元素
 * @param source 资源地址
 * @param sourceAttribute 能使资源生效并加载的元素属性名，默认为 src
 */
export function lazyload(
    target: HTMLElement,
    source: string,
    sourceAttribute: string = 'src'
): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const observer = new window.IntersectionObserver((entries, self) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                entry.target.setAttribute(sourceAttribute, source);
                self.unobserve(entry.target);
            }
        });
        observer.observe(target);
    }
    else {
        target.setAttribute(sourceAttribute, source);
    }
}
