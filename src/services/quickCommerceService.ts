import apiClient from "../api/apiClient";
import { API_ROUTES } from "../constants/apiRoutes";

/**
 * Product interface for quick commerce
 */
export interface QuickCommerceProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image: string;
  images?: string[];
  stock: number;
  rating: number;
  reviews: number;
  seller: string;
  estimated_delivery: string;
  tags?: string[];
}

/**
 * Order item interface
 */
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

/**
 * Order interface
 */
export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  estimatedDelivery: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get products with optional filtering
 * @param category - Product category filter
 * @param search - Search query
 * @param limit - Maximum results
 * @param offset - Pagination offset
 * @returns Array of products
 */
export const getProducts = async (
  category?: string,
  search?: string,
  limit?: number,
  offset?: number
): Promise<QuickCommerceProduct[]> => {
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (search) params.append("search", search);
  if (limit) params.append("limit", limit.toString());
  if (offset) params.append("offset", offset.toString());

  const queryString = params.toString();
  const url = queryString
    ? `${API_ROUTES.QUICK_COMMERCE.GET_PRODUCTS}?${queryString}`
    : API_ROUTES.QUICK_COMMERCE.GET_PRODUCTS;

  const res = await apiClient.get(url);
  return res.data as QuickCommerceProduct[];
};

/**
 * Get a single product details
 * @param productId - Product ID
 * @returns Product details
 */
export const getProductDetails = async (productId: string): Promise<QuickCommerceProduct> => {
  const res = await apiClient.get(`${API_ROUTES.QUICK_COMMERCE.GET_PRODUCTS}/${productId}`);
  return res.data as QuickCommerceProduct;
};

/**
 * Create a new order
 * @param items - Order items
 * @param shippingAddress - Delivery address
 * @returns Created order
 */
export const createOrder = async (
  items: OrderItem[],
  shippingAddress: any
): Promise<Order> => {
  const payload = {
    items,
    shippingAddress,
  };

  const res = await apiClient.post(API_ROUTES.QUICK_COMMERCE.CREATE_ORDER, payload);
  return res.data as Order;
};

/**
 * Track an order
 * @param orderId - Order ID
 * @returns Order details with tracking info
 */
export const trackOrder = async (orderId: string): Promise<Order> => {
  const res = await apiClient.get(API_ROUTES.QUICK_COMMERCE.TRACK_ORDER(orderId));
  return res.data as Order;
};

/**
 * Cancel an order
 * @param orderId - Order ID
 * @returns Cancellation confirmation
 */
export const cancelOrder = async (orderId: string): Promise<any> => {
  const res = await apiClient.delete(API_ROUTES.QUICK_COMMERCE.CANCEL_ORDER(orderId));
  return res.data;
};

/**
 * Get order history
 * @param limit - Maximum results
 * @param offset - Pagination offset
 * @returns Array of orders
 */
export const getOrderHistory = async (limit?: number, offset?: number): Promise<Order[]> => {
  const params = new URLSearchParams();

  if (limit) params.append("limit", limit.toString());
  if (offset) params.append("offset", offset.toString());

  const queryString = params.toString();
  const url = queryString
    ? `${API_ROUTES.QUICK_COMMERCE.CREATE_ORDER}?${queryString}`
    : API_ROUTES.QUICK_COMMERCE.CREATE_ORDER;

  const res = await apiClient.get(url);
  return res.data as Order[];
};

/**
 * Search products
 * @param query - Search query
 * @param category - Category filter
 * @returns Matching products
 */
export const searchProducts = async (
  query: string,
  category?: string
): Promise<QuickCommerceProduct[]> => {
  return getProducts(category, query);
};
