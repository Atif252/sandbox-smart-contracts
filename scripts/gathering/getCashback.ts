import 'dotenv/config';
import fs from 'fs-extra';
import {TheGraph} from '../utils/thegraph';
import {getBlockArgs} from '../utils/utils';

const blockNumber = getBlockArgs(0);

const theGraph = new TheGraph(
  'https://api.thegraph.com/subgraphs/name/pixowl/the-sandbox'
);

const queryString = `
query($blockNumber: Int! $first: Int! $lastId: ID!) {
    owners(first: $first where: {id_gt: $lastId} block: {number: $blockNumber}) {
      id
      numAssets
      assetTokens {
        id
        quantity
      }
      numLands
      landTokens {
        id
      }
    }
}
`;

(async () => {
  const assetOwners: {id: string}[] = await theGraph.query(
    queryString,
    'owners',
    {
      blockNumber,
    }
  );
  console.log(assetOwners.length);

  // write to disk
  fs.ensureDirSync('tmp');
  fs.writeFileSync(
    'tmp/asset_owners_cashback.json',
    JSON.stringify(assetOwners, null, '  ')
  );
})();
