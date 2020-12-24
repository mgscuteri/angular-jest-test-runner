# Angular Test Runner

This extension adds the ability to run and debug tests using the Angular CLI directly from test/spec files. There are options for setting the path to both the project and ng executable, see further instructions in the settings.

The extension will automatically activate when it detects an angular.json file in the workspace and will add codelenses to all files following this pattern `**/*.{spec,test}.{ts,js}`.

# Configuration

## Enable CodeLens

Enables/disables the CodeLens (inline commands in the test files)

```json
"angular-test-runner.enableCodeLens": true
```

## Project Path

If your Angular project is not in the workspace root, please specify your absolute project path.

```json
"angular-test-runner.debug.projectPath": "/absolute/path/to/project"
```

## Angular CLI path

Specify Angular CLI executable path, defaults to `./node_modules/@angular/cli/bin/ng`

```json
"angular-test-runner.debug.ngPath": "./node_modules/@angular/cli/bin/ng"
```

# Issues

If you run into any [issues](https://github.com/janeriklysander/angular-test-runner/issues), please feel free to report them here: https://github.com/janeriklysander/angular-test-runner/issues
