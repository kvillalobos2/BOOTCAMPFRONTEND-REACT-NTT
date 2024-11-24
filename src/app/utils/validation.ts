export const nameValidation = (name: string): string => {
  if (!name) return "Campo obligatorio";
  if (name.trim().length < 2) return "El name debe tener al menos 2 caracteres";
  if (/\d/.test(name)) return "El name no debe contener números";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) return "El name solo debe contener letras";
  return "";
};

export const lastnameValidation = (lastname: string): string => {
  if (!lastname) return "Campo obligatorio";
  if (lastname.trim().length < 2) return "Los lastname deben tener al menos 2 caracteres";
  if (/\d/.test(lastname)) return "Los lastname no deben contener números";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(lastname)) return "Los lastname solo deben contener letras";
  return "";
};

export const districtValidation = (district: string): string => {
  if (!district) return "Campo obligatorio";
  if (district.trim().length < 1) return "Seleccione un district válido";
  return "";
};

export const addressValidation = (address: string): string => {
  if (!address) return "Campo obligatorio";
  if (address.trim().length < 5) return "La dirección debe tener al menos 5 caracteres";
  if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#-]+$/.test(address)) return "La dirección contiene caracteres inválidos";
  return "";
};

export const referenceValidation = (reference: string): string => {
  if (!reference) return "Campo obligatorio";
  if (reference.trim().length < 5) return "La reference debe tener al menos 5 caracteres";
  if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#-]+$/.test(reference)) return "La reference contiene caracteres inválidos";
  return "";
};

export const phoneValidation = (phone: string) => {
  
  if (!phone) {
    return "Campo obligatorio";
  }

  const phoneclean = phone.replace(/[\s\-\(\)\+]/g, '');


  if (phoneclean.startsWith('51')) {
  
    if (phoneclean.charAt(2) !== '9') {
      return "Después del código de país debe empezar con 9";
    }
   
    if (phoneclean.length !== 11) {
      return "El número debe tener 9 dígitos después del código de país";
    }
  } else {
  
    if (!phoneclean.startsWith('9')) {
      return "El phone debe empezar con 9";
    }
    if (phoneclean.length !== 9) {
      return "El phone debe tener 9 dígitos";
    }
  }

  if (!/^\d+$/.test(phoneclean)) {
    return "El phone solo debe contener números";
  }

  return "";
};


export const formValidation = (formData: any) => {
  const errors: any = {};
  errors.name = nameValidation(formData.name);
  errors.lastname = lastnameValidation(formData.lastname);
  errors.district = districtValidation(formData.district);
  errors.address = addressValidation(formData.address);
  errors.reference = referenceValidation(formData.reference);
  errors.phone = phoneValidation(formData.phone);
  return errors;
};
