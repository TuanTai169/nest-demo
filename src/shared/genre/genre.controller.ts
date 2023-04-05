import { RolesGuard } from 'src/common/guard/roles.guard';
import { GenreService } from './genre.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  Body,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guard/auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Genre } from 'src/db/entity/genre.entity';
import { UpdateGenreDto } from 'src/dtos/genre.dto';
import { CreateGenreDto } from './../../dtos/genre.dto';

@Controller('/api/genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  getAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @UseGuards(AuthenticationGuard)
  @Get(':id')
  async findUserById(@Param() params): Promise<Genre> {
    return this.genreService.findUserById(params.id);
  }

  @Post()
  create(@Body() postDto: CreateGenreDto) {
    return this.genreService.create(postDto);
  }

  @UseGuards(AuthenticationGuard)
  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() updateData: UpdateGenreDto): Promise<any> {
    return this.genreService.update(+id, updateData);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.genreService.delete(+id);
  }
}
