"use client";

import { PasswordAuthResult } from "../types";
import { client } from "../keystone/graphql";

type AuthProps = { email: string; password: string };
type AuthResult = { authenticateUserWithPassword: PasswordAuthResult };

export async function authWithPassword(variables: AuthProps) {
  const res = await client.request<AuthResult>(
    /* GraphQL */ `
      mutation Mutation($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
          ... on UserAuthenticationWithPasswordSuccess {
            item {
              name
              email
            }
            sessionToken
          }
          ... on UserAuthenticationWithPasswordFailure {
            message
          }
        }
      }
    `,
    variables,
  );
  return res.authenticateUserWithPassword;
}
