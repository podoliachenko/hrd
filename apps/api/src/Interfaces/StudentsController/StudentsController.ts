import { ApiModelProperty } from '@nestjs/swagger';

export class PagesParam {
  @ApiModelProperty({ description: 'Номер страницы списка студентов' })
  page: number;
}

export class PagesQuery {
  @ApiModelProperty({
    description: 'Обьект фильтра',
    example: '{first_name: "Василий"}'
  })
  filter: any;

  @ApiModelProperty({
    description: 'Обьект сортировки',
    example: '{first_name: -1}'
  })
  sort: any;

  @ApiModelProperty({
    required: false,
    description: 'Количество студентов на странице'
  })
  max?: number;
}

export class StudentParam {
  @ApiModelProperty({ description: 'Id студента' })
  id: string;
}
