# BioVenomSdk

Presenting an innovative solution designed to transform user engagement with the Venom Network - a Biometric Based onboarding of users realized through a versatile SDK that can be seamlessly integrated into any web-based DApp.

Our solution mitigates the risks faced by users of traditional browser wallets by storing keys securely within the secure enclave of mobile devices, thereby eliminating the need for a seed phrase.

With BioVenomSdk, we can combine the strengths of both browser wallets and hardware wallets, while effectively mitigating their respective weaknesses. The private key never leaves the device, and is therefore never exposed, guaranteeing a level of security comparable to that of hardware wallets, all while ensuring a smooth and effortless onboarding experience for users.

## Features

BioVenomSdk includes the following modules:

### WebAuthn Module

This [WebAuthn](https://github.com/Nilay27/bio-venom-sdk/tree/main/src/sdk/webauthn) module is used to manage and generate credentials from the secure enclave of your device. Notably, the **`signature generated from the secure enclave follows the P256 (or secp256r1) based signatures`**, which differs from the native signature scheme that **`Venom Supports (ED25519)`**. Thus, the signature needs to be verified on smart contracts.

An important feature to highlight is the **`Venom's native support for account abstraction`**. This feature enables us to attach the signature as a function argument and then send the transaction without signing it with an ED25519 based Signature, demonstrating the adaptability of our solution.

### BioVenomProvider

BioVenomProvider is the central module to manage signatures, send transactions to the blockchain, and create the ProviderRpcClient based on inpageProvider and EverscaleStandaloneClient.

## BioVenomProvider Class

The BioVenomProvider class offers various methods for interacting with the Venom network.

### Instance Creation
```javascript
 const bioVenomProvider = new BioVenomProvider()
```

### Methods

#### 1. `getProvider()`

Creates an RpcClient based on EverscaleStandaloneClient.

```javascript
let provider = bioVenomProvider.getProvider();
```
#### 2. `setWalletContract`

Sets the address of your wallet contract deployed on venom.

```javascript
bioVenomProvider.setWalletContract("Your Wallet Contract Address Here");
```

#### 3. `getAnyWalletContract`
Returns the contract of any address which follows the ABI of BioVenomSDK based smart contract.
```javascript
let contract = bioVenomProvider.getAnyWalletContract("Target Wallet Contract Address Here");
```
#### 4. `deployWalletContract`
Deploys the wallet contract with the Public key generated from secure enclave. The public key is used on the smart contract to verify the signature.
```javascript
let deployPromise = bioVenomProvider.deployWalletContract("Your Public Key Here");
```
#### 5. `createUnsignedUserOp`
Creates an unsigned UserOperation which basically contains the nonce of the wallet, the payload to be executed, and the value to be transferred to an arbitrary method. This is what is sent to the secure enclave for signing.
```javascript
let unsignedUserOp = bioVenomProvider.createUnsignedUserOp("Your Encoded Payload Here");
```
Note: The UserOperation follows the following struct, defined in the smart contract wallet:
```solidity
struct UserOperation {
    uint _nonce;
    TvmCell _signature;
    TvmCell _payload;
    uint128 _value;
}
```
#### 6. `signTvmCellUserOp`
Calls the BioVenomSigner with unsignedUserOp and unique encodedId to identify the private key which is eligible to sign the userOperation. Returns signed userOp.
```javascript
let signedUserOp = bioVenomProvider.signTvmCellUserOp(unsignedUserOp, "Your Encoded ID Here", "Your Public Key Here");
```

#### 7. `executeTransaction`
Calls the sendTransaction method in the smart contract with all the data along with signedUserOperation.
```javascript
let transactionPromise = bioVenomProvider.executeTransaction("Destination Address Here", signedUserOp, "Value Here");
```
These methods provide a comprehensive interface for managing and interacting with your contracts on the Venom network. As this project evolves, more functionality and utility will be added to this core class.

## BioVenomSigner Class

BioVenomSigner is responsible for signing the Partial Unsigned User Operation. It sends the `userOp` to the secure enclave for signing for the corresponding Public Key and unique credential mapping, and then returns the `secp256r1` based signature along with the `hash of the message` that was signed.

### Method

#### 1. `sign`

This method accepts an `unsignedUserOperation`, an `encodedId` that serves as a unique credential mapping, and a `pubkey` as arguments. It calls the webauthn API inside the [WebAuthn](https://github.com/Nilay27/bio-venom-sdk/tree/main/src/sdk/webauthn) module to generate a signature and returns the signature `(r,s)` and `(X,Y)` coordinates of the signed message multiplied by the `Generator Point of P256 curve and the Public Key`.

```javascript
const bioVenomSigner = new BioVenomSigner();
const signedMessage = bioVenomSigner.sign(unsignedUserOperation, encodedId, pubkey);
