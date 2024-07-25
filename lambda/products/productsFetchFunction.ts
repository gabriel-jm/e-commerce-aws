import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

export async function handler(event: APIGatewayProxyEvent, ctx: Context): Promise<APIGatewayProxyResult> {
  const { resource: path, httpMethod: method } = event
  const lambdaRequestId = ctx.awsRequestId
  const apiRequestId = event.requestContext.requestId

  console.log(
    `API Request ID: ${apiRequestId} | Lambda Request ID: ${lambdaRequestId}`
  )

  if (path === '/products' && method === 'GET') {
    console.log('GET')

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'GET Products - OK' })
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Not Found' })
  }
}
