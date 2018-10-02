"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const licenseText = 'SomeLegalLicenseText:)';
function myComponent(options) {
    console.log('myComponent v0.0.2', options);
    const componentOptions = Object.assign({}, options, {
        prefix: 'rj',
        path: '',
        // project ?
        // module ?
        // export: true, ?
        changeDetection: 'OnPush',
        name: options.name + '-grid',
        styleext: 'scss',
    });
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'component', componentOptions),
        (tree, _context) => {
            tree.getDir(options.sourceDir)
                .visit(filePath => {
                if (!filePath.endsWith('.ts')) {
                    return;
                }
                const content = tree.read(filePath);
                if (!content) {
                    return;
                }
                // Prevent from writing license to files that already have one.
                if (content.indexOf(licenseText) === -1) {
                    tree.overwrite(filePath, licenseText + content);
                }
            });
            return tree;
        },
    ]);
}
exports.myComponent = myComponent;
//# sourceMappingURL=index.js.map