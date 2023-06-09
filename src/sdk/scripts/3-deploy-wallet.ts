
import { Address } from 'everscale-inpage-provider';

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  console.log("signer while deploying", signer)
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "SampleWallet",
    publicKey: signer.publicKey,
    initParams: {
      _nonce: locklift.utils.getRandomNonce(),
    },
    constructorParams: {
    },
    value: locklift.utils.toNano(1),
  });

  console.log(`Sample deployed at: ${sample.address.toString()}`);
}
