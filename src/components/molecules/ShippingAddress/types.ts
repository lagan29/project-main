export type ShippingAddressFormData = {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  
  export type ShippingAddressProps = {
    defaultValues?: Partial<ShippingAddressFormData>;
    onSubmit: (data: ShippingAddressFormData) => void;
  };