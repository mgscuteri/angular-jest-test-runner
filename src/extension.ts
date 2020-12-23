import * as vscode from 'vscode';
import { CodelensProvider } from './code-lens-provider';
import constants from './constants';
import { runTestTask } from './run-test-task';
import { debugTest } from './debug-test';

let disposables: vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) {
  const codelensProvider = new CodelensProvider();

  vscode.languages.registerCodeLensProvider(
    {
      scheme: 'file',
      language: 'typescript',
      pattern: '**/*.{spec,test}.{ts,js}',
    },
    codelensProvider
  );

  vscode.commands.registerCommand(
    `${constants.extensionName}.enableCodeLens`,
    () => {
      vscode.workspace
        .getConfiguration(constants.extensionName)
        .update('enableCodeLens', true, true);
    }
  );

  vscode.commands.registerCommand(
    `${constants.extensionName}.disableCodeLens`,
    () => {
      vscode.workspace
        .getConfiguration(constants.extensionName)
        .update('enableCodeLens', false, true);
    }
  );

  vscode.commands.registerCommand(
    `${constants.extensionName}.runTest`,
    (fileName: string, testName: string) => {
      const relativePath = vscode.workspace.asRelativePath(fileName);
      vscode.tasks.executeTask(runTestTask(relativePath, testName));
    }
  );

  vscode.commands.registerCommand(
    `${constants.extensionName}.debugTest`,
    (fileName: string, testName: string) => {
      debugTest(fileName, testName);
    }
  );
}

export function deactivate() {
  if (disposables) {
    disposables.forEach((item) => item.dispose());
  }
  disposables = [];
}
