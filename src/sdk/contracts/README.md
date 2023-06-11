# Elliptic Curve Contract

A pure Solidity implementation of elliptic curve secp256r1 / prime256v1 / p256. The provided code is a contract that implements elliptic curve mathematics, specifically parametrized for the SECP256R1 curve, which is used in many cryptographic systems, including all of the hardware devices we use such as mobiles, laptops, ipads etc. Elliptic curves are used in cryptography due to their properties that allow secure key exchange and digital signatures.

## SECP256r1 Elliptic Curve Cryptography

### Overview

Introduction to the mathematics behind the elliptic curve known as SECP256r1, which is widely used in cryptography. Elliptic Curve Cryptography (ECC) is based on the algebraic structure of elliptic curves over finite fields.

The SECP256r1 curve is defined by the equation `y² = x³ + ax + b` over a finite field.

For the SECP256r1 curve:

- The field is defined by p = `0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF`
- The curve parameters are a = `0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC` and b = `0x5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B`
- The base point G has the coordinates x = `0x6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296` and y = `0x4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5`
- The order of the base point G is n = `0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551`
- The cofactor is h = `0x01`

### Signature Verification

Signature verification is the process that verifies whether a message originates from a claimed sender (authentication), and the message hasn't been tampered with during transmission (integrity).

For a given message (M), public key (Q), and signature (r, s), the signature is verified as follows:

1. Compute `e = HASH(M)`; here HASH is the hash function, e.g., SHA-256.
2. Convert the hash value `e` to an integer.
3. Compute `w = s⁻¹ mod n`, where `s⁻¹` is the modular multiplicative inverse of s under n.
4. Compute `u1 = ew mod n` and `u2 = rw mod n`.
5. Compute the point `(x1, y1) = u1*G + u2*Q`.
6. The signature is valid if `r mod n = x1`, else it's invalid.

Note: `*` denotes the scalar multiplication operation in the context of elliptic curve points, and `+` denotes the elliptic curve point addition operation.

# Wallet Contract

The contract is an implementation of a simple wallet built on top of the Venom blockchain.

## Overview

The contract defines a simple wallet with basic functionality like transfers and signature validation. It leverages Elliptic Curve Cryptography for signature validation.

## Contract Details

The `Wallet` contract is defined with the following variables:

- `uint16 static _nonce;` - A static nonce variable.
- `uint256 constant INVALID_SIGNATURE = 108;` - A constant representing an invalid signature error.
- `uint256 constant INVALID_NONCE = 109;` - A constant representing an invalid nonce error.
- `struct UserOperation {...}` - A structure representing a user operation with fields: nonce, signature, payload, and value.
- `uint256 nonce;` - A nonce variable used to prevent replay attacks.
- `uint256 Q0;` - X coordinate of the Public Key of secp256r1 based signature
- `uint256 Q1;` - Y coordinate of the Public Key of secp256r1 based signature

The contract provides the following methods:

- `constructor(uint _Q0, uint _Q1) public` - The constructor initializes the contract with provided Q0 and Q1 parameters.
- `encodeSignatureParams(...)` - Encodes signature parameters into a `TvmCell`.
- `encodeUserOperation(...)` - Encodes user operation into a `TvmCell`.
- `checkQ1Q2(...)` - Checks Q1 and Q2 parameters.
- `validateSignature(TvmCell _userOpSignature)` - Validates a signature provided in a `TvmCell`.
- `sendTransaction(address dest, uint128 value, bool bounce, TvmCell userOp)` - Sends a transaction with arbitrary payload, thus enabling calling of any arbitrary method of any other contract.

## Usage

Users can interact with this contract by deploying it onto the Venom blockchain with the Q0 and Q1 parameters for the ECC. Once deployed, they can perform operations like sending transactions and validating signatures.

## Notes

This contract uses a nonce system to prevent replay attacks. Each operation is associated with a nonce, which is incremented after each operation. The nonce of an operation must match the current nonce of the contract, else the operation is deemed invalid. 

The contract uses Elliptic Curve Cryptography for signature validation.