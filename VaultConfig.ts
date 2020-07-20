const fetch = require("node-fetch");
export default class VaultConfig {
    token: string
    basePath: string
    constructor(options: { basePath: string, token: string }) {
        this.basePath = options.basePath;
        this.token = options.token;
    }

    async get(path: string): Promise<any> {

        try {
            let result: any = await fetch(`${this.basePath}/${path}`, {
                headers: { "X-Vault-Token": this.token },
                method: "GET"
            });
            return (await result.json()).data.value;
        } catch (E) {
            throw new Error(`Vault Config not found at path "${this.basePath}/${path}": ${E.toString()}`);
        }

    }

}

export class VaultFactory {

    static create(basePath: string, token: string): VaultConfig {
        return new VaultConfig({ basePath: basePath, token: token });

    }
}
