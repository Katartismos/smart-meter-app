// --- Type Definitions ---
export type ApplicationStatus = 'idle' | 'processing' | 'ready';

export interface FormData {
  email: string,
  meterType: string,
  address: string,
}

export interface FormProps {
  formData: FormData,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  handleSubmit: (e: React.FormEvent) => void
}

export interface StatusTrackerProps {
  status: string
}