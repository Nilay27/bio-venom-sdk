export declare var POW_2_24: number, POW_2_32: number, POW_2_53: number;
export declare function encode(value: any): ArrayBuffer;
export declare function decode(data: any, tagger: any, simpleValue: any): any;
export declare var obj: {
    encode: typeof encode;
    decode: typeof decode;
};
