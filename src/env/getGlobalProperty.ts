import { getGlobal, TGlobal } from './getGlobal';

export function getGlobalProperty<
    T extends TGlobal,
    TK extends keyof TGlobal>(property: TK, defaultValue: T[TK]): T[TK] {

    const global = getGlobal();
    return (global[property] ?? defaultValue) as T[TK];
}
