declare const sampleAbi: {
    readonly ABIversion: 2;
    readonly version: "2.3";
    readonly header: readonly ["pubkey", "time", "expire"];
    readonly functions: readonly [{
        readonly name: "constructor";
        readonly inputs: readonly [{
            readonly name: "_state";
            readonly type: "uint256";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setState";
        readonly inputs: readonly [{
            readonly name: "_state";
            readonly type: "uint256";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "getDetails";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "_state";
            readonly type: "uint256";
        }, {
            readonly name: "_tvmPubkey";
            readonly type: "uint256";
        }, {
            readonly name: "_msgPubkey";
            readonly type: "uint256";
        }];
    }, {
        readonly name: "checkSignature";
        readonly inputs: readonly [{
            readonly name: "hash";
            readonly type: "uint256";
        }, {
            readonly name: "signature";
            readonly type: "cell";
        }, {
            readonly name: "pubkey";
            readonly type: "uint256";
        }];
        readonly outputs: readonly [];
    }];
    readonly data: readonly [{
        readonly key: 1;
        readonly name: "_nonce";
        readonly type: "uint16";
    }];
    readonly events: readonly [{
        readonly name: "StateChange";
        readonly inputs: readonly [{
            readonly name: "_state";
            readonly type: "uint256";
        }];
        readonly outputs: readonly [];
    }];
    readonly fields: readonly [{
        readonly name: "_pubkey";
        readonly type: "uint256";
    }, {
        readonly name: "_timestamp";
        readonly type: "uint64";
    }, {
        readonly name: "_constructorFlag";
        readonly type: "bool";
    }, {
        readonly name: "_nonce";
        readonly type: "uint16";
    }, {
        readonly name: "state";
        readonly type: "uint256";
    }, {
        readonly name: "tvmPubkey";
        readonly type: "uint256";
    }, {
        readonly name: "msgPubkey";
        readonly type: "uint256";
    }];
};
export declare const factorySource: {
    readonly Sample: {
        readonly ABIversion: 2;
        readonly version: "2.3";
        readonly header: readonly ["pubkey", "time", "expire"];
        readonly functions: readonly [{
            readonly name: "constructor";
            readonly inputs: readonly [{
                readonly name: "_state";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setState";
            readonly inputs: readonly [{
                readonly name: "_state";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "getDetails";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "_state";
                readonly type: "uint256";
            }, {
                readonly name: "_tvmPubkey";
                readonly type: "uint256";
            }, {
                readonly name: "_msgPubkey";
                readonly type: "uint256";
            }];
        }, {
            readonly name: "checkSignature";
            readonly inputs: readonly [{
                readonly name: "hash";
                readonly type: "uint256";
            }, {
                readonly name: "signature";
                readonly type: "cell";
            }, {
                readonly name: "pubkey";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
        }];
        readonly data: readonly [{
            readonly key: 1;
            readonly name: "_nonce";
            readonly type: "uint16";
        }];
        readonly events: readonly [{
            readonly name: "StateChange";
            readonly inputs: readonly [{
                readonly name: "_state";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
        }];
        readonly fields: readonly [{
            readonly name: "_pubkey";
            readonly type: "uint256";
        }, {
            readonly name: "_timestamp";
            readonly type: "uint64";
        }, {
            readonly name: "_constructorFlag";
            readonly type: "bool";
        }, {
            readonly name: "_nonce";
            readonly type: "uint16";
        }, {
            readonly name: "state";
            readonly type: "uint256";
        }, {
            readonly name: "tvmPubkey";
            readonly type: "uint256";
        }, {
            readonly name: "msgPubkey";
            readonly type: "uint256";
        }];
    };
};
export declare type FactorySource = typeof factorySource;
export declare type SampleAbi = typeof sampleAbi;
export {};
