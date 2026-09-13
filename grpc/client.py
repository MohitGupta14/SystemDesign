import grpc
import calculator_pb2
import calculator_pb2_grpc

def run():
    # 1. Connect to the server
    channel = grpc.insecure_channel('localhost:50051')
    stub = calculator_pb2_grpc.CalculatorStub(channel)

    # 2. Make the network call!
    print("[Client] Asking server to add 5 and 10...")
    
    # We construct the strict AddRequest object defined in the proto file
    request = calculator_pb2.AddRequest(a=5, b=10)
    response = stub.Add(request)
    
    print(f"[Client] Server replied with result: {response.result}")

if __name__ == '__main__':
    run()