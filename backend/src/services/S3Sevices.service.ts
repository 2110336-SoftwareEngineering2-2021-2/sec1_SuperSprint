import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file) {
    const { originalname } = file;

    await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async deleteFile(key) {
    await this.s3_delete(this.AWS_S3_BUCKET, key);
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      // ACL: 'public-read',
      ContentType: mimetype,
      // ContentDisposition: 'inline',
      // CreateBucketConfiguration: {
      //   LocationConstraint: 'ap-south-1',
      // },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      console.log(s3Response);
    } catch (e) {
      console.log(e);
    }
  }

  async s3_delete(bucket, name) {
    const params = {
      Bucket: bucket,
      Key: String(name),
    };

    try {
      const s3Response = await this.s3.deleteObject(params).promise();

      console.log(s3Response);
    } catch (e) {
      console.log(e);
    }
  }
}
