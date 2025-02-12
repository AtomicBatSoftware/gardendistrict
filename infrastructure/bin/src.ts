#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { config } from '../config/shared';
import { WebsiteStack } from '../lib';

const app = new cdk.App();

// Website
new WebsiteStack(app, `${config.appName}-stack`);