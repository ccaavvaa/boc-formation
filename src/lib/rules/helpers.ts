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
    public static getAge(birthDate: boc.DateTime, atDate?: boc.DateTime): number {
        if (!birthDate || !birthDate.isSet()) {
            return 0;
        }
        const d2 = atDate && atDate.isSet() ? atDate.toJSDate() : new Date();
        const d1 = birthDate.toJSDate();
        let age = d2.getFullYear() - d1.getFullYear();
        for (const f of [d1.getMonth, d1.getDate]) {
            if (f.apply(d2) < f.apply(d1)) {
                age--;
                break;
            }
        }
        return age;
    }
}