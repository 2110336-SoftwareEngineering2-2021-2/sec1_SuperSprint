import { Test } from '@nestjs/testing';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { LocalStrategy } from '../src/auth/local.strategy';
import { S3Service } from '../src/services/S3Sevices.service';
import { AuthService } from '../src/auth/auth.service';
import { SubjectService } from '../src/subject/subject.service';
import { AuthController } from '../src/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from '../src/models/student.model';
import { TutorSchema } from '../src/models/tutor.model';
import { SubjectSchema } from '../src/models/subject.model';
import { AdminSchema } from '../src/models/admin.model';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../src/auth/constants';
import { SubjectModule } from '../src/subject/subject.module';
import { ScoreModule } from '../src/score/score.module';
import { Multer } from 'multer';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('TC2 test validate signin', () => {
  let authService: AuthService;
  // let localStrategy:LocalStrategy;
  let authController: AuthController;
  const OLD_ENV = process.env;
  let app: INestApplication;
  // constructor(private readonly authService: AuthService) {}

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://botercup:6231358221@tuture.krcke.mongodb.net/test?retryWrites=true&w=majority',
        ),
        MongooseModule.forFeature([
          { name: 'Student', schema: StudentSchema },
          { name: 'Tutor', schema: TutorSchema },
          { name: 'Subject', schema: SubjectSchema },
          { name: 'Admin', schema: AdminSchema },
        ]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1800s' },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        SubjectModule,
        ScoreModule,
      ],
      // controllers: [AuthController],
      providers: [
        AuthService,
        S3Service,
        JwtStrategy,
        LocalStrategy,
        SubjectService,
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    // localStrategy = moduleRef.get<LocalStrategy>(LocalStrategy)
    // authController = moduleRef.get<AuthController>(AuthController);
    // app = moduleRef.createNestApplication();
  });

  it('TC2-1 signin blank username with blank password as a student should be null', async () => {
    const username = 's ';
    const password = '';
    expect(await authService.validate(username, password)).toBeNull();
  });

  it('TC2-2 signin blank username with blank password as a tutor should be null', async () => {
    const username = 't ';
    const password = '';
    expect(await authService.validate(username, password)).toBeNull();
  });

  it('TC2-3 signin wrong username with wrong password as a student should be null', async () => {
    const username = 's lnwza007';
    const password = 'trustme';
    expect(await authService.validate(username, password)).toBeNull();
  });

  it('TC2-4 signin with wrong username with wrong password as a tutor should be null', async () => {
    const username = 't lnwza007';
    const password = 'trustme';
    expect(await authService.validate(username, password)).toBeNull();
  });

  it('TC2-5 signin right student username but wrong password as a student should be null', async () => {
    const username = 's poorboi';
    const password = 'touchme';
    expect(await authService.validate(username, password)).toBeNull();
  });

  it('TC2-6 signin right student username with right student password as a student should have jwt token', async () => {
    const username = 's poorboi';
    const password = 'abcDEF123!';
    const resultValidated = await authService.validate(username, password);

    expect(resultValidated).toHaveProperty('username');

    const resultSignin = await authService.signin({
      username,
    });
    expect(resultSignin).toHaveProperty('access_token');
  });

  it('TC2-7 signin right student username with right student password as a tutor should be null', async () => {
    const username = 't poorboi';
    const password = 'abcDEF123!';
    const resultValidated = await authService.validate(username, password);

    expect(resultValidated).toBeNull();
  });

  it('TC2-8 signin right tutor username but wrong password as a student should be null', async () => {
    const username = 's pomsorndee';
    const password = 'tach-mi';
    const resultValidated = await authService.validate(username, password);

    expect(resultValidated).toBeNull();
    // pomsorndeetach - mi;
  });

  it('TC2-9 signin right tutor username with right tutor password as a student should be null', async () => {
    const username = 's pomsorndee';
    const password = 'abcDEF123!';
    const resultValidated = await authService.validate(username, password);

    expect(resultValidated).toBeNull();
  });

  it('TC2-10 signin right tutor username with right tutor password as a tutor should have jwt token', async () => {
    const username = 't pomsorndee';
    const password = 'abcDEF123!';
    const resultValidated = await authService.validate(username, password);

    expect(resultValidated).toHaveProperty('username');

    const resultSignin = await authService.signin({
      username,
    });
    expect(resultSignin).toHaveProperty('access_token');
  });

  it('TC2-11 signin right admin username with right admin password as a student should be null', async () => {
    const username = 's bow';
    const password = '12345';
    const resultValidated = await authService.validate(username, password);

    expect(resultValidated).toBeNull();
  });

  it('TC2-12 signin right admin username with right admin password as a tutor should be null', async () => {
    const username = 't bow';
    const password = '12345';
    const resultValidated = await authService.validate(username, password);

    expect(resultValidated).toBeNull();
  });

  it('TC2-13 signin right admin username with right admin password as a admin should have jwt token', async () => {
    const username = 'a bow';
    const password = '12345';
    const resultValidated = await authService.validate(username, password);

    expect(resultValidated).toHaveProperty('username');

    const resultSignin = await authService.signin({
      username,
    });

    expect(resultSignin).toHaveProperty('access_token');
  });
});
