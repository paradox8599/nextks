import { GraphQLClient, gql } from "graphql-request";

const client: GraphQLClient =
  typeof window !== "undefined"
    ? new GraphQLClient(window.location.origin + "/api/gql")
    : undefined!;

export { gql, client };
