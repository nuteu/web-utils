import { isArray } from '../array';
import { isReferenceType } from '../type';
/**
 * 对一个引用类型的值进行深拷贝
 * 遍历拷贝是最靠谱的，简单的使用 JSON.strigify() 可能导致一些数据（如函数）丢失
 * @param o 待拷贝的值
 * @returns 值的副本
 */
export function deepClone<T>(o: T): T {

    if(!isReferenceType(o)) {
        return o;
    }
    const result = (isArray(o) ? [] : {}) as T;
    for (const i in o) {
        result[i] = isReferenceType(o[i]) ? deepClone(o[i]) : o[i];
    }
    return result;
}
