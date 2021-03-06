const path = require('path');

exports.resolveNodeModulesPath = () => {
    let nodeModulesPath;
    try {
        nodeModulesPath = require
            .resolve('webpack-dev-server/client')
            .replace('webpack-dev-server/client/index.js', '');
    } catch (e) {
        nodeModulesPath = path.join(__dirname, '../../');
    }
    return nodeModulesPath;
};
