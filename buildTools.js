"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceRoute = require("@phoenix/service-route");
class BuildTools {
    static async genSwagger(opts, dir) {
        const utils = BuildTools.getUtils(dir);
        const serviceRouteConfig = utils.Utils.getServiceRouteConfig();
        if (!serviceRouteConfig) {
            console.log('error : cannot find service route config');
            return;
        }
        await serviceRoute.test(serviceRouteConfig, opts);
    }
    static async genNumBuild(dir) {
        const utils = BuildTools.getUtils(dir);
        const err = await utils.Utils.genNumBuild();
        if (err) {
            console.log(err);
        }
    }
    static getUtils(dir) {
        const utils = require(dir + 'lib/tools/utils');
        return utils;
    }
}
exports.BuildTools = BuildTools;

//# sourceMappingURL=buildTools.js.map
