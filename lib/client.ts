import {
  MessariAllAssets,
  QueryResult,
  MessariAsset,
  MessariAssetCommomProps,
  MessariAssetMarketDataProps,
  MessariAssetMetrics
} from './typings';

import { Request } from './utils/request';
import { MessariError } from './utils/errors/messari/messari.error';

/**
 * Represents the main MessariClient
 */
export class MessariClient {
  private request: Request;
  private messariAPIKey: string;

  static validate(apiKey: string): void {
    if (!apiKey) {
      throw new TypeError('An api key must be provided and be of type string');
    }
  }

  /**
   * Creates a new MessariClient instance
   * 
   * @param {String} messariAPIKey - The Messari api key  
   */
  constructor(messariAPIKey: string) {
    MessariClient.validate(messariAPIKey);

    this.messariAPIKey = messariAPIKey;

    this.request = new Request({
      baseURL: 'https://data.messari.io/api',
      headers: {
        'x-messari-api-key': this.messariAPIKey
      }
    });
  }

  /**
   * Get the basic metadata for an asset
   * 
   * @param {string} assetKey - The asset's ID, slug or symbol
   * @returns {Promise<QueryResult<MessariAsset>>}
   */
  public async getAsset(assetKey: string): Promise<QueryResult<MessariAssetCommomProps>> {
    const response = await this.request.get<
      MessariAsset
    >(`v1/assets/${assetKey}`);

    if (response instanceof MessariError) {
      return this.$handleError(response);
    }

    return {
      status: {
        timestamp: new Date().toISOString()
      },
      data: response.data
    }
  }

  /**
   * Get the market data for an asset
   * 
   * @param {string} assetKey - The asset's ID, slug or symbol
   * @returns {Promise<QueryResult<MessariAssetMarketDataProps>>}
   */
  public async getAssetMarketData(assetKey: string): Promise<QueryResult<MessariAssetMarketDataProps>> {
    const response: QueryResult<MessariAssetMetrics['data']> = await this.getAssetMetrics(assetKey);

    const assetMarketData: MessariAssetMarketDataProps =
      !response.status.error_code &&
      response.data.market_data;

    return {
      status: {
        timestamp: new Date().toISOString()
      },
      data: assetMarketData
    }
  }

  /**
   * Get the quantitative metrics for an asset
   * 
   * @param {string} assetKey - The asset's ID, slug or symbol
   * @returns {Promise<QueryResult<MessariAssetMetrics>>}
   */
  public async getAssetMetrics(assetKey: string): Promise<QueryResult<MessariAssetMetrics['data']>> {
    const response = await this.request.get<
      MessariAssetMetrics
    >(`v1/assets/${assetKey}/metrics`);

    if (response instanceof MessariError) {
      return this.$handleError(response);
    }

    return {
      status: {
        timestamp: new Date().toISOString()
      },
      data: response.data
    }
  }

  /**
   * Get the list of all assets and their metrics
   * 
   * @returns {Promise<QueryResult<MessariAllAssets>>}
   */
  public async listAllAssets(): Promise<QueryResult<MessariAllAssets['data']>> {
    const response = await this.request.get<
      MessariAllAssets
    >(`v2/assets`);

    if (response instanceof MessariError) {
      return this.$handleError(response);
    }
    
    return {
      status: {
        timestamp: new Date().toISOString()
      },
      data: response.data
    }
  }

  private $handleError(error: MessariError): QueryResult {
    return {
      status: {
        timestamp: error.timestamp,
        error_code: error.code,
        error_message: error.message
      }
    }
  }
}

