import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {

  constructor(@InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>) { }

  async getTuits(): Promise<Tuit[]> {
    return this.tuitRepository.find();
  }

  async getTuit(id: number): Promise<Tuit> {
    const tuit = this.tuitRepository.findOneBy({ id });

    if (!tuit) {
      throw new NotFoundException('Resource not found');
    }

    return tuit;

  }

  async createTuit({ message, type }: CreateTuitDto) {
    if (message) {
      const newTuit = {
        message,
        type
      };
      this.tuitRepository.save(newTuit);
      return newTuit;
    }
    return 'Not received tuit';
  }

  async updateTuit(id: number, { message }: UpdateTuitDto) {
    const tuit = await this.tuitRepository.preload({
      id,
      message
    });
    if (!tuit) {
      throw new NotFoundException('Tuit not found');
    }

    return this.tuitRepository.save(tuit);
  }

  async removeTuit(id: number): Promise<void> {

    const tuit = await this.getTuit(id);

    if (!tuit) {
      throw new NotFoundException('Tuit not Found');
    }

    this.tuitRepository.remove(tuit);
  }

}
