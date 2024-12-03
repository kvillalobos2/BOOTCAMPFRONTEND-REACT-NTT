import {
  nameValidation,
  lastnameValidation,
  districtValidation,
  addressValidation,
  referenceValidation,
  phoneValidation,
  formValidation,
  emailValidation,
} from "@/utils/validation";
import { FormData } from "@/app/domain/form-type";

describe("Form Validation Utils", () => {
  describe("nameValidation", () => {
    it("Should return error for empty name", () => {
      expect(nameValidation("")).toBe("Campo obligatorio");
    });

    it("Should return error for short name", () => {
      expect(nameValidation("A")).toBe(
        "El nombre debe tener al menos 2 caracteres"
      );
    });

    it("Should return error for name with numbers", () => {
      expect(nameValidation("John123")).toBe(
        "El nombre no debe contener números"
      );
    });

    it("Should return error for name with special characters", () => {
      expect(nameValidation("John!")).toBe(
        "El nombre solo debe contener letras"
      );
    });

    it("Should return empty string for valid name", () => {
      expect(nameValidation("John")).toBe("");
    });
  });

  describe("lastnameValidation", () => {
    it("Should return error for empty lastname", () => {
      expect(lastnameValidation("")).toBe("Campo obligatorio");
    });

    it("Should return error for short lastname", () => {
      expect(lastnameValidation("D")).toBe(
        "El apellido debe tener al menos 2 caracteres"
      );
    });

    it("Should return error for lastname with numbers", () => {
      expect(lastnameValidation("Doe123")).toBe(
        "El apellido no debe contener números"
      );
    });

    it("Should return error for lastname with special characters", () => {
      expect(lastnameValidation("Doe!")).toBe(
        "El apellido solo debe contener letras"
      );
    });

    it("Should return empty string for valid lastname", () => {
      expect(lastnameValidation("Doe")).toBe("");
    });
  });

  describe("districtValidation", () => {
    it("Should return error for empty district", () => {
      expect(districtValidation("")).toBe("Campo obligatorio");
    });

    it("Should return error for whitespace district", () => {
      expect(districtValidation("   ")).toBe("Seleccione un distrito válido");
    });

    it("Should return empty string for valid district", () => {
      expect(districtValidation("Miraflores")).toBe("");
    });
  });

  describe("addressValidation", () => {
    it("Should return error for empty address", () => {
      expect(addressValidation("")).toBe("Campo obligatorio");
    });

    it("Should return error for short address", () => {
      expect(addressValidation("Ave")).toBe(
        "La dirección debe tener al menos 5 caracteres"
      );
    });

    it("Should return error for address with invalid characters", () => {
      expect(addressValidation("Street §")).toBe(
        "La dirección contiene caracteres inválidos"
      );
    });

    it("Should return empty string for valid address", () => {
      expect(addressValidation("Av. Los Alamos 123")).toBe("");
    });
  });

  describe("referenceValidation", () => {
    it("Should return error for empty reference", () => {
      expect(referenceValidation("")).toBe("Campo obligatorio");
    });

    it("Should return error for short reference", () => {
      expect(referenceValidation("Near")).toBe(
        "La referencia debe tener al menos 5 caracteres"
      );
    });

    it("Should return error for reference with invalid characters", () => {
      expect(referenceValidation("Near §")).toBe(
        "La referencia contiene caracteres inválidos"
      );
    });

    it("Should return empty string for valid reference", () => {
      expect(referenceValidation("Near the park")).toBe("");
    });
  });

  describe("phoneValidation", () => {
    it("Should return error for empty phone", () => {
      expect(phoneValidation("")).toBe("Campo obligatorio");
    });

    it("Should validate Peruvian phone number with country code", () => {
      expect(phoneValidation("51912345678")).toBe("");
      expect(phoneValidation("51812345678")).toBe(
        "Después del código de país debe empezar con 9"
      );
      expect(phoneValidation("5191234567")).toBe(
        "El número debe tener 9 dígitos después del código de país"
      );
    });

    it("Should validate phone number without country code", () => {
      expect(phoneValidation("912345678")).toBe("");
      expect(phoneValidation("812345678")).toBe("El número debe empezar con 9");
      expect(phoneValidation("91234567")).toBe(
        "El número debe tener 9 dígitos"
      );
    });

    it("Should return error for non-numeric characters", () => {
      expect(phoneValidation("9123a5678")).toBe(
        "El número solo debe contener números"
      );
    });
  });

  describe("formValidation", () => {
    it("Should validate all form fields and return no errors for valid data", () => {
      const validFormData: FormData = {
        name: "John",
        lastname: "Doe",
        district: "Miraflores",
        address: "Av. Los Alamos 123",
        reference: "Near the park",
        phone: "912345678",
      };

      const errors = formValidation(validFormData);
      expect(Object.values(errors).every((error) => error === "")).toBe(true);
    });

    it("Should return errors for all invalid fields", () => {
      const invalidFormData: FormData = {
        name: "",
        lastname: "",
        district: "",
        address: "",
        reference: "",
        phone: "",
      };

      const errors = formValidation(invalidFormData);
      expect(
        Object.values(errors).every((error) => error === "Campo obligatorio")
      ).toBe(true);
    });

    it("Should validate each field independently", () => {
      const mixedFormData: FormData = {
        name: "John",
        lastname: "Doe123",
        district: "Miraflores",
        address: "Av",
        reference: "Near",
        phone: "123",
      };

      const errors = formValidation(mixedFormData);

      expect(errors.name).toBe("");
      expect(errors.lastname).toBe("El apellido no debe contener números");
      expect(errors.district).toBe("");
      expect(errors.address).toBe(
        "La dirección debe tener al menos 5 caracteres"
      );
      expect(errors.reference).toBe(
        "La referencia debe tener al menos 5 caracteres"
      );
      expect(errors.phone).toBe("El número debe empezar con 9");
    });
  });

  describe("emailValidation", () => {
    it("Should return error for empty email", () => {
      expect(emailValidation("")).toBe("Campo obligatorio");
    });
  
    it("Should return error for invalid email format", () => {
      expect(emailValidation("invalid-email")).toBe(
        "Por favor ingresa un correo electrónico válido"
      );
      expect(emailValidation("another@domain")).toBe(
        "Por favor ingresa un correo electrónico válido"
      );
      expect(emailValidation("user@domain.c")).toBe(
        "Por favor ingresa un correo electrónico válido"
      );
    });
  
    it("Should return empty string for valid email", () => {
      expect(emailValidation("user@example.com")).toBe("");
      expect(emailValidation("valid.email@domain.co")).toBe("");
    });
  });
});
