export enum ValidationRegex {
    OnlyLetters = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$', 
    Address = '^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\s.,#-]+$', 
    OnlyNumbers = '^\\d+$', 
    NoNumbers = '^([^\\d]*)$', 
    Email = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
  }
  