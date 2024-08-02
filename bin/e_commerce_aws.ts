#!/usr/bin/env node
import 'source-map-support/register';
import { App, Environment } from 'aws-cdk-lib'
import { ProductsAppStack } from '../lib/productsApp-stack'
import { ECommerceApiStack } from '../lib/ecommerceApi-stack'

const env: Environment = {
  account: '975050189131',
  region: 'us-east-1'
}
const tags = {
  cost: 'ECommerce',
  team: 'Eu'
}

const app = new App();

const productsAppStack = new ProductsAppStack(app, 'ProductsApp', {
  tags,
  env
})

const ecommerceApiStack = new ECommerceApiStack(app, 'ECommerceApi', {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  tags,
  env
})
ecommerceApiStack.addDependency(productsAppStack)

