const PostClient = require('./gRpcClient/post-client')

async function main() {
  const postClient = await new PostClient();

  await postClient.addPost({title: 'add post new Title!', body: 'add post new Body!'});
  await postClient.getAllPost();
}

main();