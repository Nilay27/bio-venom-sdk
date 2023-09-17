import { sign } from 'crypto';

async function main() {
  console.log('deploying stateContract...');
  const signer = (await locklift.keystore.getSigner('0'))!;
  const { contract: stateContract } = await locklift.factory.deployContract({
    contract: 'Sample',
    publicKey: signer.publicKey,
    initParams: {
      _nonce: locklift.utils.getRandomNonce(),
    },
    constructorParams: {
      _state: 10,
    },
    value: locklift.utils.toNano(0.1),
  });
  console.log(`stateContract deployed at: ${stateContract.address.toString()}`);
}
// address on devnet:  0:26e36bfd887de7b8b4b8b21155bc073403b8ef264c8de2f72636166b846dc375
main()
  .then(() => {
    console.log(process.env.SEED);
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
