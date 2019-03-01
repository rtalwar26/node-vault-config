"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("node-fetch");
class VaultConfig {
    constructor(options) {
        this.basePath = options.basePath;
        this.token = options.token;
    }
    async get(path) {
        try {
            let result = await fetch(`${this.basePath}/${path}`, {
                headers: { "X-Vault-Token": this.token },
                method: "GET"
            });
            return (await result.json()).data.value;
        }
        catch (E) {
            throw new Error(`Vault Config not found at path "${this.basePath}/${path}": ${E.toString()}`);
        }
    }
}
exports.default = VaultConfig;
class VaultFactory {
    static create(basePath, token) {
        return new VaultConfig({ basePath: basePath, token: token });
    }
}
exports.VaultFactory = VaultFactory;
