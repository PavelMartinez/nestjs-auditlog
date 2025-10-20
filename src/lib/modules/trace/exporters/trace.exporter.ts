import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SpanExporter } from '@opentelemetry/sdk-trace-base';

export class TraceExporter {
  private sdk!: NodeSDK;

  constructor(
    private readonly serviceName: string,
    private readonly serviceNamespace: string,
    private readonly exporter: SpanExporter,
    private readonly serviceEnvironmentName?: string
  ) { }

  async setup() {
    const resource = resourceFromAttributes({
      'service.name': this.serviceName,
      'service.namespace': this.serviceNamespace,
      'deployment.environment': this.serviceEnvironmentName,
    });

    this.sdk = new NodeSDK({
      resource,
      traceExporter: this.exporter,
      instrumentations: [getNodeAutoInstrumentations()],
    });

    await this.sdk.start();
  }

  async shutdown() {
    if (this.sdk) {
      await this.sdk.shutdown();
    }
  }
}
