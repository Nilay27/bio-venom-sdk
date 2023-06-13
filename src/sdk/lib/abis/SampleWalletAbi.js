export const SampleWalletAbi = {
    "ABI version": 2,
    "version": "2.3",
    "header": ["time", "expire"],
    "functions": [
        {
            "name": "constructor",
            "inputs": [],
            "outputs": []
        },
        {
            "name": "encodeSignatureParams",
            "inputs": [
                { "name": "r", "type": "uint256" },
                { "name": "s", "type": "uint256" },
                { "name": "x1", "type": "uint256" },
                { "name": "y1", "type": "uint256" },
                { "name": "x2", "type": "uint256" },
                { "name": "y2", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "cell" }
            ]
        },
        {
            "name": "encodeUserOperation",
            "inputs": [
                { "name": "_signatureOp", "type": "cell" },
                { "name": "_payloadOp", "type": "cell" },
                { "name": "_valueOp", "type": "uint128" }
            ],
            "outputs": [
                { "name": "value0", "type": "cell" }
            ]
        },
        {
            "name": "sendTransaction",
            "inputs": [
                { "name": "dest", "type": "address" },
                { "name": "value", "type": "uint128" },
                { "name": "bounce", "type": "bool" },
                { "name": "userOp", "type": "cell" }
            ],
            "outputs": []
        },
        {
            "name": "mulDivMod",
            "inputs": [
                { "name": "x", "type": "uint256" },
                { "name": "y", "type": "uint256" },
                { "name": "z", "type": "uint256" }
            ],
            "outputs": [
                { "name": "remainder", "type": "uint256" }
            ]
        },
        {
            "name": "modAdd",
            "inputs": [
                { "name": "r", "type": "uint256" },
                { "name": "s", "type": "uint256" },
                { "name": "t", "type": "uint256" }
            ],
            "outputs": [
                { "name": "result", "type": "uint256" }
            ]
        },
        {
            "name": "inverseMod",
            "inputs": [
                { "name": "u", "type": "uint256" },
                { "name": "m", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "uint256" }
            ]
        },
        {
            "name": "toProjectivePoint",
            "inputs": [
                { "name": "x0", "type": "uint256" },
                { "name": "y0", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "uint256[]" }
            ]
        },
        {
            "name": "toAffinePoint",
            "inputs": [
                { "name": "x0", "type": "uint256" },
                { "name": "y0", "type": "uint256" },
                { "name": "z0", "type": "uint256" }
            ],
            "outputs": [
                { "name": "x1", "type": "uint256" },
                { "name": "y1", "type": "uint256" }
            ]
        },
        {
            "name": "zeroProj",
            "inputs": [],
            "outputs": [
                { "name": "x", "type": "uint256" },
                { "name": "y", "type": "uint256" },
                { "name": "z", "type": "uint256" }
            ]
        },
        {
            "name": "zeroAffine",
            "inputs": [],
            "outputs": [
                { "name": "x", "type": "uint256" },
                { "name": "y", "type": "uint256" }
            ]
        },
        {
            "name": "isZeroCurve",
            "inputs": [
                { "name": "x0", "type": "uint256" },
                { "name": "y0", "type": "uint256" }
            ],
            "outputs": [
                { "name": "isZero", "type": "bool" }
            ]
        },
        {
            "name": "isOnCurve",
            "inputs": [
                { "name": "x", "type": "uint256" },
                { "name": "y", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "bool" }
            ]
        },
        {
            "name": "twiceProj",
            "inputs": [
                { "name": "x0", "type": "uint256" },
                { "name": "y0", "type": "uint256" },
                { "name": "z0", "type": "uint256" }
            ],
            "outputs": [
                { "name": "x1", "type": "uint256" },
                { "name": "y1", "type": "uint256" },
                { "name": "z1", "type": "uint256" }
            ]
        },
        {
            "name": "addProj",
            "inputs": [
                { "name": "x0", "type": "uint256" },
                { "name": "y0", "type": "uint256" },
                { "name": "z0", "type": "uint256" },
                { "name": "x1", "type": "uint256" },
                { "name": "y1", "type": "uint256" },
                { "name": "z1", "type": "uint256" }
            ],
            "outputs": [
                { "name": "x2", "type": "uint256" },
                { "name": "y2", "type": "uint256" },
                { "name": "z2", "type": "uint256" }
            ]
        },
        {
            "name": "add",
            "inputs": [
                { "name": "x0", "type": "uint256" },
                { "name": "y0", "type": "uint256" },
                { "name": "x1", "type": "uint256" },
                { "name": "y1", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "uint256" },
                { "name": "value1", "type": "uint256" }
            ]
        },
        {
            "name": "twice",
            "inputs": [
                { "name": "x0", "type": "uint256" },
                { "name": "y0", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "uint256" },
                { "name": "value1", "type": "uint256" }
            ]
        },
        {
            "name": "multiplyPowerBase2",
            "inputs": [
                { "name": "x0", "type": "uint256" },
                { "name": "y0", "type": "uint256" },
                { "name": "exp", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "uint256" },
                { "name": "value1", "type": "uint256" }
            ]
        },
        {
            "name": "multiplyScalar",
            "inputs": [
                { "name": "x0", "type": "uint256" },
                { "name": "y0", "type": "uint256" },
                { "name": "scalar", "type": "uint256" }
            ],
            "outputs": [
                { "name": "x1", "type": "uint256" },
                { "name": "y1", "type": "uint256" }
            ]
        },
        {
            "name": "multipleGeneratorByScalar",
            "inputs": [
                { "name": "scalar", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "uint256" },
                { "name": "value1", "type": "uint256" }
            ]
        },
        {
            "name": "getXYCoordinates",
            "inputs": [
                { "name": "message", "type": "uint256" },
                { "name": "rs", "type": "uint256[]" },
                { "name": "Q", "type": "uint256[]" }
            ],
            "outputs": [
                { "name": "value0", "type": "uint256" },
                { "name": "value1", "type": "uint256" },
                { "name": "value2", "type": "uint256" },
                { "name": "value3", "type": "uint256" }
            ]
        },
        {
            "name": "getSinv",
            "inputs": [
                { "name": "rs1", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "uint256" }
            ]
        },
        {
            "name": "validateSignatureWithXY",
            "inputs": [
                { "name": "r", "type": "uint256" },
                { "name": "s", "type": "uint256" },
                { "name": "x1", "type": "uint256" },
                { "name": "y1", "type": "uint256" },
                { "name": "x2", "type": "uint256" },
                { "name": "y2", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "bool" }
            ]
        },
        {
            "name": "returnModulo",
            "inputs": [
                { "name": "x", "type": "uint256" },
                { "name": "y", "type": "uint256" }
            ],
            "outputs": [
                { "name": "value0", "type": "uint256" }
            ]
        }
    ],
    "data": [
        { "key": 1, "name": "_nonce", "type": "uint16" }
    ],
    "events": [],
    "fields": [
        { "name": "_pubkey", "type": "uint256" },
        { "name": "_timestamp", "type": "uint64" },
        { "name": "_constructorFlag", "type": "bool" },
        { "name": "_nonce", "type": "uint16" },
        { "name": "ellipticCurve", "type": "address" },
        { "name": "nonce", "type": "uint256" }
    ]
};
//# sourceMappingURL=SampleWalletAbi.js.map