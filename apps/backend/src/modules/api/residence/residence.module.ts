import { Module } from '@nestjs/common';
import { ResidenceService } from './residence.service';
import { ResidenceController } from './residence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Residence } from './entities/residence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Residence])],
  controllers: [ResidenceController],
  providers: [ResidenceService],
})
export class ResidenceModule {}
