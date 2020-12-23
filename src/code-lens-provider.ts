import * as vscode from 'vscode';
import constants from './constants';

/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {
  private codeLenses: vscode.CodeLens[] = [];
  private regex: RegExp;
  private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> = this
    ._onDidChangeCodeLenses.event;

  constructor() {
    // .*(describe|it|test)\(
    this.regex = /.*(describe|it|test)\(.*/g;

    vscode.workspace.onDidChangeConfiguration((_) => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    if (
      vscode.workspace
        .getConfiguration(constants.extensionName)
        .get('enableCodeLens', true)
    ) {
      this.codeLenses = [];
      const regex = new RegExp(this.regex);
      const text = document.getText();
      let matches;
      while ((matches = regex.exec(text)) !== null) {
        const line = document.lineAt(document.positionAt(matches.index).line);
        const indexOf = line.text.indexOf(matches[0]);
        const position = new vscode.Position(line.lineNumber, indexOf);
        const range = document.getWordRangeAtPosition(
          position,
          new RegExp(this.regex)
        );
        if (range) {
          const runTestCodeLens = new vscode.CodeLens(
            range,
            this.generateRunTestCodeLensCommand(document.fileName, line)
          );
          const debugTestCodeLens = new vscode.CodeLens(
            range,
            this.generateDebugTestCodeLensCommand(document.fileName, line)
          );
          this.codeLenses = [
            ...this.codeLenses,
            runTestCodeLens,
            debugTestCodeLens,
          ];
        }
      }
      return this.codeLenses;
    }
    return [];
  }

  private generateRunTestCodeLensCommand(
    fileName: string,
    line: vscode.TextLine
  ): vscode.Command {
    return this.generateCodeLensCommand(
      fileName,
      line,
      `${constants.extensionName}.runTest`,
      'Run Test'
    );
  }

  private generateDebugTestCodeLensCommand(
    fileName: string,
    line: vscode.TextLine
  ): vscode.Command {
    return this.generateCodeLensCommand(
      fileName,
      line,
      `${constants.extensionName}.debugTest`,
      'Debug Test'
    );
  }

  private generateCodeLensCommand(
    fileName: string,
    line: vscode.TextLine,
    command: string,
    title: string
  ): vscode.Command {
    const regex = new RegExp(
      /(?<type>describe|it|test)\((?<quote>['"`])(?<testName>.*)\k<quote>.*/g
    );
    const [_match, testType, _quote, testName] = regex.exec(line.text) || [];

    return {
      title,
      tooltip: 'Run test using Angular CLI',
      command: command,
      arguments: [fileName, testName],
    };
  }
}
