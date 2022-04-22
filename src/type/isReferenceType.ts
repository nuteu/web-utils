import { E_TYPE, getType } from './getType';

export function isReferenceType(target: unknown): boolean {

    const type = getType(target);
    return type === E_TYPE.ARRAY || type === E_TYPE.OBJECT;
}
