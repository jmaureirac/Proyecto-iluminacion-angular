import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVER } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( img: string ): any {
  
    const url = URL_SERVER + '/imagen' ;

    if ( !img ) {
      return url + '/noimg';
    }

    return url + '/' + img ;

  }

}
