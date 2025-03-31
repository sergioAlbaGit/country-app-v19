import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {

  placeholderInput = input('Buscar')

  initialValue = input<string>('')

  valueOutput = output<string>();

  inputValue = linkedSignal<string>( () => this.initialValue() ?? '' );

  debounceTime = input<number>(300);

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.valueOutput.emit(value)
    }, this.debounceTime());

    onCleanup(()=>{
      clearTimeout(timeout)
    });
  });
 }
