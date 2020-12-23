import { workspace, Uri, DebugConfiguration, debug } from 'vscode';
import constants from './constants';

export function debugTest(fileName: string, testName: string) {
  const workspaceFolder = workspace.getWorkspaceFolder(Uri.file(fileName));

  const relativePath = workspace.asRelativePath(fileName);

  const ngPath = workspace
    .getConfiguration(constants.extensionName)
    .get('debug.ngPath', undefined);
  const projectPath = workspace
    .getConfiguration(constants.extensionName)
    .get('debug.projectPath', undefined);
  const config: DebugConfiguration = {
    name: 'test',
    type: 'node',
    request: 'launch',
    program: ngPath || `./node_modules/@angular/cli/bin/ng`,
    cwd: projectPath || workspaceFolder?.uri.fsPath,
    args: [
      `${constants.extensionName}.debug-test`,
      `--test-path-pattern=${relativePath}`,
      `--test-name-pattern=${testName}`,
    ],
    console: 'integratedTerminal',
    internalConsoleOptions: 'neverOpen',
    disableOptimisticBPs: true,
  };

  debug.startDebugging(workspaceFolder, config);
}
