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
exports.activate = void 0;
const vscode = require("vscode");
const HelloWorldPanel_1 = require("./panels/HelloWorldPanel");
const checkCLI_1 = require("./utilities/checkCLI");
const getHandlers_1 = require("./utilities/getHandlers");
const utils_1 = require("./utilities/utils");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // https://move2kube.konveyor.io/releaseinfo.json
        // Create output channel.
        const outputChannel = vscode.window.createOutputChannel("Move2Kube");
        (0, utils_1.setOutputChannelForDesktopCommands)(outputChannel);
        // Check if `move2kube` is installed or not.
        if (!(yield (0, checkCLI_1.isCLIInstalled)("0.3.6"))) {
            vscode.window.showErrorMessage(`move2kube is not installed or installed version is not compatible with the current system.`);
        }
        //Check for updates.
        const checkForUpdatesCommand = vscode.commands.registerCommand("m2k.checkForUpdates", getHandlers_1.checkForUpdates);
        // Create the show hello world command
        const showHelloWorldCommand = vscode.commands.registerCommand("m2k.showHelloWorld", () => {
            HelloWorldPanel_1.HelloWorldPanel.render(context.extensionUri);
        });
        // `plan` command.
        const planCommand = vscode.commands.registerCommand("m2k.plan", getHandlers_1.makePlan);
        // `transform` command.
        const transformCommand = vscode.commands.registerCommand("m2k.transform", getHandlers_1.createTransform);
        // `transform` command with customizations.
        const customizationTransformCommand = vscode.commands.registerCommand("m2k.customizationTransform", getHandlers_1.createCustomizationTransform);
        // Add command to the extension context
        context.subscriptions.push(showHelloWorldCommand);
        context.subscriptions.push(transformCommand);
        context.subscriptions.push(customizationTransformCommand);
        context.subscriptions.push(planCommand);
        context.subscriptions.push(checkForUpdatesCommand);
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map