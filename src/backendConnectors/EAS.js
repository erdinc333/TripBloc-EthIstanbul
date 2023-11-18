import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';


export async function eas(signer){
    console.log(signer,"signer")
    console.log("working")
    const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
    
    console.log("working2")
    schemaRegistry.connect(signer);
    
    const schema = "string eventId, bool value";
    const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
    const revocable = true;
    console.log("working3")
    
    const transaction = await schemaRegistry.register({
        schema,
        resolverAddress,
        revocable,
    });
    console.log("working4")
console.log(transaction)

}
