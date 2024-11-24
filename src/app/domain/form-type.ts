export interface FormProps {
    formData: {
      name: string;
      lastname: string;
      district: string;
      address: string;
      reference: string;
      phone: string;
    };
    errors: {
      name: string;
      lastname: string;
      district: string;
      address: string;
      reference: string;
      phone: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    districts: { id: number; name: string }[];
  }
  