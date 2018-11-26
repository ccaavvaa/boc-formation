import * as boc from '@phoenix/boc';
import { c } from '@phoenix/service-route';
export class Helpers {
    public static checkEmptyProp<T extends { container: boc.Container, [index: string]: any }>
        (target: T, propName: keyof (T) & string, message?: string) {
        const v = target[propName] as any;
        if (!v || (v instanceof boc.DateTime && !v.isSet())) {
            message = message || target.container.t('Valeur obligatoire');
            target.errors.addError(message, propName);
        }
    }
}