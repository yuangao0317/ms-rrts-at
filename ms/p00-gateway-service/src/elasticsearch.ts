import { winstonLogger } from '@yuangao0317/ms-rrts-at-shared-common';
import { Logger } from 'winston';
import { config } from '@gateway/config';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'gatewayElasticSearchServer', 'debug');

class Elasticsearch {
  private readonly elasticsearchClient: Client;

  constructor() {
    this.elasticsearchClient = new Client({
      node: `${config.ELASTIC_SEARCH_URL}`
    });
  }

  public async checkConnection(): Promise<void> {
    let isConnected = false;
    while (!isConnected) {
      try {
        const health: ClusterHealthResponse = await this.elasticsearchClient.cluster.health({});
        //  If a replica shard is unassigned (i.e., not allocated to any node), the cluster health status will be yellow.
        log.info(`GatewayService Elasticsearch health status - ${health.status.toUpperCase()}`);
        isConnected = true;
      } catch (error) {
        log.error('GatewayService - Connection to Elasticsearch failed. Retrying...');
        log.log('error', 'GatewayService checkConnection() method:', error);
      }
    }
  }
}

export const elasticsearch: Elasticsearch = new Elasticsearch();
