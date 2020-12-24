import * as vscode from 'vscode';
import { CodelensProvider } from './code-lens-provider';
import constants from './constants';
import { runTestTask } from './run-test-task';
import { debugTest } from './debug-test';

export function activate(context: vscode.ExtensionContext) {
  const codelensProvider = new CodelensProvider();
  const config = vscode.workspace.getConfiguration(
    `${constants.extensionName}.codelens`
  );

  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(
      {
        scheme: 'file',
        language: 'typescript',
        pattern: '**/*.{spec,test}.{ts,js}',
      },
      codelensProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      `${constants.extensionName}.enableCodeLens`,
      () => config.update('enable', true, true)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      `${constants.extensionName}.disableCodeLens`,
      () => config.update('enable', false, true)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      `${constants.extensionName}.runTest`,
      runTestCommand
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      `${constants.extensionName}.debugTest`,
      debugTestCommand
    )
  );
}

function runTestCommand(fileName: string, testName: string) {
  const relativePath = vscode.workspace.asRelativePath(fileName);
  vscode.tasks.executeTask(runTestTask(relativePath, testName));
}

function debugTestCommand(fileName: string, testName: string) {
  debugTest(fileName, testName);
}

export function deactivate() {}
