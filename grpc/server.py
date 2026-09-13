from concurrent import futures
import grpc
import calculator_pb2
import calculator_pb2_grpc

# 1. Write the actual logic for the 'Add' function
class CalculatorServicer(calculator_pb2_grpc.CalculatorServicer):
    def Add(self, request, context):
        print(f"[Server] Received request to add: {request.a} + {request.b}")
        result = request.a + request.b
        return calculator_pb2.AddReply(result=result)

# 2. Start the gRPC Server on port 50051
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    calculator_pb2_grpc.add_CalculatorServicer_to_server(CalculatorServicer(), server)
    server.add_insecure_port('[::]:50051')
    print("gRPC Server running on port 50051")
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()