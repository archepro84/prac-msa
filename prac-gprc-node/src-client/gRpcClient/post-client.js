const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "../proto/post.proto";
const gRpcClient = require('./')

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

module.exports = class PostClient extends gRpcClient {
  constructor() {
    super();
    this._setgRpcClient();
  }

  async getAllPost() {
    // gRpc를 호출할 때는 대 소문자로 구분하지는 않는다.
    await this.client.getAllPost({}, (error, post) => {
      if (error) throw error
      console.log(post);
    });
  }

  async addPost() {
    // add a post
    await this.client.addPost(
      {
        title: "Post title 3!",
        body: "Post body 3!",
      },
      (error, post) => {
        if (error) throw error;
        console.log("Successfully created a post");
      }
    );
  }

  async _setgRpcClient() {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
    const PostService = grpc.loadPackageDefinition(packageDefinition).PostService;

    await super.run(PostService);
  }


}

