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
exports.isCLIInstalled = exports.getLatestVersionFromGithub = void 0;
const child_process = require("child_process");
const axios_1 = require("axios");
const constants_1 = require("./constants");
function getLatestVersionFromGithub() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://api.github.com/repos/${constants_1.reponame}/releases/latest`, {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            headers: { "User-Agent": "Mozilla/5.0" },
        });
        const latestVersion = response.data.tag_name.replace(/^v/, "");
        return latestVersion;
    });
}
exports.getLatestVersionFromGithub = getLatestVersionFromGithub;
function isCLIInstalled(expectedVersion) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result;
            // let latestVersion: string | undefined;
            result = child_process.execSync(`${constants_1.cliName} version`).toString().trim();
            const installedVersion = (_a = result === null || result === void 0 ? void 0 : result.match(/\d+\.\d+\.\d+/)) === null || _a === void 0 ? void 0 : _a[0];
            if (!installedVersion) {
                return false;
            }
            const [installedMajor, installedMinor, installedPatch] = installedVersion
                .split(".")
                .map(Number);
            const [expectedMajor, expectedMinor, expectedPatch] = expectedVersion.split(".").map(Number);
            if (installedMajor !== expectedMajor ||
                installedMinor < expectedMinor ||
                (installedMinor === expectedMinor && installedPatch < expectedPatch)) {
                return false;
            }
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.isCLIInstalled = isCLIInstalled;
//# sourceMappingURL=checkCLI.js.map