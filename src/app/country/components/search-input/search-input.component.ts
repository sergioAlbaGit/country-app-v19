import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {

  placeholderInput = input('Buscar')

  valueOutput = output<string>();

  inputValue = signal<string>('');

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
