import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';



@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  // Take values from the outside component
  @Input('name') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('leyenda', this.leyenda);
    // console.log('Leyanda', this.progreso);
   }

  onChanges( newValue: number){

  // const elemHTLM: any = document.getElementsByName('progreso')[0];
  // console.log(elemHTLM.value);

  // console.log( this.txtProgress );

  if ( newValue >= 100 ) {
    this.progreso = 100;
  }else if ( newValue <= 0 ){
    this.progreso = 0 ;
  } else {
    this.progreso = newValue;
  }

  this.txtProgress.nativeElement.value = this.progreso;
  // elemHTLM.value = Number( this.progreso );

  this.cambioValor.emit( this.progreso );


  }

  ngOnInit() {
    // console.log('leyenda', this.leyenda);
  }

  changeValue( value ){

    if( this.progreso >= 100 && value > 0){
      this.progreso = 100;
      return;
    }

    if( this.progreso <= 0 && value < 0){
      this.progreso = 0;
    }

    this.progreso = this.progreso + value;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

}
