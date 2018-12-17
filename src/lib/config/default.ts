import { IConfig} from '../interfaces';
// tslint:disable:max-line-length

// Fichier de configuration par défaut de l'application
export const defaultConfig: IConfig = {
    // Section valeurs par défaut pour les connexion aux sources de données
    defaultDataDriver: {
        Basic: {
            dataUrl: 'http://localhost/MDR',
            dataNamespace: 'Basic',
            dataProtocol: 'odata',
            tenantId: '1'
        },
    },
    // Surcharges par tenant (cookie "tenant")
    // tenants: {
    //     xxx: {
    //         Bare: {
    //             tenantId: '1'
    //         }
    //     },
    // },
    // Section des options du middleware de session
    session: {
        timeOut: 20 * 60, // durée de vie maximale d'une session après le dernier accès en seconde
        clearInterval: 3 * 60, // interval de temps entre deux nettoyages de sessions perimées en s
        cookieName: 'Basic' // nom du cookie utilisé pour déterminer le nom de la session utilisée
        // par une requête
    },
    // Section des options du middleware qui logge des erreurs http
    log: {
        stackTrace: false, // oui ou non pour le log de la pile d'exécution
        requestProperties: [ // propriétés à logger de la requête en plus de url et methode
            'body',
            'cookies',
            'headers'
        ],
        level: 'error' // niveau de log ('error' | 'info' | 'verbose' | 'debug' | 'silly')
    },
    version: {
        checkVersion: false, // oui ou non pour vérifier la compatibilité avec la version du mdr
        entityName: 'Person' // entité utilisé pour obtenir la version du mdr
    },
};