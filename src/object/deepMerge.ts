import { getType, isUndefined } from '../type';
import { isArray } from '../array';
import { isPlainObject } from './isPlainObject';
import { deepClone } from './deepClone';

declare type TMergeObject = Record<string, unknown> | unknown[];

/**
 * 合并两个引用类型数据
 * @param o1 待合并对象
 * @param o2 待合并对象
 * @returns o1 和 o2 合并之后的数据对象
 *
 * examples:
 *
    deepMerge(
        { a: {c: 1} },
        { a: 1 }
    );
    // 返回 { a: 1 }

    deepMerge(
        { a: {c: 1} },
        { a: [1, 2] }
    );
    // 返回 { a: [1, 2] }

    deepMerge(
        { a: {c: 1} },
        { a: undefined }
    );
    // 返回 { a: {c: 1} }

    deepMerge(
        { a: {c: 1} },
        { a: null }
    );
    // 返回 { a: null }

    deepMerge(
        { a: {c: 1}, m: [[1,2,4],7] },
        { a: {b: 2, c: 2} }
    );
    // 返回 { a: {b: 2, c: 2}, m: [[1,2,4],7] }

    deepMerge(
        [1, 2, {b:1}],
        [11, 22, {c:7}, 17]
    );
    // 返回 [11, 22, {b:1, c:7}, 17,]

    deepMerge(
        [1, 2, {b:1}, 77],
        [11, 22, {c:7}]
    );
    // 返回 [11, 22, {b:1, c:7}, 77]
 */
export function deepMerge<T extends TMergeObject>(
    o1: T,
    o2: T
): T {

    if (getType(o1) !== getType(o2)) { // 引用类型不同，使用 o2 覆盖 o1
        return deepClone(o2);
    }
    const result = deepClone(o1);
    for (const index in o2) {
        if (isUndefined(o2[index])) { // 值为 undefined，不进行合并或覆盖处理
            continue;
        }
        if (!(index in result)) {
            result[index] = deepClone(o2[index]);
        }
        else {
            if ((isPlainObject(result[index]) && isPlainObject(o2[index])) ||
                (isArray(result[index]) && isArray(o2[index]))
            ) { // 同属于一种引用类型，才进行合并
                result[index] = deepMerge<any>(result[index], o2[index]);
            }
            else { // 类型不兼容，使用 o2 覆盖 o1
                result[index] = deepClone(o2[index]);
            }
        }
    }
    return result;
}
