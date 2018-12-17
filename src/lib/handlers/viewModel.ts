import * as bocServer from '@phoenix/boc-server';
import { m } from '@phoenix/service-route';
// tslint:disable:max-line-length

export class ViewModelHandler extends bocServer.ViewModelHandler {
    constructor() {
        super();
    }

    @m({
        tags: ['ViewModels'],
        summary: 'Récupération de l\'état d\'un viewModel',
        // tslint:disable-next-line:max-line-length
        description: 'Récupère un viewModel, lors d\'un raffraichissement de page par exemple, gardé en mémoire sur le serveur',
        parameters: [
            {
                name: 'viewModel',
                description: 'Nom du viewModel',
                in: 'path',
                type: 'string',
                required: true,
            },
            {
                name: 'idViewModel',
                description: 'Id du viewModel',
                in: 'path',
                type: 'number',
            },
            {
                name: 'id',
                description: 'Id du container',
                in: 'query',
                type: 'string',
            },
        ],
    })
    public get(viewModel: string, idViewModel: string, id: string) {
        return super.get(viewModel, idViewModel, id);
    }

    @m({
        tags: ['ViewModels'],
        summary: 'Initialisation d\'un ViewModel',
        description: 'Initialise le ViewModel décrit dans la variable {ViewModel}',
        parameters: [
            {
                name: 'viewModel',
                description: 'Nom du viewModel',
                in: 'path',
                type: 'string',
            },
            {
                name: 'body',
                description: 'Données utilisées pour initialiser le viewModel',
                model: 'ViewModelInit',
            },
        ],
        responses: {
            201: {
                model: 'ViewModelInitResponse',
                description:
                    'Description de la réponse : A savoir que l\'id reçu est l\id de container',
            },
        },
    })
    public post(viewModel: string, body: any) {
        return super.post(viewModel, body);
    }

    @m({
        tags: ['ViewModels'],
        summary: 'Echange avec un ViewModel',
        description: 'Communique avec un viewModel à l\'aide de JSON Patchs',
        parameters: [
            {
                name: 'viewModel',
                description: 'Nom du viewModel',
                in: 'path',
                type: 'string',
            },
            {
                name: 'idViewModel',
                description: 'Id du viewModel',
                in: 'path',
                type: 'number',
            },
            {
                name: 'id',
                description: 'Id du container',
                in: 'query',
                type: 'string',
            },
            {
                name: 'body',
                description:
                    'Données utilisées pour initialiser le viewModel, sous la forme de JSON Patchs',
                model: 'ViewModelPatchs',
            },
        ],
        responses: {
            200: {
                model: 'ViewModelPatchs',
                description:
                    'Deltas des modifications à effectuer côté client, sous la forme de JSON Patchs',
            },
        },
    })
    public patch(viewModel: string, idViewModel: string, id: string, body: any) {
        return super.patch(viewModel, idViewModel, id, body);
    }
}
