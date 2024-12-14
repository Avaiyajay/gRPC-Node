const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const protoFileName = "todo.proto";
const options = {};
const packageDefinition = protoLoader.loadSync(protoFileName, options);
const packageObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = packageObject.todoPackage;

const server = new grpc.Server();
server.bindAsync(
  "0.0.0.0:40000",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(error, "Error running server");
    console.log("I don't know why I wrote this!");
  }
);
server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
});

let TodoList = [];

function createTodo(call, callback) {
  const { text } = call.request;
  const newTodo = { id: TodoList.length + 1, text };
  TodoList.push(newTodo);
  callback(null, newTodo);
}
function readTodos(call, callback) {
  callback(null, { items: TodoList });
}
