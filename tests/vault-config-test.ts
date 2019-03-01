
import * as assert from "assert"
import * as express from 'express';
import  VaultConfig from '../VaultConfig';

describe("Vault Config  Test",()=>{

    const testPort = 3000;
    let app:express.Application;
    let server:any
    before((done)=>{
        app = express();
        server = app.listen(testPort, () => {
            done();
        })
    })
    
    beforeEach(()=>{
        
            app.get("/vault/m2p/pin/key",(req,res:express.Response)=>{
                let token = req.headers['x-vault-token'];
                let payload = {
                    "request_id": "fe9981c1-7148-3e9e-0f6b-435a88558bd1",
                    "lease_id": "",
                    "renewable": false,
                    "lease_duration": 2764800,
                    "data": {
                        "value": "vault-sample-value"
                    },
                    "wrap_info": null,
                    "warnings": null,
                    "auth": null
                };
                token === "vault-token" ? res.send(payload) : res.send({error:"token not provided"});
    
            })
        
    })


    let baseUrl = "http://localhost:" + testPort + "/vault"
    it(`fetches config properly`,(done)=>{

       let vt = new VaultConfig({basePath:baseUrl,token:"vault-token"})
       vt.get("m2p/pin/key").then((value)=>{
           assert.equal(value,"vault-sample-value");
           done();
       }).catch((err)=>{
           done(err);
       })
       
   })


    after((done) => {
        server.close();
     done()
    })
})