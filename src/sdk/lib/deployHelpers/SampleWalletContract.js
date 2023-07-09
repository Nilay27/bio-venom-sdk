export const SampleWalletContract = {
    abi: {
        "ABI version": 2,
        "version": "2.3",
        "header": [
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [
                    {
                        "name": "_Q0",
                        "type": "uint256"
                    },
                    {
                        "name": "_Q1",
                        "type": "uint256"
                    }
                ],
                "outputs": []
            },
            {
                "name": "encodeSignatureParams",
                "inputs": [
                    {
                        "name": "r",
                        "type": "uint256"
                    },
                    {
                        "name": "s",
                        "type": "uint256"
                    },
                    {
                        "name": "x1",
                        "type": "uint256"
                    },
                    {
                        "name": "y1",
                        "type": "uint256"
                    },
                    {
                        "name": "x2",
                        "type": "uint256"
                    },
                    {
                        "name": "y2",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "encodeUserOperation",
                "inputs": [
                    {
                        "name": "_signatureOp",
                        "type": "cell"
                    },
                    {
                        "name": "_payloadOp",
                        "type": "cell"
                    },
                    {
                        "name": "_valueOp",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "checkQ1Q2",
                "inputs": [
                    {
                        "name": "r",
                        "type": "uint256"
                    },
                    {
                        "name": "s",
                        "type": "uint256"
                    },
                    {
                        "name": "_x1",
                        "type": "uint256"
                    },
                    {
                        "name": "_y1",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "sendTransaction",
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
                        "name": "userOp",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "modAdd",
                "inputs": [
                    {
                        "name": "r",
                        "type": "uint256"
                    },
                    {
                        "name": "s",
                        "type": "uint256"
                    },
                    {
                        "name": "t",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "result",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "inverseMod",
                "inputs": [
                    {
                        "name": "u",
                        "type": "uint256"
                    },
                    {
                        "name": "m",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "toProjectivePoint",
                "inputs": [
                    {
                        "name": "x0",
                        "type": "uint256"
                    },
                    {
                        "name": "y0",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256[]"
                    }
                ]
            },
            {
                "name": "toAffinePoint",
                "inputs": [
                    {
                        "name": "x0",
                        "type": "uint256"
                    },
                    {
                        "name": "y0",
                        "type": "uint256"
                    },
                    {
                        "name": "z0",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "x1",
                        "type": "uint256"
                    },
                    {
                        "name": "y1",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "zeroProj",
                "inputs": [],
                "outputs": [
                    {
                        "name": "x",
                        "type": "uint256"
                    },
                    {
                        "name": "y",
                        "type": "uint256"
                    },
                    {
                        "name": "z",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "zeroAffine",
                "inputs": [],
                "outputs": [
                    {
                        "name": "x",
                        "type": "uint256"
                    },
                    {
                        "name": "y",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "isZeroCurve",
                "inputs": [
                    {
                        "name": "x0",
                        "type": "uint256"
                    },
                    {
                        "name": "y0",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "isZero",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "isOnCurve",
                "inputs": [
                    {
                        "name": "x",
                        "type": "uint256"
                    },
                    {
                        "name": "y",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "twiceProj",
                "inputs": [
                    {
                        "name": "x0",
                        "type": "uint256"
                    },
                    {
                        "name": "y0",
                        "type": "uint256"
                    },
                    {
                        "name": "z0",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "x1",
                        "type": "uint256"
                    },
                    {
                        "name": "y1",
                        "type": "uint256"
                    },
                    {
                        "name": "z1",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "addProj",
                "inputs": [
                    {
                        "name": "x0",
                        "type": "uint256"
                    },
                    {
                        "name": "y0",
                        "type": "uint256"
                    },
                    {
                        "name": "z0",
                        "type": "uint256"
                    },
                    {
                        "name": "x1",
                        "type": "uint256"
                    },
                    {
                        "name": "y1",
                        "type": "uint256"
                    },
                    {
                        "name": "z1",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "x2",
                        "type": "uint256"
                    },
                    {
                        "name": "y2",
                        "type": "uint256"
                    },
                    {
                        "name": "z2",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "add",
                "inputs": [
                    {
                        "name": "x0",
                        "type": "uint256"
                    },
                    {
                        "name": "y0",
                        "type": "uint256"
                    },
                    {
                        "name": "x1",
                        "type": "uint256"
                    },
                    {
                        "name": "y1",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    },
                    {
                        "name": "value1",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "twice",
                "inputs": [
                    {
                        "name": "x0",
                        "type": "uint256"
                    },
                    {
                        "name": "y0",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    },
                    {
                        "name": "value1",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "multiplyPowerBase2",
                "inputs": [
                    {
                        "name": "x0",
                        "type": "uint256"
                    },
                    {
                        "name": "y0",
                        "type": "uint256"
                    },
                    {
                        "name": "exp",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    },
                    {
                        "name": "value1",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "multiplyScalar",
                "inputs": [
                    {
                        "name": "x0",
                        "type": "uint256"
                    },
                    {
                        "name": "y0",
                        "type": "uint256"
                    },
                    {
                        "name": "scalar",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "x1",
                        "type": "uint256"
                    },
                    {
                        "name": "y1",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "multipleGeneratorByScalar",
                "inputs": [
                    {
                        "name": "scalar",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    },
                    {
                        "name": "value1",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "getXYCoordinates",
                "inputs": [
                    {
                        "name": "message",
                        "type": "uint256"
                    },
                    {
                        "name": "rs",
                        "type": "uint256[]"
                    },
                    {
                        "name": "Q",
                        "type": "uint256[]"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    },
                    {
                        "name": "value1",
                        "type": "uint256"
                    },
                    {
                        "name": "value2",
                        "type": "uint256"
                    },
                    {
                        "name": "value3",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "getSinv",
                "inputs": [
                    {
                        "name": "rs1",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "validateSignatureWithXY",
                "inputs": [
                    {
                        "name": "r",
                        "type": "uint256"
                    },
                    {
                        "name": "s",
                        "type": "uint256"
                    },
                    {
                        "name": "x1",
                        "type": "uint256"
                    },
                    {
                        "name": "y1",
                        "type": "uint256"
                    },
                    {
                        "name": "x2",
                        "type": "uint256"
                    },
                    {
                        "name": "y2",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "returnModulo",
                "inputs": [
                    {
                        "name": "x",
                        "type": "uint256"
                    },
                    {
                        "name": "y",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint256"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "_nonce",
                "type": "uint256"
            }
        ],
        "events": [],
        "fields": [
            {
                "name": "_pubkey",
                "type": "uint256"
            },
            {
                "name": "_timestamp",
                "type": "uint64"
            },
            {
                "name": "_constructorFlag",
                "type": "bool"
            },
            {
                "name": "_nonce",
                "type": "uint256"
            },
            {
                "name": "nonce",
                "type": "uint256"
            },
            {
                "name": "Q0",
                "type": "uint256"
            },
            {
                "name": "Q1",
                "type": "uint256"
            }
        ]
    },
    tvc: "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/wAAAAD//////////7zm+q2nF56E87nKwvxjJVGpjDHbPDM0cCVvEYAg9A7ystcL/3FVBW8RgCD0DvKy1wv/cFUGbxGAIPQO8rLXC/9VAoLw/////wAAAAD//////////7zm+q2nF56E87nKwvxjJVGpjDHbPAEzEj8/A5BwIPgAcCOOm3AkwAGTXwV0jo0kwAKOh1UU2zxsUnTg4iDcMI6F2zxsYnTi3F8kcSBVBzZVBjUmqTgAlHAgNjbfJqsAN5MmwgBMS0ADUo8fXzPbPDQ0NCapOADAAY6LXzNfKFUE2zwCNzXeJqsAN+hVE1jbPGxCTkFNA9pwXyD4AHBfKds8lVUjbHN0jolfJts8k18HdODi3FNzgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMVNXgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMVOlWFhCA86C8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxU4mC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxXLqPEVq6joZVJ9s8bIOOhNs8bLPi4FUJVQYITldDAViC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxVQMU2zxsc0QC5HBfUCaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////VQihgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8KYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////8qoV5FAu6C8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw1U0SC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNFMAgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTJTGl5GAuyC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxMlOJgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8OVODgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTkhXkcC6oLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////9VCaGC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwyU0GC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNyNVBF5IAeqC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxMydVA4Lw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDE3JoLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////9VAqFJAuiC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw2VQSC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxU0GC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNV5KAeKC8P////8AAAABAAAAAAAAAAAAAAAA////////////////VQShgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8MlUCgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMV4ABHAgAhJccds8AjQy2zxOTQHqcAGC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zxVAiGC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxMhKC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxWQPAcF8g+ABwXybbPI6E2zxsc+BfJYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDFygvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMVMHWFdPAeaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxJ4Lw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDFygvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMVOIUAHugvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTkoc4Lw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDEzU2aC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNyZRAuSC8P////8AAAABAAAAAAAAAAAAAAAA///////////////8gvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTciVQaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwzUyJeUgHigvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMXIigvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTmC8P////8AAAABAAAAAAAAAAAAAAAA////////////////KaFTA+CC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwBgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////yKhgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8OFgnXl5UAfCC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxN1NRgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTZTVYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDE2ciZVAuiC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNlUFgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////1UGoYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDRSEF5WAOaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNFMAgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTKC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxAAZwcXAAFgHAAAHAALCRf+BwAKAhwABfIroiwACxsZJbcOAhwAGSW3HgXLyUXKkIMt5wcSJVA3CTIcMAjhdfIqkEMVRzQLT/JqihVHNCJqihNTU1NehfBCDBAJSjtf+h4LX/MQH6IcAAIoLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+6IsAAI4Lw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+6sbGxkltw4CCC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxUxFbAdqC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxIoLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDGC8P////8AAAABAAAAAAAAAAAAAAAA///////////////8XALejuwigvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////ILw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDGC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zzeXl0B2oLwWsY12Ko6k+ez671VdpiGvGUdBrDMU7D2O848PifSYEuOxoLwWsY12Ko6k+ez671VdpiGvGUdBrDMU7D2O848PifSYEuC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zzeujFeADZYIakIWCKpCIT/lVRyAaG8lFMjoTPoMKABqQgARO1E0NP/0z/TADHT/9P/1NHQ0//T/9H4bfhs+Gv4avhj+GIACvhG8uBMAhD0pCD0vfLATmNiABRzb2wgMC43MC4wAAA=",
    code: "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stcL/3FVBW8RgCD0DvKy1wv/cFUGbxGAIPQO8rLXC/9VAoLw/////wAAAAD//////////7zm+q2nF56E87nKwvxjJVGpjDHbPAEzEjw8A5BwIPgAcCOOm3AkwAGTXwV0jo0kwAKOh1UU2zxsUnTg4iDcMI6F2zxsYnTi3F8kcSBVBzZVBjUmqTgAlHAgNjbfJqsAN5MmwgBJSD0DUo8fXzPbPDQ0NCapOADAAY6LXzNfKFUE2zwCNzXeJqsAN+hVE1jbPGxCSz5KA9pwXyD4AHBfKds8lVUjbHN0jolfJts8k18HdODi3FNzgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMVNXgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMVOlVVU/A86C8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxU4mC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxXLqPEVq6joZVJ9s8bIOOhNs8bLPi4FUJVQYIS1RAAViC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxVQMU2zxsc0EC5HBfUCaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////VQihgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8KYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////8qoVtCAu6C8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw1U0SC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNFMAgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTJTGltDAuyC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxMlOJgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8OVODgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTkhW0QC6oLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////9VCaGC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwyU0GC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNyNVBFtFAeqC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxMydVA4Lw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDE3JoLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////9VAqFGAuiC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zw2VQSC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxU0GC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNVtHAeKC8P////8AAAABAAAAAAAAAAAAAAAA////////////////VQShgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8MlUCgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMVsABHAgAhJccds8AjQy2zxLSgHqcAGC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zxVAiGC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxMhKC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxVgPAcF8g+ABwXybbPI6E2zxsc+BfJYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDFygvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMVMHVVRMAeaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxJ4Lw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDFygvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMVOITQHugvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTkoc4Lw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDEzU2aC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNyZOAuSC8P////8AAAABAAAAAAAAAAAAAAAA///////////////8gvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTciVQaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwzUyJbTwHigvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMXIigvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTmC8P////8AAAABAAAAAAAAAAAAAAAA////////////////KaFQA+CC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zwBgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////yKhgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////9s8OFgnW1tRAfCC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxN1NRgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTZTVYLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDE2ciZSAuiC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNlUFgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////1UGoYLw/////wAAAAEAAAAAAAAAAAAAAAD////////////////bPDRSEFtTAOaC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxNFMAgvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////6mMMTKC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxAAZwcXAAFgHAAAHAALCRf+BwAKAhwABfIroiwACxsZJbcOAhwAGSW3HgXLyUXKkIMt5wcSJVA3CTIcMAjhdfIqkEMVRzQLT/JqihVHNCJqihNTU1NehfBCDBAJSjtf+h4LX/MQH6IcAAIoLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+6IsAAI4Lw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+6sbGxkltw4CCC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxUxFYAdqC8P////8AAAABAAAAAAAAAAAAAAAA////////////////qYwxIoLw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDGC8P////8AAAABAAAAAAAAAAAAAAAA///////////////8WQLejuwigvD/////AAAAAQAAAAAAAAAAAAAAAP///////////////ILw/////wAAAAEAAAAAAAAAAAAAAAD///////////////+pjDGC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zzeW1oB2oLwWsY12Ko6k+ez671VdpiGvGUdBrDMU7D2O848PifSYEuOxoLwWsY12Ko6k+ez671VdpiGvGUdBrDMU7D2O848PifSYEuC8P////8AAAABAAAAAAAAAAAAAAAA////////////////2zzeujFbADZYIakIWCKpCIT/lVRyAaG8lFMjoTPoMKABqQgARO1E0NP/0z/TADHT/9P/1NHQ0//T/9H4bfhs+Gv4avhj+GIACvhG8uBMAhD0pCD0vfLATmBfABRzb2wgMC43MC4wAAA=",
    codeHash: "4d04d0f5f1714ca76531eaf880325a629e96de3ffd61dd5d0f84a62187f7e1a5",
};
// generated by using the command "everdev js wrap build/SampleWallet.abi.json "
// need to have everdev installed for it
//# sourceMappingURL=SampleWalletContract.js.map