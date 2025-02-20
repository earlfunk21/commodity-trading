import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, lastValueFrom, map } from 'rxjs';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  private readonly logger: Logger = new Logger(FileService.name);
  private readonly REGION: string;
  private readonly ACCESS_KEY: string;
  private readonly STORAGE_ZONE_NAME: string;
  private readonly HOSTNAME: string;
  private readonly FILE_PATH: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.REGION = this.configService.getOrThrow<string>('BUNNYCDN_REGION');
    this.ACCESS_KEY = this.configService.getOrThrow<string>(
      'BUNNYCDN_ACCESS_KEY',
    );
    this.STORAGE_ZONE_NAME = this.configService.getOrThrow<string>(
      'BUNNYCDN_STORAGE_ZONE_NAME',
    );
    this.HOSTNAME = this.configService.getOrThrow<string>('BUNNYCDN_HOSTNAME');
    this.FILE_PATH =
      this.configService.getOrThrow<string>('BUNNYCDN_FILE_PATH');
  }

  async uploadImage(file: Express.Multer.File, key: string) {
    const optimizedImage = await this.createOptimizeImage(file);
    const url = `https://${this.REGION}.${this.HOSTNAME}/${this.STORAGE_ZONE_NAME}/${this.FILE_PATH}/${key}`;

    const { data } = await firstValueFrom(
      this.httpService
        .put(url, optimizedImage, {
          headers: {
            AccessKey: this.ACCESS_KEY,
            'Content-Type': file.mimetype,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw new UnprocessableEntityException(
              'Unable to upload the image',
            );
          }),
        ),
    );

    return data;
  }

  async uploadVideo(file: Express.Multer.File, key: string) {
    const url = `https://${this.REGION}.${this.HOSTNAME}/${this.STORAGE_ZONE_NAME}/${this.FILE_PATH}/${key}`;

    const { data } = await firstValueFrom(
      this.httpService
        .put(url, file.buffer, {
          headers: {
            AccessKey: this.ACCESS_KEY,
            'Content-Type': file.mimetype,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw new UnprocessableEntityException(
              'Unable to upload the video',
            );
          }),
        ),
    );

    return data;
  }

  async createOptimizeImage(file: Express.Multer.File) {
    const resizedImage = sharp(file.buffer).resize({ width: 800 });

    return resizedImage.png().toBuffer();
  }

  async getFile(key: string) {
    const response = this.httpService
      .get(
        `https://${this.REGION}.${this.HOSTNAME}/${this.STORAGE_ZONE_NAME}/${this.FILE_PATH}${key}`,
        {
          headers: {
            AccessKey: this.ACCESS_KEY,
          },
          responseType: 'arraybuffer',
        },
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw new UnprocessableEntityException('Unable to get the image');
        }),
      );
    return lastValueFrom(response);
  }

  async deleteFile(key: string) {
    const { data } = await lastValueFrom(
      this.httpService
        .delete(
          `https://${this.REGION}.${this.HOSTNAME}/${this.STORAGE_ZONE_NAME}/${this.FILE_PATH}/${key}`,
          {
            headers: {
              AccessKey: this.ACCESS_KEY,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw new UnprocessableEntityException(
              'Unable to delete the image',
            );
          }),
        ),
    );

    return data;
  }
}
