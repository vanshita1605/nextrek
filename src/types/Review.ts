/**
 * Review and rating TypeScript interfaces for Smart Travel Planning App
 */

/**
 * Review author information
 */
export interface ReviewAuthor {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

/**
 * Review entity (what is being reviewed)
 */
export interface ReviewEntity {
  type: "place" | "hotel" | "restaurant" | "activity" | "trip";
  id: string;
  name: string;
  location?: string;
}

/**
 * Review image/media attachment
 */
export interface ReviewMedia {
  id: string;
  url: string;
  type: "image" | "video";
  caption?: string;
}

/**
 * Main Review interface
 */
export interface Review {
  id: string;
  entity: ReviewEntity;
  author: ReviewAuthor;
  rating: number; // 1-5
  title: string;
  content: string;
  media?: ReviewMedia[];
  tags?: string[];
  helpful: number;
  unhelpful: number;
  replies?: Reply[];
  status: "approved" | "pending" | "rejected";
  createdAt: string;
  updatedAt: string;
}

/**
 * Reply to a review
 */
export interface Reply {
  id: string;
  reviewId: string;
  author: ReviewAuthor;
  content: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create review request payload
 */
export interface CreateReviewPayload {
  entityType: "place" | "hotel" | "restaurant" | "activity" | "trip";
  entityId: string;
  entityName: string;
  location?: string;
  rating: number;
  title: string;
  content: string;
  media?: {
    url: string;
    type: "image" | "video";
    caption?: string;
  }[];
  tags?: string[];
}

/**
 * Update review request payload
 */
export interface UpdateReviewPayload {
  rating?: number;
  title?: string;
  content?: string;
  media?: {
    url: string;
    type: "image" | "video";
    caption?: string;
  }[];
  tags?: string[];
}

/**
 * Reply to review request payload
 */
export interface CreateReplyPayload {
  content: string;
}

/**
 * Review filter options
 */
export interface ReviewFilter {
  entityType?: "place" | "hotel" | "restaurant" | "activity" | "trip";
  entityId?: string;
  minRating?: number;
  maxRating?: number;
  sortBy?: "newest" | "oldest" | "rating" | "helpful";
  limit?: number;
  offset?: number;
}
