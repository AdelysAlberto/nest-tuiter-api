import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';

import { TuitsService } from './tuits.service';

@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitService: TuitsService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTuits(): Promise<Tuit[]> {
    return this.tuitService.getTuits();
  }

  @Get('/filter')
  getFilteredTuits(@Query() filterQuery) {
    const { orderBy, searchTerm } = filterQuery;
    return { orderBy, searchTerm };
  }

  @Get(':id')
  async getTuit(@Param('id') id: number): Promise<Tuit> {
    return this.tuitService.getTuit(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTuit(@Body() body: CreateTuitDto) {
    return this.tuitService.createTuit(body);
  }

  @Patch(':id')
  async updateTuit(@Param('id') id: number, @Body() tuit: UpdateTuitDto): Promise<Tuit> {
    return this.tuitService.updateTuit(id, tuit);
  }

  @Delete(':id')
  async deleteTuit(@Param('id') id: number) {
    return this.tuitService.removeTuit(id);
  }
}
