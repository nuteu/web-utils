import { getType, E_TYPE } from '../type';

export function isPlainObject(target: unknown): boolean {

    return getType(target) === E_TYPE.OBJECT;
}
