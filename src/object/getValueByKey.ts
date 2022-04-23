import { isUndefined } from '../type';
import { deepClone } from './deepClone';

/**
 *
 * @param obj 数据对象
 * @param key 键值，支持键值链
 * @param delimiter 键值分隔符，默认为.
 * @returns 给定的数据中指定键值的 value
 *
 * example:
 *
    const obj = { a: { b: 1 } };
    const r = getValueByKey(obj, 'a.b'); // r 结果为 1
 */
export function getValueByKey<T>(
    obj: Record<string, any>,
    key: string,
    delimiter: string = '.'
): T | undefined {

    if (key.trim() === '') {
        console.error(new Error('empty key passed to getValueByKey'));
        return undefined;
    }
    const keyPath = key.trim().split(delimiter);
    let result = deepClone(obj);
    for (const index of keyPath) {
        result = result[index];
        if (isUndefined(result)) {
            console.error(new Error(`invalid key ${key} passed to getValueByKey`));
            break;
        }
    }
    return result as (T | undefined);
}
