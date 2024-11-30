export interface FormData {
  name: string;
  lastname: string;
  district: string;
  address: string;
  reference: string;
  phone: string;
}

export interface District {
  id: number;
  name: string;
}


export interface FormProps {
  formData: FormData;
  errors: Record<keyof FormData, string>; 
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  districts: District[];
}