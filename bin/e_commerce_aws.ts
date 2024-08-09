#!/usr/bin/env node
import 'source-map-support/register';
import { App, Environment } from 'aws-cdk-lib'
import { ProductsAppStack } from '../lib/productsApp-stack'
import { ECommerceApiStack } from '../lib/ecommerceApi-stack'
import { ProductsAppLayersStack } from '../lib/productsAppLayers-stack'

const env: Environment = {
  account: '975050189131',
  region: 'us-east-1'
}
const tags = {
  cost: 'ECommerce',
  team: 'Eu'
}

const app = new App();

const productsAppLayersStack = new ProductsAppLayersStack(app, 'ProductsLayers', {
  tags,
  env
})

const productsAppStack = new ProductsAppStack(app, 'ProductsApp', {
  tags,
  env
})
productsAppStack.addDependency(productsAppLayersStack)

const ecommerceApiStack = new ECommerceApiStack(app, 'ECommerceApi', {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productsAdminHandler,
  tags,
  env
})
ecommerceApiStack.addDependency(productsAppStack)

