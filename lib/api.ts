const DEFAULT_EXTERNAL_API_BASE_URL = "https://api.opunaboekine.ng";
const DEFAULT_BROWSER_API_BASE_URL = "/";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_BROWSER_API_BASE_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Primitive = string | number | boolean | null | undefined;
type FileLike = Blob | File;

type QueryValue = Primitive | Primitive[];
type QueryParams = Record<string, QueryValue>;

type BodyValue =
  | Primitive
  | Primitive[]
  | Record<string, unknown>
  | Record<string, unknown>[]
  | FileLike
  | FileLike[];

type BodyObject = object;

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export type AdminRole = "super-admin" | string;
export type PostStatus = "draft" | "published" | string;

export interface PaginationLinkItem {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLinkItem[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface ApiDataResponse<T> {
  data: T;
}

export interface ApiMessageResponse {
  message: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  token_type: "Bearer" | string;
  admin: AdminUser;
}

export interface DashboardStats {
  posts: number;
  published_posts: number;
  team_members: number;
  practice_areas: number;
  testimonials: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
}

export interface PostRecord {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  category: string | null;
  tags: string[];
  featured: boolean;
  author: string | null;
  status: PostStatus;
  published_at: string | null;
  cover_image: string | null;
  cover_image_url: string | null;
  featured_image: string | null;
  featured_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamSocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  [key: string]: string | undefined;
}

export interface TeamMemberRecord {
  id: number;
  name: string;
  slug: string | null;
  title: string | null;
  specialty: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  social_links: TeamSocialLinks | null;
  is_published: boolean;
  sort_order: number;
  image: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface TestimonialRecord {
  id: number;
  author_name: string;
  position: string | null;
  testimonial_text: string;
  is_published: boolean;
  sort_order: number;
  photo: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PracticeAreaRecord {
  id: number;
  title: string;
  slug: string | null;
  description: string | null;
  icon: string | null;
  is_published: boolean;
  sort_order: number;
  image: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AboutSection {
  heading: string;
  body: string;
}

export interface AboutRecord {
  id: number;
  title: string;
  content: string | null;
  sections: AboutSection[];
  image: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PublicPostsListOptions {
  page?: number;
}

export interface AdminPostsListOptions {
  page?: number;
}

export interface LoginOptions {
  signal?: AbortSignal;
}

export interface RequestOptions {
  token?: string;
  query?: QueryParams;
  signal?: AbortSignal;
}

export interface CreatePostInput {
  title: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  author?: string;
  status?: PostStatus;
  published_at?: string;
  cover_image?: FileLike;
  featured_image?: FileLike;
}

export interface UpdatePostInput {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  author?: string;
  status?: PostStatus;
  published_at?: string;
  cover_image?: FileLike;
  featured_image?: FileLike;
}

export interface CreateTeamMemberInput {
  name: string;
  slug?: string;
  title?: string;
  specialty?: string;
  bio?: string;
  email?: string;
  phone?: string;
  social_links?: TeamSocialLinks;
  is_published?: boolean;
  sort_order?: number;
  image?: FileLike;
}

export interface UpdateTeamMemberInput {
  name?: string;
  slug?: string;
  title?: string;
  specialty?: string;
  bio?: string;
  email?: string;
  phone?: string;
  social_links?: TeamSocialLinks;
  is_published?: boolean;
  sort_order?: number;
  image?: FileLike;
}

export interface CreateTestimonialInput {
  author_name: string;
  position?: string;
  testimonial_text: string;
  is_published?: boolean;
  sort_order?: number;
  photo?: FileLike;
}

export interface UpdateTestimonialInput {
  author_name?: string;
  position?: string;
  testimonial_text?: string;
  is_published?: boolean;
  sort_order?: number;
  photo?: FileLike;
}

export interface CreatePracticeAreaInput {
  title: string;
  slug?: string;
  description?: string;
  icon?: string;
  is_published?: boolean;
  sort_order?: number;
  image?: FileLike;
}

export interface UpdatePracticeAreaInput {
  title?: string;
  slug?: string;
  description?: string;
  icon?: string;
  is_published?: boolean;
  sort_order?: number;
  image?: FileLike;
}

export interface UpdateAboutInput {
  title?: string;
  content?: string;
  sections?: AboutSection[];
  image?: FileLike;
}

function isFileLike(value: unknown): value is FileLike {
  return typeof Blob !== "undefined" && value instanceof Blob;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value) && !isFileLike(value);
}

function normalizeQueryValue(value: Primitive): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

function normalizeFormValue(value: Primitive): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "1" : "0";
  return String(value);
}

function resolveApiBaseUrl(): string {
  if (/^https?:\/\//i.test(API_BASE_URL)) {
    return API_BASE_URL;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return process.env.API_BASE_URL?.trim() || DEFAULT_EXTERNAL_API_BASE_URL;
}

function buildUrl(path: string, query?: QueryParams): string {
  const baseUrl = resolveApiBaseUrl();
  const url = new URL(path, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item === undefined) return;
          url.searchParams.append(key, normalizeQueryValue(item));
        });
        return;
      }

      url.searchParams.append(key, normalizeQueryValue(value));
    });
  }

  return url.toString();
}

function appendFormValue(formData: FormData, key: string, value: BodyValue): void {
  if (value === undefined) return;

  if (value === null) {
    formData.append(key, "");
    return;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      formData.append(key, "[]");
      return;
    }

    if (value.every((entry) => isFileLike(entry))) {
      value.forEach((entry) => {
        formData.append(`${key}[]`, entry);
      });
      return;
    }

    if (value.every((entry) => isPlainObject(entry))) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    if (value.every((entry) => typeof entry !== "object")) {
      value.forEach((entry) => {
        formData.append(`${key}[]`, normalizeFormValue(entry as Primitive));
      });
      return;
    }

    formData.append(key, JSON.stringify(value));
    return;
  }

  if (isFileLike(value)) {
    formData.append(key, value);
    return;
  }

  if (isPlainObject(value)) {
    formData.append(key, JSON.stringify(value));
    return;
  }

  formData.append(key, normalizeFormValue(value as Primitive));
}

function objectToFormData(input: BodyObject): FormData {
  const formData = new FormData();
  Object.entries(input as Record<string, BodyValue>).forEach(([key, value]) => appendFormValue(formData, key, value));
  return formData;
}

function normalizeFormDataBooleans(formData: FormData): FormData {
  const normalized = new FormData();

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      const lowered = value.trim().toLowerCase();
      if (lowered === "true") {
        normalized.append(key, "1");
        return;
      }
      if (lowered === "false") {
        normalized.append(key, "0");
        return;
      }
    }

    normalized.append(key, value);
  });

  return normalized;
}

function hasFileLikeValue(input: BodyObject): boolean {
  return Object.values(input as Record<string, BodyValue>).some((value) => {
    if (isFileLike(value)) return true;
    if (Array.isArray(value)) return value.some((entry) => isFileLike(entry));
    return false;
  });
}

function toRequestBody(body?: FormData | BodyObject): FormData | string | undefined {
  if (!body) return undefined;
  if (body instanceof FormData) return normalizeFormDataBooleans(body);

  if (hasFileLikeValue(body)) {
    return objectToFormData(body);
  }

  return JSON.stringify(body);
}

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
}

async function request<T>(
  method: HttpMethod,
  path: string,
  options: RequestOptions & { body?: FormData | BodyObject } = {}
): Promise<T> {
  const url = buildUrl(path, options.query);
  const body = toRequestBody(options.body);
  const headers = new Headers();
  headers.set("Accept", "application/json");

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  if (typeof body === "string") {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    method,
    headers,
    body,
    signal: options.signal,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      (isPlainObject(data) && typeof data.message === "string" && data.message) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

export const api = {
  auth: {
    login(payload: LoginRequest, options: LoginOptions = {}) {
      return request<LoginResponse>("POST", "/api/admin/login", {
        body: payload,
        signal: options.signal,
      });
    },

    me(options: RequestOptions = {}) {
      return request<ApiDataResponse<AdminUser>>("GET", "/api/admin/me", options);
    },

    logout(options: RequestOptions = {}) {
      return request<ApiMessageResponse>("POST", "/api/admin/logout", options);
    },
  },

  dashboard: {
    getStats(options: RequestOptions = {}) {
      return request<DashboardResponse>("GET", "/api/admin/dashboard", options);
    },
  },

  admin: {
    posts: {
      list(options: RequestOptions & AdminPostsListOptions = {}) {
        return request<PaginatedResponse<PostRecord>>("GET", "/api/admin/posts", {
          ...options,
          query: {
            ...options.query,
            page: options.page,
          },
        });
      },

      get(id: number | string, options: RequestOptions = {}) {
        return request<ApiDataResponse<PostRecord>>("GET", `/api/admin/posts/${id}`, options);
      },

      create(payload: CreatePostInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<PostRecord>>("POST", "/api/admin/posts", {
          ...options,
          body: payload,
        });
      },

      update(id: number | string, payload: UpdatePostInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<PostRecord>>("PUT", `/api/admin/posts/${id}`, {
          ...options,
          body: payload,
        });
      },

      patch(id: number | string, payload: UpdatePostInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<PostRecord>>("PATCH", `/api/admin/posts/${id}`, {
          ...options,
          body: payload,
        });
      },

      delete(id: number | string, options: RequestOptions = {}) {
        return request<ApiMessageResponse>("DELETE", `/api/admin/posts/${id}`, options);
      },
    },

    teamMembers: {
      list(options: RequestOptions = {}) {
        return request<PaginatedResponse<TeamMemberRecord>>("GET", "/api/admin/team-members", options);
      },

      get(id: number | string, options: RequestOptions = {}) {
        return request<ApiDataResponse<TeamMemberRecord>>("GET", `/api/admin/team-members/${id}`, options);
      },

      create(payload: CreateTeamMemberInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<TeamMemberRecord>>("POST", "/api/admin/team-members", {
          ...options,
          body: payload,
        });
      },

      update(id: number | string, payload: UpdateTeamMemberInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<TeamMemberRecord>>("PUT", `/api/admin/team-members/${id}`, {
          ...options,
          body: payload,
        });
      },

      patch(id: number | string, payload: UpdateTeamMemberInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<TeamMemberRecord>>("PATCH", `/api/admin/team-members/${id}`, {
          ...options,
          body: payload,
        });
      },

      delete(id: number | string, options: RequestOptions = {}) {
        return request<ApiMessageResponse>("DELETE", `/api/admin/team-members/${id}`, options);
      },
    },

    testimonials: {
      list(options: RequestOptions = {}) {
        return request<PaginatedResponse<TestimonialRecord>>("GET", "/api/admin/testimonials", options);
      },

      get(id: number | string, options: RequestOptions = {}) {
        return request<ApiDataResponse<TestimonialRecord>>("GET", `/api/admin/testimonials/${id}`, options);
      },

      create(payload: CreateTestimonialInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<TestimonialRecord>>("POST", "/api/admin/testimonials", {
          ...options,
          body: payload,
        });
      },

      update(id: number | string, payload: UpdateTestimonialInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<TestimonialRecord>>("PUT", `/api/admin/testimonials/${id}`, {
          ...options,
          body: payload,
        });
      },

      patch(id: number | string, payload: UpdateTestimonialInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<TestimonialRecord>>("PATCH", `/api/admin/testimonials/${id}`, {
          ...options,
          body: payload,
        });
      },

      delete(id: number | string, options: RequestOptions = {}) {
        return request<ApiMessageResponse>("DELETE", `/api/admin/testimonials/${id}`, options);
      },
    },

    practiceAreas: {
      list(options: RequestOptions = {}) {
        return request<PaginatedResponse<PracticeAreaRecord>>("GET", "/api/admin/practice-areas", options);
      },

      get(id: number | string, options: RequestOptions = {}) {
        return request<ApiDataResponse<PracticeAreaRecord>>("GET", `/api/admin/practice-areas/${id}`, options);
      },

      create(payload: CreatePracticeAreaInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<PracticeAreaRecord>>("POST", "/api/admin/practice-areas", {
          ...options,
          body: payload,
        });
      },

      update(id: number | string, payload: UpdatePracticeAreaInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<PracticeAreaRecord>>("PUT", `/api/admin/practice-areas/${id}`, {
          ...options,
          body: payload,
        });
      },

      patch(id: number | string, payload: UpdatePracticeAreaInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<PracticeAreaRecord>>("PATCH", `/api/admin/practice-areas/${id}`, {
          ...options,
          body: payload,
        });
      },

      delete(id: number | string, options: RequestOptions = {}) {
        return request<ApiMessageResponse>("DELETE", `/api/admin/practice-areas/${id}`, options);
      },
    },

    about: {
      get(options: RequestOptions = {}) {
        return request<ApiDataResponse<AboutRecord>>("GET", "/api/admin/about", options);
      },

      update(payload: UpdateAboutInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<AboutRecord>>("PUT", "/api/admin/about", {
          ...options,
          body: payload,
        });
      },

      patch(payload: UpdateAboutInput | FormData, options: RequestOptions = {}) {
        return request<ApiDataResponse<AboutRecord>>("PATCH", "/api/admin/about", {
          ...options,
          body: payload,
        });
      },
    },
  },

  public: {
    posts: {
      list(options: PublicPostsListOptions & { signal?: AbortSignal } = {}) {
        return request<PaginatedResponse<PostRecord>>("GET", "/api/public/posts", {
          query: { page: options.page },
          signal: options.signal,
        });
      },

      getBySlug(slug: string, options: { signal?: AbortSignal } = {}) {
        return request<ApiDataResponse<PostRecord>>("GET", `/api/public/posts/${slug}`, {
          signal: options.signal,
        });
      },
    },

    team(options: { signal?: AbortSignal } = {}) {
      return request<ApiDataResponse<TeamMemberRecord[]>>("GET", "/api/public/team", {
        signal: options.signal,
      });
    },

    practiceAreas(options: { signal?: AbortSignal } = {}) {
      return request<ApiDataResponse<PracticeAreaRecord[]>>("GET", "/api/public/practice-areas", {
        signal: options.signal,
      });
    },

    testimonials(options: { signal?: AbortSignal } = {}) {
      return request<ApiDataResponse<TestimonialRecord[]>>("GET", "/api/public/testimonials", {
        signal: options.signal,
      });
    },

    about(options: { signal?: AbortSignal } = {}) {
      return request<ApiDataResponse<AboutRecord>>("GET", "/api/public/about", {
        signal: options.signal,
      });
    },
  },
};

export default api;