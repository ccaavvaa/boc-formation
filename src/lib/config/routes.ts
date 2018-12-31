export const config = {
    name: 'Formation Doc',
    description: "Documentation de l'API Formation",
    version: '1.0.0',
    licence: 'Salvia developpement',
    controllersBaseDir: 'lib/handlers',
    modelsBaseDir: 'schemas',
    debug: false,
    noBodyParser: true,
    routes: [
        {
            path: '/version',
            controller: {
                get: 'VersionHandler/get',
            },
            file: 'version',
        },
        {
            path: '/ViewModels/{viewModel}',
            controller: {
                post: 'ViewModelHandler/post',
            },
            file: 'viewModel',
        },
        {
            path: '/ViewModels/{viewModel}/{idViewModel}',
            controller: {
                get: 'ViewModelHandler/get',
                patch: 'ViewModelHandler/patch',
                post: 'ViewModelHandler/patch',
            },
            file: 'viewModel',
        },
        {
            path: '/lookup/odata/{entity}',
            controller: 'LookUpHandler',
            file: 'lookup',
        },
        {
            path: '/lookup/dataset/{datasetName}',
            controller: 'DatasetHandler',
            file: 'dataset',
        },
    ],
};