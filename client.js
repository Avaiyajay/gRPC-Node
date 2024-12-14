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
    text: "Do Walking",
  },
  (err, response) => {
    console.log("Received response from server", JSON.stringify(response));
  }
);

// client.readTodos({}, (err, response) => {
//   console.log("List of Todos : ", JSON.stringify(response));
// });

const response = client.readTodosStream();
response.on("data", (item) => {
  console.log("Returned Item : ", JSON.stringify(item));
});
response.on("end", () => console.log("Server is done sending the data!"));
