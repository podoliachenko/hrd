import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixColumnsPipe } from '@pipes/fix-colums.pipe';
import { LogPipe } from '@pipes/log.pipe';
import { StringifyPipe } from '@pipes/StringifyPipe.pipe';
import { HrdPrivilegePipe } from '@pipes/hrd-privilege.pipe';

const pipes = [FixColumnsPipe, LogPipe, StringifyPipe, HrdPrivilegePipe];

@NgModule({
  declarations: pipes,
  exports: pipes,
  imports: [
    CommonModule
  ]
})
export class HrdPipesModule {
}
