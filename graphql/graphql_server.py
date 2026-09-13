import strawberry
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter

# 1. Define the GraphQL Contract (Schema)
@strawberry.type
class Query:
    @strawberry.field
    def add(self, a: int, b: int) -> int:
        return a + b

# 2. Build the API
schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema)

# 3. Mount it to FastAPI
app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

print("GraphQL Server preparing to run on port 4000...")