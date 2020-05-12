import { ApiProperty } from '@nestjs/swagger';

export class PagesParam {
  @ApiProperty({ description: 'Номер страницы списка студентов' })
  page: number;
}

export class PagesQuery {
  @ApiProperty({
    description: 'Обьект фильтра',
    example: '{first_name: "Василий"}'
  })
  filter: any;

  @ApiProperty({
    description: 'Обьект сортировки',
    example: '{first_name: -1}'
  })
  sort: any;

  @ApiProperty({
    required: false,
    description: 'Количество студентов на странице'
  })
  max?: number;
}

export class StudentParam {
  @ApiProperty({ description: 'Id студента' })
  id: string;
}
