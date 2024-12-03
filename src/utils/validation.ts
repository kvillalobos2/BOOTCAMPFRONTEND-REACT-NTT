import { FormData } from "../app/domain/form-type";
import { ValidationRegex } from "../app/domain/validation-rules";


export const nameValidation = (name: string): string => {
  if (!name) return "Campo obligatorio";
  if (name.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
  if (!new RegExp(ValidationRegex.NoNumbers).test(name)) return "El nombre no debe contener números";
  if (!new RegExp(ValidationRegex.OnlyLetters).test(name)) return "El nombre solo debe contener letras";
  return "";
};

export const lastnameValidation = (lastname: string): string => {
  if (!lastname) return "Campo obligatorio";
  if (lastname.trim().length < 2) return "El apellido debe tener al menos 2 caracteres";
  if (!new RegExp(ValidationRegex.NoNumbers).test(lastname)) return "El apellido no debe contener números";
  if (!new RegExp(ValidationRegex.OnlyLetters).test(lastname)) return "El apellido solo debe contener letras";
  return "";
};

export const districtValidation = (district: string): string => {
  if (!district) return "Campo obligatorio";
  if (district.trim().length < 1) return "Seleccione un distrito válido";
  return "";
};

export const addressValidation = (address: string): string => {
  if (!address) return "Campo obligatorio";
  if (address.trim().length < 5) return "La dirección debe tener al menos 5 caracteres";
  if (!new RegExp(ValidationRegex.Address).test(address)) return "La dirección contiene caracteres inválidos";
  return "";
};

export const referenceValidation = (reference: string): string => {
  if (!reference) return "Campo obligatorio";
  if (reference.trim().length < 5) return "La referencia debe tener al menos 5 caracteres";
  if (!new RegExp(ValidationRegex.Address).test(reference)) return "La referencia contiene caracteres inválidos";
  return "";
};

export const phoneValidation = (phone: string): string => {
  if (!phone) return "Campo obligatorio";
  const phoneClean = phone.replace(/[\s\-\(\)\+]/g, '');

  if (phoneClean.startsWith('51')) {
    if (phoneClean.charAt(2) !== '9') {
      return "Después del código de país debe empezar con 9";
    }
    if (phoneClean.length !== 11) {
      return "El número debe tener 9 dígitos después del código de país";
    }
  } else {
    if (!phoneClean.startsWith('9')) {
      return "El número debe empezar con 9";
    }
    if (phoneClean.length !== 9) {
      return "El número debe tener 9 dígitos";
    }
  }

  if (!new RegExp(ValidationRegex.OnlyNumbers).test(phoneClean)) {
    return "El número solo debe contener números";
  }

  return "";
};

export const emailValidation = (email: string): string => {
  if (!email) return "Campo obligatorio";
  if (!new RegExp(ValidationRegex.Email).test(email)) {
    return "Por favor ingresa un correo electrónico válido";
  }
  return "";
};


export const formValidation = (formData: FormData): Record<keyof FormData, string> => {
  const errors: Record<keyof FormData, string> = {
    name: nameValidation(formData.name),
    lastname: lastnameValidation(formData.lastname),
    district: districtValidation(formData.district),
    address: addressValidation(formData.address),
    reference: referenceValidation(formData.reference),
    phone: phoneValidation(formData.phone)
  };
  
  return errors;
};