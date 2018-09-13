import {chain, externalSchematic, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';

const licenseText = 'SomeLegalLicenseText:)';

export function myComponent(options: any): Rule {
  console.log('myComponent v0.0.2', options);
  const componentOptions = Object.assign({}, options, {
    prefix: 'rj',
    // project ?
    // module ?
    // export: true, ?
    changeDetection: 'OnPush',
    name: options.name + '-grid',
    styleext: 'scss',
  });

  return chain([
    externalSchematic('@schematics/angular', 'component', componentOptions),
    (tree: Tree, _context: SchematicContext) => {
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
