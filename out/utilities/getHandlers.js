"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomizationTransform = exports.createTransform = exports.makePlan = exports.checkForUpdates = void 0;
const vscode = require("vscode");
const child_process = require("child_process");
const checkCLI_1 = require("./checkCLI");
const utils_1 = require("./utils");
const path = require("path");
let outputChannel;
function checkForUpdates() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Checking for updates...",
                cancellable: false,
            }, (progress) => __awaiter(this, void 0, void 0, function* () {
                try {
                    progress.report({ increment: 0 });
                    const latestVersion = yield (0, checkCLI_1.getLatestVersionFromGithub)();
                    (0, utils_1.showTimedInformationMessage)(`Latest version for move2kube is : ${latestVersion}.\n If you wish to update to the latest version, please visit: https://move2kube.konveyor.io/installation/ `, 5000);
                }
                catch (error) {
                    vscode.window.showErrorMessage("Error checking for updates");
                }
            }));
        }
        catch (err) {
            vscode.window.showErrorMessage(`Failed to check for updates.\n [ERROR] : ${err}`);
        }
        return false;
    });
}
exports.checkForUpdates = checkForUpdates;
function makePlan(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, utils_1.showTimedInformationMessage)(`Move2Kube: Running plan command...`, 3000);
            const cwd = (uri === null || uri === void 0 ? void 0 : uri.fsPath) ||
                (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) ||
                process.cwd();
            outputChannel.show();
            outputChannel.clear();
            const result = child_process.spawn("move2kube", ["plan"], { cwd }); // async spawn
            result.stdout.on("data", (data) => {
                outputChannel.appendLine(data.toString());
            });
            result.stderr.on("data", (data) => {
                outputChannel.appendLine(data.toString());
            });
            result.on("exit", () => (0, utils_1.showTimedInformationMessage)(`Successfully generated plan for ${cwd} directory.`, 3000));
        }
        catch (err) {
            vscode.window.showErrorMessage(`Failed to generate plan.\n [ERROR] : ${err}`);
        }
        return false; // Maybe remove this return statement.
    });
}
exports.makePlan = makePlan;
function createTransform(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, utils_1.showTimedInformationMessage)(`Move2Kube: Starting transform command...`, 3000);
            const terminal = (0, utils_1.getTerminalForDesktopCommands)();
            const cwd = (uri === null || uri === void 0 ? void 0 : uri.fsPath) ||
                (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) ||
                process.cwd();
            terminal.show();
            terminal.sendText(`cd .. && mkdir outputFolder && cd outputFolder`);
            const { workspaceFolders } = vscode.workspace;
            vscode.workspace.updateWorkspaceFolders(workspaceFolders ? workspaceFolders.length : 0, 0, {
                name: "outputFolder",
                uri: vscode.Uri.file(path.join(cwd, "..", "outputFolder")),
            });
            terminal.sendText(`move2kube transform -s ${cwd}`);
        }
        catch (err) {
            vscode.window.showErrorMessage(`Failed to run transform.\n [ERROR] : ${err}`);
        }
        return false; // Maybe remove this return statement.
    });
}
exports.createTransform = createTransform;
function createCustomizationTransform(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, utils_1.showTimedInformationMessage)(`Move2Kube: Starting transform command with customizations...`, 3000);
            const terminal = (0, utils_1.getTerminalForDesktopCommands)();
            const cwd = (uri === null || uri === void 0 ? void 0 : uri.fsPath) ||
                (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) ||
                process.cwd();
            const customizationFolder = yield (0, utils_1.selectFolder)("Select customization folder");
            terminal.show();
            terminal.sendText(`move2kube transform -s ${cwd} -c ${customizationFolder} --qa-skip`); // Remove qa-skip flag later.
        }
        catch (err) {
            vscode.window.showErrorMessage(`Failed to run transform with customizations.\n [ERROR] : ${err}`);
        }
        return false;
    });
}
exports.createCustomizationTransform = createCustomizationTransform;
//# sourceMappingURL=getHandlers.js.map