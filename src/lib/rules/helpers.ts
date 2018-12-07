import * as boc from '@phoenix/boc';
import { c } from '@phoenix/service-route';
export class Helpers {
    public static checkEmptyProp<T extends { container: boc.Container, [index: string]: any }>
        (target: T, propName: keyof (T) & string, message?: string) {
        const v = target[propName] as any;
        if (!v || (v instanceof boc.NZDate && !v.isSet())) {
            message = message || target.container.t('Valeur obligatoire');
            target.errors.addError(message, propName);
        }
    }
    public static getAge(birthDate: boc.NZDate, atDate?: boc.NZDate): number {
        if (!birthDate || !birthDate.isSet()) {
            return 0;
        }
        if (!atDate || !atDate.isSet()) {
            atDate = boc.NZDate.today();
        }
        let age = atDate.year - birthDate.year;
        const props: Array<keyof boc.NZDate> = ['month', 'date'];
        for (const p of props) {
            if (atDate[p] < birthDate[p]) {
                age--;
                break;
            }
        }
        return age;
    }
}