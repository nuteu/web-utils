import { getType, E_TYPE } from '../type';

/**
 * 判断是否是数值
 * 如果是数字字符串也返回 false
 */
export function isNumber(target: unknown): boolean {

    return getType(target) === E_TYPE.NUMBER && !isNaN(target as number);
}
