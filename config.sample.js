// Fichier de configuration utilisateur dev de l'application
module.exports = {
    // Section valeurs par défaut pour les connexion aux sources de données
    defaultDataDriver: {
        Accession: {
            dataUrl: 'http://localhost:7000/data/mdr',
            dataNamespace: 'Accession',
            dataProtocol: 'odata',
            tenantId: '1'
        },
        SPO: {
            dataUrl: 'http://localhost/GizehDev',
            dataProtocol: 'odata',
            doNotUseAutoExpand: true
            // extraHeaders: {
            // // permet de s'authentifier a SPO avec un tuilisateur/profile sans mot de passe. NE PAS UTILISER EN PROD
            //    user: 'ADM,ADMCLI',
            // }
        },
        GED: {
            dataUrl: 'http://localhost/GED'
        },
        DocMerge: {
            dataUrl: 'http://localhost/DocMerge'
        },
        SpoDirect: {
            dataProtocol: 'sql',
            // options: {
            //     client: 'mssql',
            //     connection: {
            //         server: 'SERMILSQL2K8',
            //         user: 'sage',
            //         password: 'sage',
            //         database: 'SPO_Vinci_Amodv_Recette',
            //         options: {
            //             encrypt: false,
            //             instanceName: 'SERMILSQL2K14E'
            //         }
            //     }
            // }
        }
    },
    // Surcharges par tenant (cookie "tenant")
    // tenants: {
    //     spo: {
    //         Accession: {
    //             tenantId: '1'
    //         }
    //     },
    //     spo1: {
    //         Accession: {
    //             dataUrl: 'http://sermilappaq/MDR',
    //             dataNamespace: 'AccessionRV',
    //             tenantId: '1'
    //         },
    //         SPO: {
    //             dataUrl: 'http://sermilappaq/SPO/odata'
    //         },
    //         SpoDirect: {
    //             // options: {
    //             //     client: 'mssql',
    //             //     connection: {
    //             //         server: 'localhost',
    //             //         database: 'test01',
    //             //         user: 'admin',
    //             //         password: 'admin',
    //             //         options: {
    //             //             encrypt: false,
    //             //             instanceName: 'SQLEXPRESS'
    //             //         }
    //             //     }
    //             // }
    //         }

    //     }
    // },
    // Section des options du middleware qui logge des erreurs http
    log: {
        stackTrace: false, // oui ou non pour le log de la pile d'exécution
        requestProperties: [ // propriétés à logger de la requête en plus de url et de la methode
            'body',
            'cookies',
            'headers'
        ],
        level: 'error' // niveau de log ('error' | 'info' | 'verbose' | 'debug' | 'silly')
    },
    // Section des options du middleware de session
    // session: {
    //     timeOut: 20 * 60, // durée de vie maximale d'une session après le dernier accès en seconde
    //     clearInterval: 3 * 60, // interval de temps entre deux nettoyages de sessions perimées en seconde
    // },
    version: {
        checkVersion: false, // oui ou non pour vérifier la compatibilité avec la version du mdr
        entityName: 'RVDossier' // entité utilisé pour obtenir la version du mdr
    },
    useGED: false, // oui ou non pour utiliser GED
    useDocMerge: false, // oui ou non pour utiliser DocMerge
    simuSPO: true // oui ou non pour utiliser le simulateur SPO
}
