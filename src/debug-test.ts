import { workspace, Uri, DebugConfiguration, debug, window } from 'vscode';
import constants from './constants';
import * as fs from 'fs';
import { join } from 'path';

export async function debugTest(fileName: string, testName: string) {
  const workspaceFolder = workspace.getWorkspaceFolder(Uri.file(fileName));
  const relativePath = workspace.asRelativePath(fileName);

  if (!workspaceFolder) {
    const message =
      'Could not find workspace folder, pleace specify project path in the config';
    window.showErrorMessage(message);
    throw new Error(message);
  }

  const config = workspace.getConfiguration(`${constants.extensionName}.debug`);
  let program = config.get('ngPath', '');
  let cwd = config.get('projectPath', '');

  if (program.length === 0) {
    program = './node_modules/@angular/cli/bin/ng';
  }

  if (cwd.length === 0) {
    cwd = workspaceFolder.uri.fsPath;
  }

  const path: fs.PathLike = join(cwd, program);

  if (!fs.existsSync(path)) {
    const message = `Could not find ng executable? Please verify that you've provided correct paths in the config and that you have run npm install.`;
    window.showErrorMessage(message);
    throw new Error(message);
  }

  const debugConfig: DebugConfiguration = {
    name: 'test',
    type: 'node',
    request: 'launch',
    program,
    cwd,
    args: [
      `test`,
      `--test-path-pattern=${relativePath}`,
      `--test-name-pattern=${testName}`,
    ],
    console: 'integratedTerminal',
    internalConsoleOptions: 'neverOpen',
    disableOptimisticBPs: true,
  };

  debug.startDebugging(workspaceFolder, debugConfig);
}
