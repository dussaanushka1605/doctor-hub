export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  batches: Batch[];
}

export interface Batch {
  id: string;
  productId: string;
  batchNumber: string;
  quantity: number;
  expiryDate: string;
  vendor: string;
  receivedDate: string;
  manufacturingDate: string;
  status: 'valid' | 'near-expiry' | 'expired';
}

// Mock data for products
export const products: Product[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    manufacturer: 'ABC Pharma',
    description: 'Pain reliever and fever reducer',
    category: 'Analgesic',
    price: 5.99,
    stock: 1500,
    batches: [
      {
        id: 'b1',
        productId: '1',
        batchNumber: 'PCT-2023-001',
        quantity: 500,
        expiryDate: '2024-12-31',
        vendor: 'MediCorp',
        receivedDate: '2023-01-15',
        manufacturingDate: '2022-12-01',
        status: 'valid',
      },
      {
        id: 'b2',
        productId: '1',
        batchNumber: 'PCT-2023-002',
        quantity: 1000,
        expiryDate: '2025-06-30',
        vendor: 'PharmaPlus',
        receivedDate: '2023-02-20',
        manufacturingDate: '2023-01-15',
        status: 'valid',
      },
    ],
  },
  // Add more products as needed
];

// Mock API functions
export const getProducts = async (): Promise<Product[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const getProductBatches = async (productId: string): Promise<Batch[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === productId);
      resolve(product ? product.batches : []);
    }, 300);
  });
};

export const getManufacturers = (): string[] => {
  const manufacturers = new Set<string>();
  products.forEach((product) => {
    manufacturers.add(product.manufacturer);
  });
  return Array.from(manufacturers);
};

export const getVendors = (): string[] => {
  const vendors = new Set<string>();
  products.forEach((product) => {
    product.batches.forEach((batch) => {
      vendors.add(batch.vendor);
    });
  });
  return Array.from(vendors);
};
