// eslint-disable-next-line @typescript-eslint/naming-convention
export enum E_TYPE {
    NUMBER = '[object Number]',
    STRING = '[object String]',
    BOOLEAN = '[object Boolean]',
    UNDEFINED = '[object Undefined]',
    NULL = '[object Null]',
    SYMBOL = '[object Symbol]',
    OBJECT = '[object Object]',
    ARRAY = '[object Array]',
    FUNCTION = '[object Function]',
    DATE = '[object Date]',
    ERROR = '[object Error]'
}

export function getType(target: unknown): E_TYPE {
    return Object.prototype.toString.call(target);
}
