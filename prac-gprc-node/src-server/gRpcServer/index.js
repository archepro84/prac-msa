const grpc = require("@grpc/grpc-js");

const gRpcConfig = {
  gRpcHost: '127.0.0.1',
  gRpcPort: '50501'
}

module.exports = class gRpcServer {
  server;

  constructor() {
    this._setGRpcServer();

    this.gRpcHost = gRpcConfig.gRpcHost;
    this.gRpcPort = gRpcConfig.gRpcPort;
    console.log(this.gRpcHost);
    console.log(this.gRpcPort);
  }

  async _setGRpcServer() {
    this.server = new grpc.Server();
  }

  addService(service, implementation) {
    this.server.addService(service, implementation);
  }

  run() {
    this.server.bindAsync(
      `${this.gRpcHost}:${this.gRpcPort}`,
      grpc.ServerCredentials.createInsecure(),
      (error, port) => {
        console.log(`Server running at ${this.gRpcHost}:${this.gRpcPort}`);
        this.server.start();
      }
    )

  }
}