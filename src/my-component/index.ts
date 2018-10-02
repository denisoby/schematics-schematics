import {chain, externalSchematic, Rule, SchematicContext, Tree} from '@angular-devkit/schematics';

const licenseText = 'SomeLegalLicenseText:)';

export function myComponent(options: any): Rule {
  // console.log('myComponent v0.0.2', options);
  const componentOptions = Object.assign({}, options, {
    prefix: 'rj',
    path: options.path,
    module: options.module,
    // export: true, ?
    changeDetection: 'OnPush',
    name: options.name + '-grid',
    styleext: 'scss',
  });

  return chain([
    (tree: Tree, _context: SchematicContext) => {
      tree;
    },
    (tree: Tree, _context: SchematicContext) => {
      tree;
      // getPackageJsonDependency
      // addPackageJsonDependency
      // _context.addTask(new NodePPackageInstallTask());
    },
    (tree: Tree, _context: SchematicContext) => {
      tree;
      // const project = getProject(host, options.project);
      // if (options.path === undefined) {
      //   options.path = buildDefaultPath(project);
      // }
      // options.module ?= findModuleFromOptions(host, options);
      // options.module = options.module.replace(options.path, '');
    },
    (tree: Tree, _context: SchematicContext) => {
      // const modulePath = options.path + options.module;
      // const rule = addImportToNgModule(modulePath, 'SomeModule', 'some-package');
      // return rule(host, _context);
      tree;
    },
    (tree: Tree, _context: SchematicContext) => {
      // const modulePath = options.path + options.module;
      // const rule = addImport(modulePath, 'symbolName', 'package-name', true);
      // "true" is supported by patched version of import
      tree;
    },
    (tree: Tree, _context: SchematicContext) => {
      tree;
    },
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
