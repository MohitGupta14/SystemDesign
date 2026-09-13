import http from 'k6/http';
import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

// 1. Load your exact gRPC rules
const client = new grpc.Client();
client.load(['.'], 'calculator.proto');

// 2. Define the Stress Parameters
export const options = {
  vus: 100,         // 100 Virtual Users (Concurrent threads)
  duration: '10s',  // Hammer the server continuously for 10 seconds
};

// 3. The actions each Virtual User will take
export default function () {
  
  // --- TEST 1: REST API ---
  const restPayload = JSON.stringify({ a: 5, b: 10 });
  const restParams = { headers: { 'Content-Type': 'application/json' } };
  const restRes = http.post('http://localhost:3000/add', restPayload, restParams);
  
  // Verify it didn't crash
  check(restRes, { 'REST status is 200': (r) => r.status === 200 });

  // --- TEST 2: gRPC API ---
  client.connect('127.0.0.1:50051', { plaintext: true });
  const grpcRes = client.invoke('Calculator/Add', { a: 5, b: 10 });
  
  check(grpcRes, { 'gRPC status is OK': (r) => r && r.status === grpc.StatusOK });
  client.close();

  // Simulate human think-time before clicking again
  sleep(1); 
}