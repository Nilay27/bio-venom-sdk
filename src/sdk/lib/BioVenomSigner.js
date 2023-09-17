import { getCredential, getRSAndXYCoordinates } from './webauthn/index';
export class BioVenomSigner {
  constructor() {}
  async sign(unsignedUserOperation, encodedId, pubkey) {
    const webAuthCredential = await getCredential(encodedId, unsignedUserOperation);
    const { rs, x1, y1, x2, y2 } = await getRSAndXYCoordinates(webAuthCredential, pubkey);
    return { rs, x1, y1, x2, y2 };
  }
}
//# sourceMappingURL=BioVenomSigner.js.map
