import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,         // 100 Concurrent Users
  duration: '10s',  // 10 Second Attack
};

export default function () {
  // The raw GraphQL text string
  const graphqlQuery = `
    query {
      add(a: 5, b: 10)
    }
  `;
  
  // Wrap it in standard JSON
  const payload = JSON.stringify({ query: graphqlQuery });
  const params = { headers: { 'Content-Type': 'application/json' } };
  
  // Send the HTTP POST request
  const res = http.post('http://localhost:4000/graphql', payload, params);
  
  check(res, { 'GraphQL status is 200': (r) => r.status === 200 });
  
  // Human think-time
  sleep(1);
}