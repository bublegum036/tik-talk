import { Profile } from '../../../profile/interfaces';

export interface PostCreateDto {
  title: string;
  content: string;
  authorId: number;
  // communityId: 0
}

export interface Post {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: PostComment[];
}

export interface PostComment {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    avatarUrl: string;
    subscribersAmount: number;
  };
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateDto {
  text: string;
  authorId: number;
  postId: number;
}
