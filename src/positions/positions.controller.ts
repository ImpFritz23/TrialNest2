import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request, // ✅ make sure this import exists
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PositionsService } from './positions.service';

// ✅ Add Request type from Express
import { Request as ExpressRequest } from 'express';

@Controller('positions')
@UseGuards(JwtAuthGuard)
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  // ✅ GET all positions
  @Get()
  async findAll() {
    return this.positionsService.findAll();
  }

  // ✅ GET one position by id
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.positionsService.findById(id);
  }

  // ✅ POST create new position (Extract user ID from JWT)
  @Post()
  async create(
    @Request() req: ExpressRequest, // ✅ explicitly typed
    @Body() body: any,
  ) {
    const { position_code, position_name } = body;
    const userId = (req.user as any).id; // ✅ Extract user id from JWT token payload

    return this.positionsService.create(position_code, position_name, userId);
  }

  // ✅ PUT update position
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    const { position_code, position_name } = body;
    return this.positionsService.update(id, position_code, position_name);
  }

  // ✅ DELETE position
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.positionsService.delete(id);
  }
}
