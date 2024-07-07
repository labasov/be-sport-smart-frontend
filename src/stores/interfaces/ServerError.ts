export type ServerError = { detail: string }

export type ServerErrorResponse = {
  response: {
    data: ServerError
  }
};