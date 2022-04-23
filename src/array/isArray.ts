import { getType, E_TYPE } from '../type';

export function isArray(target: unknown): boolean {

    return getType(target) === E_TYPE.ARRAY;
}
