npm run build -- -w #watch

schematics .:my-component --name=test --dry-run=false
node --inspect-brk $(which schematics) .:my-component --name=test


IN TEST PROJECT

npm link ../schematics-schematics

// doesn't fulfill "project" option from defaults, unlike "ng g"
schematics schematics-schematics:my-component --project schematics-test --name=test

ng g schematics-schematics:my-component --name=test

git reset --hard HEAD && git clean -fd
 
