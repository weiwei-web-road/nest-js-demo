import {
  Controller,
  Get,
  Req,
  Query,
  Response,
  Post,
  Header,
  Redirect,
  Param,
  Body,
} from '@nestjs/common';
import { Request, Response as ResponseType } from 'express';
import { CreateCatDto } from '../dto/cats.dto';
import { ICat } from './cats.interface';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('findAllService')
  async findAllService(): Promise<ICat[]> {
    return this.catsService.findAll();
  }

  @Post('createService')
  async createService(@Body() body: ICat) {
    return this.catsService.create(body);
  }

  @Get('findAll')
  findAll(
    @Req() request: Request,
    @Query() query,
    @Response() res: ResponseType,
  ): void {
    res
      .status(200)
      .type('application/json')
      .send({
        retcode: 0,
        data: `this actions return all cats, and the mount is ${query.limit}`,
      });
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string): Promise<string> {
    return `this action returns a ${id} cat`;
  }

  @Get('findTwo')
  @Redirect('https://docs.nestjs.com', 302)
  findTwo() {
    return { url: 'https://docs.nestjs.com/v5' };
  }

  @Post('create')
  @Header('Cache-Control', 'none')
  async create(@Body() body: CreateCatDto): Promise<string> {
    console.log(body, 'body');
    return 'this action adds a new cat.';
  }
}
