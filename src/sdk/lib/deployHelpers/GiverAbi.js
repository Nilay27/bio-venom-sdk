export const GiverAbi = {
    "ABI version": 2,
    "data": [],
    "events": [],
    "fields": [
        {
            "name": "_pubkey",
            "type": "uint256"
        },
        {
            "name": "_timestamp",
            "type": "uint64"
        }
    ],
    "functions": [
        {
            "inputs": [
                {
                    "name": "dest",
                    "type": "address"
                },
                {
                    "name": "value",
                    "type": "uint128"
                },
                {
                    "name": "bounce",
                    "type": "bool"
                },
                {
                    "name": "flags",
                    "type": "uint8"
                },
                {
                    "name": "payload",
                    "type": "cell"
                }
            ],
            "name": "sendTransaction",
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "flags",
                    "type": "uint8"
                },
                {
                    "name": "message",
                    "type": "cell"
                }
            ],
            "name": "sendTransactionRaw",
            "outputs": []
        }
    ],
    "header": [
        "pubkey",
        "time",
        "expire"
    ],
    "version": "2.3"
};
//# sourceMappingURL=GiverAbi.js.map