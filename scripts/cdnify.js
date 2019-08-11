// This node application copies the files specified in the 'files' array to our CDN.
//
// Usage:
//   node cdnify.js [-d] [-a AWS_ACCESS_KEY] [-s AWS_SECRET_ACCESS_KEY]
//
// Options:
//   -a (string) AWS Access Key
//   -b (string) s3 bucket name
//   -s (string) AWS Secret Access Key
//   -d (null)   Dry run. Does everything but upload to the CDN. Optional
//
// Dependencies:
//   process.env.AWS_ACCESS_KEY
//   process.env.AWS_SECRET_ACCESS_KEY
//   process.env.HTTP_PROXY
//   process.env.S3_BUCKET_NAME

/* eslint-disable no-console */
const s3 = require('s3')
/* eslint-disable-next-line import/order */
const argv = require('minimist')(process.argv.slice(2))

const dryrun = argv.d; // don't upload
const s3Bucket = argv.b || process.env.S3_BUCKET_NAME || 'ux.amsarmada.com'
const awsRegion = argv.r || 'us-west-2'

const config = require('./cdnify.conf')(s3Bucket)

const ACCESS_KEY = argv.a || process.env.AWS_ACCESS_KEY // may be set with -a flag
const SECRET_ACCESS_KEY = argv.s || process.env.AWS_SECRET_ACCESS_KEY // may be set with -s flag

console.log('ENVs: ', process.env)


// #######################################################
// S3 UPLOADER SETUP
// See https://www.npmjs.com/package/s3

const s3Client = s3.createClient({
    maxAsyncS3: 20, // this is the default
    s3RetryCount: 3, // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
        region: awsRegion,
        // httpOptions: {
        //     proxy: process.env.HTTP_PROXY
        // }
        // any other options are passed to new AWS.S3()
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    },
});

// #######################################################
// INIT

  if (!dryrun) {
    // Upload files to S3 Bucket
    console.log('starting upload');

    const uploader = s3Client.uploadDir(config.uploadParams)
    let progress = 0

    uploader.on('error', (err) => {
      console.error('unable to upload build:', err);
      process.exit(1);
    })
    uploader.on('progress', () => {
      const progressUpdate = ((uploader.progressAmount / (uploader.progressTotal || 0.00001)) * 100).toFixed(0)
      if (progressUpdate !== progress) {
        progress = progressUpdate
        console.log('progress: ', progress, '%')
      }
    })
    uploader.on('end', () => {
      console.log('upload SUCCEEDED')
      console.log(`${uploader.filesFound} files were successfully uploaded to: s3://${config.uploadParams.s3Params.Bucket}`)
    })
    uploader.on('fileUploadStart', (localFilePath) => {
      console.log('uploading: ', localFilePath, '...')
    })
    uploader.on('fileUploadStart', (localFilePath) => {
      console.log('DONE uploading: ', localFilePath, '.')
    })
  } else {
    console.log('parameter -d specified, skipping S3 upload...');
  }
