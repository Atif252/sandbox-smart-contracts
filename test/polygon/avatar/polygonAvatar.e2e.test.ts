import hre from 'hardhat';
import {expect} from 'chai';
import {getAvatarContracts} from '../../common/fixtures/avatar';

describe('@e2e @l2 roles', function () {
  before(async function () {
    const {l2, buyer} = await getAvatarContracts(
      hre.companionNetworks['l1'],
      hre
    );
    this.l2 = l2;
    this.buyer = buyer;
  });
  it('admin', async function () {
    const defaultAdminRole = await this.l2.avatar.DEFAULT_ADMIN_ROLE();
    expect(await this.l2.avatar.hasRole(defaultAdminRole, this.l2.sandAdmin)).to
      .be.true;
    expect(await this.l2.avatar.hasRole(defaultAdminRole, this.l2.sandAdmin)).to
      .be.true;
  });
  it('minter', async function () {
    const minterRole = await this.l2.avatar.MINTER_ROLE();
    expect(await this.l2.avatar.hasRole(minterRole, this.l2.sale.address)).to.be
      .true;
  });
  it('child chain manager', async function () {
    const childChainManagerRole = await this.l2.avatar.CHILD_MANAGER_ROLE();
    expect(
      await this.l2.avatar.hasRole(
        childChainManagerRole,
        this.l2.childChainManager.address
      )
    ).to.be.true;
  });
  it('trusted forwarder', async function () {
    expect(await this.l2.avatar.getTrustedForwarder()).to.be.equal(
      this.l2.trustedForwarder.address
    );
    expect(await this.l2.sale.getTrustedForwarder()).to.be.equal(
      this.l2.trustedForwarder.address
    );
  });
  it('signer', async function () {
    const signerRole = await this.l2.sale.SIGNER_ROLE();
    expect(await this.l2.sale.hasRole(signerRole, this.l2.backendAuthWallet)).to
      .be.true;
  });
  it('seller', async function () {
    const sellerRole = await this.l2.sale.SELLER_ROLE();
    expect(await this.l2.sale.hasRole(sellerRole, this.l2.sandboxAccount)).to.be
      .true;
  });
});
