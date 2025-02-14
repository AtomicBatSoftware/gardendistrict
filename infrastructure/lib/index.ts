import { CloudFrontToS3 } from '@aws-solutions-constructs/aws-cloudfront-s3';
import * as cdk from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { AllowedMethods, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { BlockPublicAccess, BucketAccessControl } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { config } from '../config/shared';

export class WebsiteStack extends cdk.Stack {

  // The website S3 bucket + Cloudfront (CDN) distro
  public cloudfrontS3: CloudFrontToS3;

  // SSL cert for the website
  public certificate?: Certificate;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.certificate = new Certificate(this, 'Certificate', {
      domainName: config.domainName,
      subjectAlternativeNames: [`*.${config.domainName}`],
      validation: CertificateValidation.fromDns(),
    });

    this.cloudfrontS3 = new CloudFrontToS3(this, 'CloudfrontS3', {
      insertHttpSecurityHeaders: false,
      loggingBucketProps: {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      },
      cloudFrontLoggingBucketAccessLogBucketProps: {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      },
      cloudFrontLoggingBucketProps: {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      },
      bucketProps: {
        bucketName: config.appName,
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        accessControl: BucketAccessControl.PRIVATE,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      },
      cloudFrontDistributionProps: {
        domainNames: [config.domainName, `www.${config.domainName}`],
        certificate: this.certificate,
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
        ],
        defaultBehavior: {
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: ViewerProtocolPolicy.ALLOW_ALL,
        },
      },
    });

    // TODO: once we are ready to link to the domain, uncomment domain names and cert stuff and follow the below in the client's domain registrar:
    // During stack creation, had to add the AWS ACM Cert Validation CNAME record to domain registrar.
    // After stack creation, had to add root and www CNAME records to domain registrar pointing to the AWS Cloudfront distro.
  }
}
