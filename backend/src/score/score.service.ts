import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';
import { Score } from '../models/score.model';
import { Subject } from '../models/subject.model';
import { S3Service } from '../services/S3Sevices.service';
import { Admin } from '../models/admin.model';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel('Score') private readonly scoreModel: Model<Score>,
    @InjectModel('Tutor') private readonly tutorModel: Model<Tutor>,
    @InjectModel('Subject') private readonly subjectModel: Model<Subject>,
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    private readonly s3Service: S3Service,
  ) {}

  async getScore(tutorId: string, sId: string) {
    const res = await this.findScore(tutorId, sId);
    return res;
  }

  async getScoreById(scoreId: string) {
    console.log('getScoreById', scoreId);
    const res = await this.findScoreById(scoreId);
    return res;
  }

  async getAllPendingScore(req) {
    const admin = await this.adminModel.findById(req.id).lean();
    console.log(admin);
    if (!admin) {
      throw new UnauthorizedException('user is not Authorization as admin');
    }
    const res = await this.findPendingScore();
    res.sort((a, b) => a.updated_at < b.updated_at);
    return res;
  }
  private async findScoreById(scoreId: string) {
    let score;
    console.log('testtest', scoreId);
    try {
      score = await this.scoreModel.findById({ _id: scoreId }).lean();
      if (!score) {
        return null;
      }
    } catch (error) {
      throw new BadRequestException(`get score from id ${scoreId} failed`);
    }
    return score;
  }

  private async findScore(tId: string, sId: string): Promise<Score> {
    let score;
    try {
      score = await this.scoreModel
        .findOne({ tutorId: tId, subjectId: sId })
        .lean();
      if (!score) {
        return null;
        // return 0;
        // throw new NotFoundException('Could not find score.');
      }
    } catch (error) {
      throw new BadRequestException(`get score from tutor ${tId} failed`);
    }

    return score;
  }

  private async findPendingScore() {
    let score;
    try {
      score = await this.scoreModel
        .find({ status: 'pending' })
        .populate('subjectId')
        .populate('tutorId')
        .lean();
      if (!score) {
        return null;
      }
    } catch (error) {
      throw new BadRequestException(`get all pending score failed`);
    }
    return score;
  }
  async insertScore(
    tutorId: string,
    subjectId: string,
    currentScore: number,
    maxScore: number,
    year: number,
    image,
  ): Promise<any> {
    // console.log(tutorId);
    let imageUrl;
    try {
      if (image) {
        imageUrl = await this.s3Service.uploadFile(tutorId + subjectId, image);
      } else {
        imageUrl =
          'https://scontent.fbkk8-4.fna.fbcdn.net/v/t1.15752-9/279085896_661343618302272_560877022376206098_n.png?_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=2p4Jv8c6BZUAX8fAflZ&_nc_ht=scontent.fbkk8-4.fna&oh=03_AVJbPvf9MBpRGVeTi4eu-AWvVYpD7Nln3bBTppSpHf4MPQ&oe=629248E9';
      }
    } catch (err) {
      throw err;
    }
    const status = 'empty';
    const newScore = new this.scoreModel({
      tutorId,
      subjectId,
      currentScore,
      imageUrl,
      maxScore,
      year,
      status,
    });
    await newScore.save();
    return newScore.id;
  }

  async validateScore(
    tutorId: string,
    subjectId: string,
    status: string,
    adminId: string,
    user: any,
  ) {
    const admin = await this.adminModel.findById(user.id);
    if (!admin) {
      throw new UnauthorizedException('user is not an admin');
    }
    const score = await this.scoreModel.findOne({
      tutorId: tutorId,
      subjectId: subjectId,
    });
    //const score = await this.findScore(tutorId, subjectId);
    if (!score) {
      throw new NotFoundException('score not found');
    }
    if (score.status !== 'pending') {
      throw new ForbiddenException('score already validated');
    }
    if (status === 'approve') {
      score.status = 'approved';
    } else if (status === 'reject') {
      score.status = 'rejected';
    } else {
      throw new ForbiddenException('status invalid');
    }
    score.validator = adminId;
    await score.save();
    return score;
  }

  async deleteScore(tutorId: string, subjectId: string) {
    const score = await this.scoreModel.findOne({
      tutorId: tutorId,
      subjectId: subjectId,
    });
    // console.log(tutorId);
    const imageUrl = score.imageUrl;
    // await this.scoreModel.deleteOne({ tutorId: tutorId, subjectId: subjectId });
    score.currentScore = 0;
    score.status = 'empty';
    // score.imageUrl = null;
    score.imageUrl =
      'https://scontent.fbkk8-4.fna.fbcdn.net/v/t1.15752-9/279085896_661343618302272_560877022376206098_n.png?_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=2p4Jv8c6BZUAX8fAflZ&_nc_ht=scontent.fbkk8-4.fna&oh=03_AVJbPvf9MBpRGVeTi4eu-AWvVYpD7Nln3bBTppSpHf4MPQ&oe=629248E9';
    await score.save();
    await this.s3Service.deleteFile(imageUrl);

    return score._id;
  }

  async editScore(
    tutorId: string,
    subjectId: string,
    currentScore: number,
    maxScore: number,
    year: number,
    image,
  ) {
    const score = await this.scoreModel.findOne({ tutorId, subjectId });
    const subject = await this.subjectModel.findById(subjectId);
    if (score) {
      if (image) {
        await this.s3Service.deleteFile(score.imageUrl);
        score.imageUrl = await this.s3Service.uploadFile(
          score.tutorId + score.subjectId,
          image,
        );
      }

      score.tutorId = tutorId || score.tutorId;
      score.subjectId = subjectId || score.subjectId;
      score.currentScore = currentScore || score.currentScore;
      score.maxScore = maxScore || subject.maxScore;
      score.year = year || score.year;
      score.status = 'pending';
      await score.save();
      return { scoreId: score._id };
    } else {
      const scoreId = await this.insertScore(
        tutorId,
        subjectId,
        currentScore,
        subject.maxScore,
        year,
        image,
      );
      return { scoreId: scoreId };
    }
  }

  async getAllScore(tutorId: string) {
    const scores = await this.scoreModel
      .find({ tutorId: tutorId })
      .populate('subjectId');

    return scores;
  }

  async getTutorSubjectsScore(tutorId: string) {
    const tutor = await this.tutorModel.findById(tutorId).lean();
    const teachSubject = tutor.teachSubject;
    const res = [];
    // console.log(123);
    await Promise.all(
      teachSubject.map(async (subjectId) => {
        const subject = await this.subjectModel.findById(subjectId).lean();
        // console.log(subject.title);
        const score = await this.scoreModel
          .findOne({ tutorId, subjectId })
          .lean(); // score , null {pat  : null , pat2: score}
        // {subject1 : score1, subject2: score2 }
        // console.log(score);
        if (score) {
          // console.log(0);
          res.push({
            subjectId: subject._id,
            subjectName: subject.title,
            level: subject.level,
            currentScore: score.currentScore,
            maxScore: score.maxScore,
            scoreImage: score.imageUrl,
            status: score.status,
          });
        } else {
          // console.log(1);
          res.push({
            subjectId: subject._id,
            subjectName: subject.title,
            level: subject.level,
            currentScore: null,
            maxScore: subject.maxScore,
            scoreImage: null,
          });
          // console.log(res);
        }
      }),
    );
    // console.log(res);
    return res;
  }
}
