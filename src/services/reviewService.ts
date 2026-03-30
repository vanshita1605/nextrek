import apiClient from "../api/apiClient";
import { API_ROUTES } from "../constants/apiRoutes";
import {
  Review,
  CreateReviewPayload,
  UpdateReviewPayload,
  ReviewFilter,
  Reply,
  CreateReplyPayload,
} from "../types/Review";

/**
 * Get all reviews with optional filtering
 * @param filter - Filter options
 * @returns Array of reviews
 */
export const getReviews = async (filter?: ReviewFilter): Promise<Review[]> => {
  const params = new URLSearchParams();

  if (filter) {
    if (filter.entityType) params.append("entityType", filter.entityType);
    if (filter.entityId) params.append("entityId", filter.entityId);
    if (filter.minRating) params.append("minRating", filter.minRating.toString());
    if (filter.maxRating) params.append("maxRating", filter.maxRating.toString());
    if (filter.sortBy) params.append("sortBy", filter.sortBy);
    if (filter.limit) params.append("limit", filter.limit.toString());
    if (filter.offset) params.append("offset", filter.offset.toString());
  }

  const queryString = params.toString();
  const url = queryString
    ? `${API_ROUTES.REVIEWS.GET_ALL}?${queryString}`
    : API_ROUTES.REVIEWS.GET_ALL;

  const res = await apiClient.get(url);
  return res.data as Review[];
};

/**
 * Get a single review by ID
 * @param id - Review ID
 * @returns Review details
 */
export const getReviewById = async (id: string): Promise<Review> => {
  const res = await apiClient.get(API_ROUTES.REVIEWS.GET_BY_ID(id));
  return res.data as Review;
};

/**
 * Create a new review
 * @param data - Review details
 * @returns Created review
 */
export const createReview = async (data: CreateReviewPayload): Promise<Review> => {
  const payload = {
    ...data,
    entity: {
      type: data.entityType,
      id: data.entityId,
      name: data.entityName,
      location: data.location,
    },
  };

  const res = await apiClient.post(API_ROUTES.REVIEWS.CREATE, payload);
  return res.data as Review;
};

/**
 * Update an existing review
 * @param id - Review ID
 * @param data - Fields to update
 * @returns Updated review
 */
export const updateReview = async (
  id: string,
  data: UpdateReviewPayload
): Promise<Review> => {
  const res = await apiClient.put(API_ROUTES.REVIEWS.UPDATE(id), data);
  return res.data as Review;
};

/**
 * Delete a review
 * @param id - Review ID
 */
export const deleteReview = async (id: string): Promise<void> => {
  await apiClient.delete(API_ROUTES.REVIEWS.DELETE(id));
};

/**
 * Mark review as helpful
 * @param id - Review ID
 * @returns Updated review
 */
export const markHelpful = async (id: string): Promise<Review> => {
  const res = await apiClient.post(`${API_ROUTES.REVIEWS.GET_BY_ID(id)}/helpful`, {});
  return res.data as Review;
};

/**
 * Mark review as unhelpful
 * @param id - Review ID
 * @returns Updated review
 */
export const markUnhelpful = async (id: string): Promise<Review> => {
  const res = await apiClient.post(`${API_ROUTES.REVIEWS.GET_BY_ID(id)}/unhelpful`, {});
  return res.data as Review;
};

/**
 * Reply to a review
 * @param reviewId - Review ID
 * @param data - Reply content
 * @returns Created reply
 */
export const replyToReview = async (
  reviewId: string,
  data: CreateReplyPayload
): Promise<Reply> => {
  const res = await apiClient.post(
    `${API_ROUTES.REVIEWS.GET_BY_ID(reviewId)}/replies`,
    data
  );
  return res.data as Reply;
};

/**
 * Get reviews for a specific entity
 * @param entityType - Type of entity
 * @param entityId - Entity ID
 * @returns Array of reviews
 */
export const getEntityReviews = async (
  entityType: string,
  entityId: string
): Promise<Review[]> => {
  return getReviews({
    entityType: entityType as any,
    entityId,
  });
};

/**
 * Get average rating for an entity
 * @param entityType - Type of entity
 * @param entityId - Entity ID
 * @returns Average rating
 */
export const getEntityAverageRating = async (
  entityType: string,
  entityId: string
): Promise<number> => {
  const reviews = await getEntityReviews(entityType, entityId);
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};
