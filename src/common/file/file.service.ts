import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  private readonly logger: Logger = new Logger(FileService.name);
  private readonly REGION: string;
  private readonly ACCESS_KEY: string;
  private readonly STORAGE_ZONE_NAME: string;
  private readonly HOSTNAME: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.REGION = this.configService.getOrThrow<string>('BUNNYCDN_REGION');
    this.ACCESS_KEY = this.configService.getOrThrow<string>('BUNNYCDN_ACCESS_KEY');
    this.STORAGE_ZONE_NAME = this.configService.getOrThrow<string>(
      'BUNNYCDN_STORAGE_ZONE_NAME',
    );
    this.HOSTNAME = this.configService.getOrThrow<string>('BUNNYCDN_HOSTNAME');
  }

  async uploadImage(file: Express.Multer.File, key: string, logo?: boolean) {
    const optimizedImage = await this.createOptimizeImage(file, logo);
    const url = `https://${this.REGION}.${this.HOSTNAME}/${this.STORAGE_ZONE_NAME}/${process.env.FILE_PATH}${key}`;

    return this.httpService
      .put(url, optimizedImage, {
        headers: {
          AccessKey: this.ACCESS_KEY,
          'Content-Type': 'application/octet-stream',
        },
      })
      .subscribe();
  }

  async createOptimizeImage(file: Express.Multer.File, logo: boolean = false) {
    let resizedImage = sharp(file.buffer).resize({ width: 800 });
    if (logo) {
      const response = await this.getFile('logo-white.png');
      const logoBuffer = Buffer.from(response, 'binary');
      const logoImage = sharp(logoBuffer).resize({ width: 200 });
      const logoResizedBuffer = await logoImage.toBuffer();
      resizedImage = resizedImage.composite([
        { input: logoResizedBuffer, top: 0, left: 0 },
      ]);
    }

    return resizedImage.toBuffer();
  }

  async getFile(key: string) {
    const response = this.httpService
      .get(
        `https://${this.REGION}.${this.HOSTNAME}/${this.STORAGE_ZONE_NAME}/${process.env.FILE_PATH}${key}`,
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
    return this.httpService
      .delete(
        `https://${this.REGION}.${this.HOSTNAME}/${this.STORAGE_ZONE_NAME}/${process.env.FILE_PATH}${key}`,
        {
          headers: {
            AccessKey: this.ACCESS_KEY,
          },
        },
      )
      .subscribe();
  }
}
