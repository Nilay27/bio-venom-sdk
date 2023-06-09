import { sign } from "crypto";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  console.log("signer while deploying", signer)
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "EllipticCurve2",
    publicKey: signer.publicKey,
    initParams: {
      _nonce: locklift.utils.getRandomNonce(),
    },
    constructorParams: {
    },
    value: locklift.utils.toNano(0.1),
  });

  console.log(`Elliptic curve deployed at: ${sample.address.toString()}`);
}

main()
  .then(
    
    () => {
      console.log(process.env.SEED)
      process.exit(0)
    }
    )
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
// address: 0:976111dad1e59e92c6f64a31dca98ef2c694beada67ae44e728a7de04fd9ce32