declare module '@/api/services' {
  export const authAPI: any;
  export const productsAPI: any;
  export const categoriesAPI: any;
  export const userAPI: any;
  export const cartAPI: any;
  export const searchAPI: any;
  export declare const ordersAPI: {
    getMyOrders: () => Promise<any>;
  };
} 