import { CloudFrontToS3 } from '@aws-solutions-constructs/aws-cloudfront-s3';
import * as cdk from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { AllowedMethods, FunctionCode, FunctionEventType, ViewerProtocolPolicy, Function } from 'aws-cdk-lib/aws-cloudfront';
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
          functionAssociations: [{
            function: new Function(this, 'UrlRewriteFunction', {
              code: FunctionCode.fromInline(`
                function handler(event) {
                  var request = event.request;
                  var uri = request.uri;
                  
                  // Handle root path
                  if (uri === '/') {
                    request.uri = '/index.html';
                    return request;
                  }
    
                  // Remove trailing slash
                  if (uri.endsWith('/')) {
                    uri = uri.slice(0, -1);
                  }
    
                  // Check if uri points to a file (has an extension)
                  if (uri.includes('.')) {
                    return request;
                  }
    
                  // Append index.html to handle sub-routes
                  request.uri = uri + '/index.html';
                  return request;
                }
              `)
            }),
            eventType: FunctionEventType.VIEWER_REQUEST
          }]
        },
      },
    });

    // During stack creation, had to add the AWS ACM Cert Validation CNAME record to domain registrar.
    // After stack creation, had to add root and www CNAME records to domain registrar pointing to the AWS Cloudfront distro.
  }
}
