A package to get config from vault server

```shell
npm install --save node-vault-config
```

## Usage

```javascript
// import { VaultFactory } from 'node-vault-config';

const VaultFactory = require('node-vault-config').VaultFactory;
let vt = VaultFactory.create("<server_url>", "<vault-auth-token>");

let value = await vt.get("/path/to/resource");

```