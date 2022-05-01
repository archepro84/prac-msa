const grpc = require("@grpc/grpc-js");

const gRpcConfig = {
  gRpcHost: '127.0.0.1',
  gRpcPort: '50501'
}

module.exports = class gRpcClient {
  client;

  constructor() {
  }

  async run(Service) {
    this.client = new Service(
      `${gRpcConfig.gRpcHost}:${gRpcConfig.gRpcPort}`,
      grpc.credentials.createInsecure()
    );
  }
}