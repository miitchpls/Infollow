import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EncodePipe } from './encode.pipe';
import { ParseUrlsPipe } from './parse-urls.pipe';
import { ShortNumberPipe } from './short-number.pipe';

const pipes = [EncodePipe, ShortNumberPipe, ParseUrlsPipe];

@NgModule({
  declarations: pipes,
  imports: [CommonModule],
  exports: pipes,
})
export class PipesModule {}
