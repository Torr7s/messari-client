import { MessariClient } from '../lib/client';

describe('MessariClient', (): void => {
  const client = new MessariClient(process.env.MESSARI_API_KEY as string);

  it('should be defined', (): void => {
    expect(client).toBeDefined();
  });

  describe('getAsset', (): void => {
    it('should get basic metadata for an asset', async (): Promise<void> => {
      const asset = await client.getAsset('ethereum');

      expect(asset.status.error_code).toBeNull();
      expect(asset.data).toBeDefined();
    });

    it('should fail when searching for an invalid asset', async (): Promise<void> => {
      const asset = await client.getAsset('fake_asset');

      expect(asset.status.error_code).toBeNull();
    });
  });

  describe('getAssetMarketData', (): void => {
    it('should get the market data for an asset', async (): Promise<void> => {
      const marketData = await client.getAssetMarketData('ethereum');

      expect(marketData.status.error_code).toBeNull();
      expect(marketData.data).toBeDefined();
    });
  });

  describe('getAssetMetrics', (): void => {
    it('should get an asset metrics', async (): Promise<void> => {
      const metrics = await client.getAssetMetrics('ethereum');
  
      expect(metrics.status.error_code).toBeNull();
      expect(metrics.data).toBeDefined();
    });

    it('should fail when searching for an invalid asset', async (): Promise<void> => {
      const metrics = await client.getAssetMetrics('fake_asset');
  
      expect(metrics.status).toBe('QUERY_FAILED');
    });
  });

  describe('listAllAssets', (): void => {
    it.only('should list all or few assets', async (): Promise<void> => {
      const assets = await client.listAllAssets();
  
      expect(assets.status.error_code).toBeNull()
      expect(assets.data).toBeDefined();
    });
  });
});
