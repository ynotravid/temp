module.exports = (s3Bucket) => {
  // #######################################################
  // CONFIGURATION

  // STEP 1
  // Make sure AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY and HTTP_PROXY
  // environment variables are set.

  // STEP 2
  // Name your application
  // const appName = 'ams-cni';
  // const targetEnv = target;

  // STEP 3
  // Where are your files?
  // These files will have strings replaced
  const dirs = {
      cdn: 'docs/',
  };

  // STEP 4
  // Where are we going to put your files on the CDN?
  const uploadParams = {
    localDir: dirs.cdn, // which files to send to CDN
    deleteRemoved: true, // Delete files in S3 that do not exist locally
    s3Params: {
      Bucket: s3Bucket,
      Prefix: '',
      CacheControl: `max-age=${5 * 60 * 1000}, no-transform, public`,
      // CacheControl: 'max-age=31536000, no-transform, public', // 1y
      // other options supported by putObject, except Body and ContentLength.
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    },
  };

  // END CONFIGURATION
  // #######################################################

  return {
    dirs,
    uploadParams,
  };
}
