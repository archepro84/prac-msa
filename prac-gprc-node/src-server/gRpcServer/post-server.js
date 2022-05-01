const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "../proto/post.proto";
const gRpcServer = require('./');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};


module.exports = class PostServer extends gRpcServer {
  post = [];

  constructor() {
    super();

    this._setGRpcService();
  }

  _setGRpcService() {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
    this.PostService = grpc.loadPackageDefinition(packageDefinition).PostService;
  }

  addService(implementation) {
    super.addService(this.PostService.service, implementation);
  }
}
