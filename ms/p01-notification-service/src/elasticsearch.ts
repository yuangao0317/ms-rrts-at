import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { config } from '@notifications/config';
import { winstonLogger } from '@yuangao0317/ms-rrts-at-shared-common';
import { Logger } from 'winston';

// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/installation.html
// https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-cluster-health.html

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationElasticSearchServer', 'debug');

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
});

export async function checkConnection(): Promise<void> {
  let isConnected = false;
  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`NotificationService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to Elasticsearch failed. Retrying...');
      log.log('error', 'NotificationService checkConnection() method:', error);
    }
  }
}