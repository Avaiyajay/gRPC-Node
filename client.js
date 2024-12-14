const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const protoFileName = "todo.proto";
const options = {};
const packageDefinition = protoLoader.loadSync(protoFileName, options);
const packageObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = packageObject.todoPackage;

const client = new todoPackage.Todo(
  "localhost:40000",
  grpc.credentials.createInsecure()
);
client.createTodo(
  {
    id: -1,
    text: "Do Coding",
  },
  (err, response) => {
    console.log("Received response from server", JSON.stringify(response));
  }
);

client.readTodos({}, (err, response) => {
  console.log("List of Todos : ", JSON.stringify(response));
});
