# Angular Jest Test Runner

This extension adds the ability to run and debug Jest tests using the Angular CLI directly from test/spec files through codelenses. There are options for setting the path to both the project and ng executable, see further instructions in the settings.

The extension will automatically activate when it detects an angular.json file in the workspace and will add codelenses to all files following this pattern `**/*.{spec,test}.{ts,js}`.

# Configuration

## Codelens settings

### Enable Codelens

Enables/disables the Codelens (inline commands in the test files)

```json
"angular-jest-test-runner.codelens.enable": true
```

### Label for run test codelens

Allows you to set the label for the run test codelens, supports [octicons](https://octicons.github.com/).

```json
"angular-jest-test-runner.codelens.runLabel": "$(beaker) Run Test"
```

### Label for debug test codelens

Allows you to set the label for the debug test codelens, supports [octicons](https://octicons.github.com/).

```json
"angular-jest-test-runner.codelens.debugLabel": "$(bug) Debug Test"
```

## Debug settings

### Project Path

If your Angular project is not in the workspace root, please specify your absolute project path.

```json
"angular-jest-test-runner.debug.projectPath": "/absolute/path/to/project"
```

### Angular CLI path

Specify Angular CLI executable path, defaults to `./node_modules/@angular/cli/bin/ng`

```json
"angular-jest-test-runner.debug.ngPath": "./node_modules/@angular/cli/bin/ng"
```

# Issues

If you run into any [issues](https://github.com/janeriklysander/angular-jest-test-runner/issues), please feel free to report them here: https://github.com/janeriklysander/angular-jest-test-runner/issues
