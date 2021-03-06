import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Dictionary } from '../schemas/dictionary.schema';
import { Level } from '../decorators/level.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogTarget } from '../decorators/logtarget.decorator';
import { HistoryService } from '../services/history.service';


@ApiTags('dictionary')
@Controller('dictionary')
export class DictionaryController {
  constructor(
    @InjectModel('Dictionary') private readonly dictionary: Model<Dictionary>,
    private history: HistoryService) {
  }

  @ApiOperation({ summary: 'Получить все словари' })
  @Level(1)
  @Get()
  async getAll(@Param('profileWithDB') profile) {
    const dictionaries = await this.dictionary.aggregate([
      {
        $group: {
          _id: '$name',
          options: {
            $push: {
              _id: '$_id',
              label: '$label',
              value: '$value',
              hide: '$hide'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          options: 1
        }
      }
    ]);

    if (profile.privilege >= 3) {
      for (const dictionary of dictionaries) {
        dictionary.history = await this.history.getLogsByTargetIds(dictionary.options.map(val => val._id));
      }
    }
    return dictionaries;
  }

  @ApiOperation({ summary: 'Cоздать элемент словаря' })
  @Level(2)
  @Post(':dictionary')
  @LogTarget(value => value[0]._id)
  async post(@Param('dictionary') dictionary, @Body('label') label) {
    const value = await this.dictionary.countDocuments({ name: dictionary });
    return await this.dictionary.insertMany([
      { name: dictionary, label, value }
    ]);
  }

  @ApiOperation({ summary: 'Получить изменить имя словаря' })
  @Level(2)
  @Patch('/:id')
  @LogTarget((_, args) => args.params.id)
  async patch(@Param('id') id, @Body('label') label) {
    return await this.dictionary.update({ _id: id }, { label });
  }

  @ApiOperation({ summary: 'Спрятать/показать элемент словаря' })
  @Level(2)
  @Patch('/hide/:id')
  @LogTarget((_, args) => args.params.id)
  async hideChange(@Param('id') id, @Body('hide') hide: boolean) {
    return await this.dictionary.update({ _id: id }, { hide });
  }
}
