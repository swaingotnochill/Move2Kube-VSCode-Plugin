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
exports.showTimedInformationMessage = exports.selectFolder = exports.getTerminalForDesktopCommands = exports.setOutputChannelForDesktopCommands = void 0;
const vscode = require("vscode");
let outputChannel;
function setOutputChannelForDesktopCommands(oc) {
    outputChannel = oc;
}
exports.setOutputChannelForDesktopCommands = setOutputChannelForDesktopCommands;
function getTerminalForDesktopCommands() {
    return vscode.window.createTerminal({
        name: "Move2Kube",
    });
}
exports.getTerminalForDesktopCommands = getTerminalForDesktopCommands;
function selectFolder(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            canSelectFolders: true,
            canSelectFiles: false,
            canSelectMany: false,
            openLabel: `Select Folder`,
            title: title,
        };
        const result = yield vscode.window.showOpenDialog(options);
        if (result && result.length > 0) {
            const folderPath = result[0].fsPath;
            return folderPath;
        }
        // If the user does not select any folder, return undefined.
        return undefined;
    });
}
exports.selectFolder = selectFolder;
function showTimedInformationMessage(message, duration) {
    const closeMessageItem = { title: "Close" };
    const promise = vscode.window.showInformationMessage(message, closeMessageItem);
    const timeout = setTimeout(() => {
        promise.then((selectedItem) => {
            if (!selectedItem) {
                vscode.commands.executeCommand("workbench.action.closeMessages");
            }
        });
    }, duration);
    promise.then((selectedItem) => {
        if (selectedItem === closeMessageItem) {
            clearTimeout(timeout);
        }
    });
}
exports.showTimedInformationMessage = showTimedInformationMessage;
//# sourceMappingURL=utils.js.map