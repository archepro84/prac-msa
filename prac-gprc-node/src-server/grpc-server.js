const PostServer = require('./gRpcServer/post-server');

async function main() {
  const server = new PostServer();

  let post = [
    {id: "1", title: "Post 1", body: "Content 1"},
  ];

  const getAllPost = (_, callback) => {
    console.log(`gRpc Post server get All Post`);
    callback(null, {post});
  }

  const addPost = (call, callback) => {
    const _post = {id: Date.now(), ...call.request};
    post.push(_post);
    callback(null, _post);
  }

  server.addService({getAllPost, addPost});
  server.run();
}

main();