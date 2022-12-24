import { MessariClient } from '../lib/client';

describe('MessariClient', (): void => {
  const client = new MessariClient(process.env.MESSARI_API_KEY as string);

  it('should be defined', (): void => {
    expect(client).toBeDefined();
  });

  describe('getAsset', (): void => {
    it('should get basic metadata for an asset', async (): Promise<void> => {
      const asset = await client.getAsset('ethereum');

      expect(asset.status.error_code).toBeUndefined();
      expect(asset.data).toBeDefined();
    });
  });

  describe('getAssetMarketData', (): void => {
    it('should get the market data for an asset', async (): Promise<void> => {
      const marketData = await client.getAssetMarketData('ethereum');

      expect(marketData.status.error_code).toBeUndefined();
      expect(marketData.data).toBeDefined();
    });
  });

  describe('getAssetMetrics', (): void => {
    it.only('should get an asset metrics', async (): Promise<void> => {
      const metrics = await client.getAssetMetrics('ethereum');
  
      expect(metrics.status.error_code).toBeUndefined();
      expect(metrics.data).toBeDefined();
    });
  });

  describe('listAllAssets', (): void => {
    it('should list all or few assets', async (): Promise<void> => {
      const assets = await client.listAllAssets();

      expect(assets.status.error_code).toBeUndefined();
      expect(assets.data).toBeDefined();
    });
  });

  it('should fail when searching for an invalid asset', async (): Promise<void> => {
    await expect(client.getAsset('fake-asset').then(res => res.status.error_code)).resolves.toBeDefined();
    await expect(client.getAssetMetrics('fake-asset').then(res => res.status.error_code)).resolves.toBeDefined();
  });
});
