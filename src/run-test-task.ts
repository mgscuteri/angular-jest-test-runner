import { Task, ShellExecution, TaskScope, workspace } from "vscode";
import constants from "./constants";

const taskType = `${constants.extensionName}.taskProvider`;

export function runTestTask(fileName: string, testName: string): Task {
  let testExecString = `node ./node_modules/@angular/cli/bin/ng.js test --test-path-pattern="${fileName}" --test-name-pattern="${testName} --code-coverage false"`;

  const cwd =
    workspace
      .getConfiguration(`${constants.extensionName}.debug`)
      .get<string>("projectPath") || "";

  const testExec = new ShellExecution(testExecString, {
    cwd,
  });

  return new Task(
    { type: taskType },
    TaskScope.Workspace,
    "Test",
    constants.extensionName,
    testExec
  );
}
