import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Context } from 'vm'

export async function handler(event: APIGatewayProxyEvent, ctx: Context): Promise<APIGatewayProxyResult> {
  const { resource: path } = event
  const lambdaRequestId = ctx.awsRequestId
  const apiRequestId = event.requestContext.requestId

  console.log(
    `API Request ID: ${apiRequestId} | Lambda Request ID: ${lambdaRequestId}`
  )

  if (path === '/products') {
    console.log('POST /products')
    return {
      statusCode: 201,
      body: 'POST /products'
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Not Found' })
  }
}
