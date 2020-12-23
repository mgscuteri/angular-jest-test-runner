import { Task, ShellExecution, TaskScope } from 'vscode';
import constants from './constants';

const taskType = `${constants.extensionName}.taskProvider`;

export function runTestTask(fileName: string, testName: string): Task {
  let testExecString = `ng test --test-path-pattern="${fileName}"  --test-name-pattern="${testName}"`;

  const testExec = new ShellExecution(testExecString);

  return new Task(
    { type: taskType },
    TaskScope.Workspace,
    'Test',
    constants.extensionName,
    testExec
  );
}
