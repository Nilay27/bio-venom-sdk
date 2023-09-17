export const SampleWalletContract = {
    abi: {
        'ABI version': 2,
        version: '2.2',
        header: ['time', 'expire'],
        functions: [
            {
                name: 'constructor',
                inputs: [
                    {
                        name: '_Q0',
                        type: 'uint256',
                    },
                    {
                        name: '_Q1',
                        type: 'uint256',
                    },
                ],
                outputs: [],
            },
            {
                name: 'encodeSignatureParams',
                inputs: [
                    {
                        name: 'r',
                        type: 'uint256',
                    },
                    {
                        name: 's',
                        type: 'uint256',
                    },
                    {
                        name: 'x1',
                        type: 'uint256',
                    },
                    {
                        name: 'y1',
                        type: 'uint256',
                    },
                    {
                        name: 'x2',
                        type: 'uint256',
                    },
                    {
                        name: 'y2',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'cell',
                    },
                ],
            },
            {
                name: 'encodeUserOperation',
                inputs: [
                    {
                        name: '_signatureOp',
                        type: 'cell',
                    },
                    {
                        name: '_payloadOp',
                        type: 'cell',
                    },
                    {
                        name: '_valueOp',
                        type: 'uint128',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'cell',
                    },
                ],
            },
            {
                name: 'checkQ1Q2',
                inputs: [
                    {
                        name: 'r',
                        type: 'uint256',
                    },
                    {
                        name: 's',
                        type: 'uint256',
                    },
                    {
                        name: '_x1',
                        type: 'uint256',
                    },
                    {
                        name: '_y1',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'bool',
                    },
                ],
            },
            {
                name: 'getNonce',
                inputs: [],
                outputs: [
                    {
                        name: 'value0',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'sendTransaction',
                inputs: [
                    {
                        name: 'dest',
                        type: 'address',
                    },
                    {
                        name: 'value',
                        type: 'uint128',
                    },
                    {
                        name: 'bounce',
                        type: 'bool',
                    },
                    {
                        name: 'userOp',
                        type: 'cell',
                    },
                ],
                outputs: [],
            },
            {
                name: 'mulDivMod',
                inputs: [
                    {
                        name: 'x',
                        type: 'uint256',
                    },
                    {
                        name: 'y',
                        type: 'uint256',
                    },
                    {
                        name: 'z',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'remainder',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'modAdd',
                inputs: [
                    {
                        name: 'r',
                        type: 'uint256',
                    },
                    {
                        name: 's',
                        type: 'uint256',
                    },
                    {
                        name: 't',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'result',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'inverseMod',
                inputs: [
                    {
                        name: 'u',
                        type: 'uint256',
                    },
                    {
                        name: 'm',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'toProjectivePoint',
                inputs: [
                    {
                        name: 'x0',
                        type: 'uint256',
                    },
                    {
                        name: 'y0',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'uint256[]',
                    },
                ],
            },
            {
                name: 'toAffinePoint',
                inputs: [
                    {
                        name: 'x0',
                        type: 'uint256',
                    },
                    {
                        name: 'y0',
                        type: 'uint256',
                    },
                    {
                        name: 'z0',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'x1',
                        type: 'uint256',
                    },
                    {
                        name: 'y1',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'zeroProj',
                inputs: [],
                outputs: [
                    {
                        name: 'x',
                        type: 'uint256',
                    },
                    {
                        name: 'y',
                        type: 'uint256',
                    },
                    {
                        name: 'z',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'zeroAffine',
                inputs: [],
                outputs: [
                    {
                        name: 'x',
                        type: 'uint256',
                    },
                    {
                        name: 'y',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'isZeroCurve',
                inputs: [
                    {
                        name: 'x0',
                        type: 'uint256',
                    },
                    {
                        name: 'y0',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'isZero',
                        type: 'bool',
                    },
                ],
            },
            {
                name: 'isOnCurve',
                inputs: [
                    {
                        name: 'x',
                        type: 'uint256',
                    },
                    {
                        name: 'y',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'bool',
                    },
                ],
            },
            {
                name: 'twiceProj',
                inputs: [
                    {
                        name: 'x0',
                        type: 'uint256',
                    },
                    {
                        name: 'y0',
                        type: 'uint256',
                    },
                    {
                        name: 'z0',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'x1',
                        type: 'uint256',
                    },
                    {
                        name: 'y1',
                        type: 'uint256',
                    },
                    {
                        name: 'z1',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'addProj',
                inputs: [
                    {
                        name: 'x0',
                        type: 'uint256',
                    },
                    {
                        name: 'y0',
                        type: 'uint256',
                    },
                    {
                        name: 'z0',
                        type: 'uint256',
                    },
                    {
                        name: 'x1',
                        type: 'uint256',
                    },
                    {
                        name: 'y1',
                        type: 'uint256',
                    },
                    {
                        name: 'z1',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'x2',
                        type: 'uint256',
                    },
                    {
                        name: 'y2',
                        type: 'uint256',
                    },
                    {
                        name: 'z2',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'add',
                inputs: [
                    {
                        name: 'x0',
                        type: 'uint256',
                    },
                    {
                        name: 'y0',
                        type: 'uint256',
                    },
                    {
                        name: 'x1',
                        type: 'uint256',
                    },
                    {
                        name: 'y1',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'uint256',
                    },
                    {
                        name: 'value1',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'twice',
                inputs: [
                    {
                        name: 'x0',
                        type: 'uint256',
                    },
                    {
                        name: 'y0',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'uint256',
                    },
                    {
                        name: 'value1',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'multiplyPowerBase2',
                inputs: [
                    {
                        name: 'x0',
                        type: 'uint256',
                    },
                    {
                        name: 'y0',
                        type: 'uint256',
                    },
                    {
                        name: 'exp',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'uint256',
                    },
                    {
                        name: 'value1',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'multiplyScalar',
                inputs: [
                    {
                        name: 'x0',
                        type: 'uint256',
                    },
                    {
                        name: 'y0',
                        type: 'uint256',
                    },
                    {
                        name: 'scalar',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'x1',
                        type: 'uint256',
                    },
                    {
                        name: 'y1',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'multipleGeneratorByScalar',
                inputs: [
                    {
                        name: 'scalar',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'uint256',
                    },
                    {
                        name: 'value1',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'getXYCoordinates',
                inputs: [
                    {
                        name: 'message',
                        type: 'uint256',
                    },
                    {
                        name: 'rs',
                        type: 'uint256[]',
                    },
                    {
                        name: 'Q',
                        type: 'uint256[]',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'uint256',
                    },
                    {
                        name: 'value1',
                        type: 'uint256',
                    },
                    {
                        name: 'value2',
                        type: 'uint256',
                    },
                    {
                        name: 'value3',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'getSinv',
                inputs: [
                    {
                        name: 'rs1',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'validateSignatureWithXY',
                inputs: [
                    {
                        name: 'r',
                        type: 'uint256',
                    },
                    {
                        name: 's',
                        type: 'uint256',
                    },
                    {
                        name: 'x1',
                        type: 'uint256',
                    },
                    {
                        name: 'y1',
                        type: 'uint256',
                    },
                    {
                        name: 'x2',
                        type: 'uint256',
                    },
                    {
                        name: 'y2',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'bool',
                    },
                ],
            },
            {
                name: 'returnModulo',
                inputs: [
                    {
                        name: 'x',
                        type: 'uint256',
                    },
                    {
                        name: 'y',
                        type: 'uint256',
                    },
                ],
                outputs: [
                    {
                        name: 'value0',
                        type: 'uint256',
                    },
                ],
            },
        ],
        data: [
            {
                key: 1,
                name: '_nonce',
                type: 'uint256',
            },
        ],
        events: [],
        fields: [
            {
                name: '_pubkey',
                type: 'uint256',
            },
            {
                name: '_timestamp',
                type: 'uint64',
            },
            {
                name: '_constructorFlag',
                type: 'bool',
            },
            {
                name: '_nonce',
                type: 'uint256',
            },
            {
                name: 'nonce',
                type: 'uint256',
            },
            {
                name: 'Q0',
                type: 'uint256',
            },
            {
                name: 'Q1',
                type: 'uint256',
            },
        ],
    },
    tvc: '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9A7ystcL/9s88uBmcF8gcSVpQgLsbxGAIPQO8rLXC/+C8P////8AAAAA//////////+85vqtpxeehPO5ysL8YyVR2zyC8GsX0fLhLEJH+Lzm5WOkQPJ3A32BLeszoPShOUXYmMKWgvBP40Li/hp/m47n60p8D54WK84zV2sxXs7LtkBoN79R9VUHI2hDBPiC8P////8AAAAA//////////+85vqtpxeehPO5ysL8YyVR2zzbPDM0cCVvEYAg9A7ystcL/3FVBW8RgCD0DvKy1wv/cFUGbxGAIPQO8rLXC/9VAoLw/////wAAAAD//////////7zm+q2nF56E87nKwvxjJVHbPNs8ATMSb0RvRARgcCBwI46AjoDi3F8kcSBVBzZVBjUmqTgAlHAgNjbfJqsAN5MmwgCOgOhVE1jbPGxCV1VFWwIoXzPbPDQ0NCapOADAAY6A3iarADdcRgEWXzNfKFUE2zwCNzVHBLhwXyBwXynbPJVVI2xzdI6A4txTc4Lw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPFNXgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////2dUb0gEoNs8U6WC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zxTiYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPFy6b29vSQNkjoDgVQlVB4Lw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPFUDFNs8bHNRb0oC5HBfUCaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////VQihgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8KYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////8qoW5LBOqC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw1U0SC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw0UwCC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwyUxpub29MBOiC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwyU4mC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw5U4OC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw5IW9ub00D6ILw/////wAAAAEAAAAAAAAAAAAAAAD///////////////9VCaGC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwyU0GC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw3I1UEbm9OA+aC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwzJ1UDgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NyaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////VQKhb29PBOSC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw2VQSC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zxTQYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDVub29QAuCC8P////8AAAABAAAAAAAAAAAAAAAA////////////////VQShgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8MlUCgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8bm8CDlq6joCOgOJTUgEI2zxss2YBDFUn2zxsg1wBEl8m2zyTXwd04GcBCts8bGJ0VgAEcCABHHAkwAGTXwV0joDiINwwWAEMJMACjoDgWQEOVRTbPGxSdFoCElxx2zwCNDLbPFxbA+ZwAYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPFUCIYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDISgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8aG9vBKZwXzBfJts8joDgXyWC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zxygvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////2dlb10E4Ns8UweC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwngvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8coLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////9vb29eBOjbPFOIgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8OShzgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8M1NmgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////29vb18E6ts8NyaC8P////8AAAABAAAAAAAAAAAAAAAA///////////////8gvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NyJVBoLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDNTIm9vbmAD3oLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPHIigvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8OYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////8poW9vYQPggvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8AYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////8ioYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDhYJ25uYgTqgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8N1NRgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NlNVgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NnImb29vYwPmgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NlUFgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////1UGoYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDRSEG9uZAPggvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NFMAgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8MoLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPG9vbwEI2zxsc2YABnBxcAAWAcAAAcAAsJF/4HAAoCHAAF8iuiLAALGxkltw4CHAAZJbceBcvJRcqQgy3nBxIlUDcJMhwwCOF18iqQQxVHNAtP8mqKFUc0ImqKE1NTU16F8EIMEAlKO1/6Hgtf8xAvghwAAigvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////7oiwAAjgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////7qxsbGSW3DgIILw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPFMRb2oE3ILw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPCKC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zyC8P////8AAAABAAAAAAAAAAAAAAAA///////////////8joDeb29tawFOgvBaxjXYqjqT57PrvVV2mIa8ZR0GsMxTsPY7zjw+J9JgS46A3roxbAGMgvBaxjXYqjqT57PrvVV2mIa8ZR0GsMxTsPY7zjw+J9JgS4Lw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPG4C1iKC8P////8AAAABAAAAAAAAAAAAAAAA///////////////8gvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8gvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8b24ANlghqQhYIqkIhP+VVHIBobyUUyOhM+gwoAGpCAAGqYwxAETtRNDT/9M/0wAx0//T/9TR0NP/0//R+G34bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KF0cwAUc29sIDAuNjIuMAAA',
    code: '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//////+85vqtpxeehPO5ysL8YyVR2zyC8GsX0fLhLEJH+Lzm5WOkQPJ3A32BLeszoPShOUXYmMKWgvBP40Li/hp/m47n60p8D54WK84zV2sxXs7LtkBoN79R9VUHI2VABPiC8P////8AAAAA//////////+85vqtpxeehPO5ysL8YyVR2zzbPDM0cCVvEYAg9A7ystcL/3FVBW8RgCD0DvKy1wv/cFUGbxGAIPQO8rLXC/9VAoLw/////wAAAAD//////////7zm+q2nF56E87nKwvxjJVHbPNs8ATMSbEFsQQRgcCBwI46AjoDi3F8kcSBVBzZVBjUmqTgAlHAgNjbfJqsAN5MmwgCOgOhVE1jbPGxCVFJCWAIoXzPbPDQ0NCapOADAAY6A3iarADdZQwEWXzNfKFUE2zwCNzVEBLhwXyBwXynbPJVVI2xzdI6A4txTc4Lw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPFNXgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////2RRbEUEoNs8U6WC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zxTiYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPFy6bGxsRgNkjoDgVQlVB4Lw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPFUDFNs8bHNObEcC5HBfUCaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////VQihgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8KYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////8qoWtIBOqC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw1U0SC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw0UwCC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwyUxprbGxJBOiC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwyU4mC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw5U4OC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw5IWxrbEoD6ILw/////wAAAAEAAAAAAAAAAAAAAAD///////////////9VCaGC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwyU0GC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw3I1UEa2xLA+aC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwzJ1UDgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NyaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////VQKhbGxMBOSC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw2VQSC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zxTQYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDVrbGxNAuCC8P////8AAAABAAAAAAAAAAAAAAAA////////////////VQShgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8MlUCgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8a2wCDlq6joCOgOJQTwEI2zxss2MBDFUn2zxsg1kBEl8m2zyTXwd04GQBCts8bGJ0UwAEcCABHHAkwAGTXwV0joDiINwwVQEMJMACjoDgVgEOVRTbPGxSdFcCElxx2zwCNDLbPFlYA+ZwAYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPFUCIYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDISgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8ZWxsBKZwXzBfJts8joDgXyWC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zxygvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////2RibFoE4Ns8UweC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwngvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8coLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////9sbGxbBOjbPFOIgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8OShzgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8M1NmgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////2xsbFwE6ts8NyaC8P////8AAAABAAAAAAAAAAAAAAAA///////////////8gvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NyJVBoLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDNTImxsa10D3oLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPHIigvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8OYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////8poWxsXgPggvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8AYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////8ioYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDhYJ2trXwTqgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8N1NRgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NlNVgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NnImbGxsYAPmgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NlUFgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////1UGoYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDRSEGxrYQPggvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8NFMAgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8MoLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPGxsbAEI2zxsc2MABnBxcAAWAcAAAcAAsJF/4HAAoCHAAF8iuiLAALGxkltw4CHAAZJbceBcvJRcqQgy3nBxIlUDcJMhwwCOF18iqQQxVHNAtP8mqKFUc0ImqKE1NTU16F8EIMEAlKO1/6Hgtf8xAvghwAAigvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////7oiwAAjgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////7qxsbGSW3DgIILw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPFMRbGcE3ILw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPCKC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zyC8P////8AAAABAAAAAAAAAAAAAAAA///////////////8joDebGxqaAFOgvBaxjXYqjqT57PrvVV2mIa8ZR0GsMxTsPY7zjw+J9JgS46A3roxaQGMgvBaxjXYqjqT57PrvVV2mIa8ZR0GsMxTsPY7zjw+J9JgS4Lw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPGsC1iKC8P////8AAAABAAAAAAAAAAAAAAAA///////////////8gvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8gvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8bGsANlghqQhYIqkIhP+VVHIBobyUUyOhM+gwoAGpCAAGqYwxAETtRNDT/9M/0wAx0//T/9TR0NP/0//R+G34bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KFxcAAUc29sIDAuNjIuMAAA',
    codeHash: '583175822eb7355d5554cd6d6464cea5a6bd714e69b5395a4c021a8377a1b4a0',
};
// generated by using the command "everdev js wrap build/SampleWallet.abi.json "
// need to have everdev installed for it
//# sourceMappingURL=SampleWalletContract.js.map