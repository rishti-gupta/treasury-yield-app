import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {TreasuryYieldStack} from '../lib/treasury-yield-stack';

const app = new cdk.App();
new TreasuryYieldStack(app, 'TreasuryYieldStack', {});
