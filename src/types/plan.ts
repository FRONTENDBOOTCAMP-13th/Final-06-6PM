import { User } from "./user";

export interface PlanItem {
  _id: number;
  type: string;
  views: number;
  user: User;
  title: string;
  createdAt: string;
  updatedAt: string;
  extra: PlanExtra;
  replies: PlanReply[];
}

export interface PlanExtra {
  startDate: string;
  endDate: string;
}

export interface PlanReply {
  _id: number;
  content: string;
  day: number;
  planDate: string;
  locations: Location[];
}

export interface Location {
  title: string;
  types: string;
  contentId: string;
  mapx: string;
  mapy: string;
}
