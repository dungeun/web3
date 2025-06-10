--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: MediaType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."MediaType" AS ENUM (
    'IMAGE',
    'VIDEO'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Attachment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Attachment" (
    id integer NOT NULL,
    filename text NOT NULL,
    filepath text NOT NULL,
    filesize integer NOT NULL,
    mimetype text NOT NULL,
    "postId" integer,
    "galleryId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Attachment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Attachment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Attachment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Attachment_id_seq" OWNED BY public."Attachment".id;


--
-- Name: Banner; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Banner" (
    id integer NOT NULL,
    title text NOT NULL,
    subtitle text,
    "imageUrl" text NOT NULL,
    "mobileImageUrl" text,
    "linkUrl" text,
    "linkTarget" text DEFAULT '_self'::text NOT NULL,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "startDate" timestamp(3) without time zone,
    "endDate" timestamp(3) without time zone,
    "position" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Banner_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Banner_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Banner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Banner_id_seq" OWNED BY public."Banner".id;


--
-- Name: BoardCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."BoardCategory" (
    id integer NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    description text,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: BoardCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."BoardCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: BoardCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."BoardCategory_id_seq" OWNED BY public."BoardCategory".id;


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    content text NOT NULL,
    "postId" integer NOT NULL,
    "authorId" integer NOT NULL,
    "parentId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: Gallery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Gallery" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    "thumbnailUrl" text,
    "isPublished" boolean DEFAULT true NOT NULL,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    "categoryId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: GalleryCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GalleryCategory" (
    id integer NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    description text,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: GalleryCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."GalleryCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: GalleryCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."GalleryCategory_id_seq" OWNED BY public."GalleryCategory".id;


--
-- Name: Gallery_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Gallery_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Gallery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Gallery_id_seq" OWNED BY public."Gallery".id;


--
-- Name: HeroSlide; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."HeroSlide" (
    id integer NOT NULL,
    title text NOT NULL,
    subtitle text,
    "buttonText" text,
    "buttonUrl" text,
    "mediaType" public."MediaType" DEFAULT 'IMAGE'::public."MediaType" NOT NULL,
    "mediaUrl" text NOT NULL,
    "overlay" integer DEFAULT 10 NOT NULL,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: HeroSlide_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."HeroSlide_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: HeroSlide_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."HeroSlide_id_seq" OWNED BY public."HeroSlide".id;


--
-- Name: Menu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Menu" (
    id integer NOT NULL,
    title text NOT NULL,
    path text NOT NULL,
    type text DEFAULT 'internal'::text NOT NULL,
    target text DEFAULT '_self'::text NOT NULL,
    "parentId" integer,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Menu_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Menu_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Menu_id_seq" OWNED BY public."Menu".id;


--
-- Name: Page; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Page" (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    content text DEFAULT ''::text NOT NULL,
    "templateId" text,
    sections text,
    "metaTitle" text,
    "metaDescription" text,
    "menuId" integer,
    "isPublished" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: PageContent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PageContent" (
    id integer NOT NULL,
    "pageId" text NOT NULL,
    title text,
    content text,
    metadata text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: PageContent_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."PageContent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: PageContent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."PageContent_id_seq" OWNED BY public."PageContent".id;


--
-- Name: Page_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Page_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Page_id_seq" OWNED BY public."Page".id;


--
-- Name: Post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Post" (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    excerpt text,
    views integer DEFAULT 0 NOT NULL,
    "isPublished" boolean DEFAULT true NOT NULL,
    "isPinned" boolean DEFAULT false NOT NULL,
    "categoryId" integer NOT NULL,
    "authorId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    rating integer,
    "isAnswered" boolean DEFAULT false NOT NULL,
    "answeredAt" timestamp(3) without time zone
);


--
-- Name: Post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Post_id_seq" OWNED BY public."Post".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    code text,
    name text NOT NULL,
    model text,
    description text,
    specifications text,
    price double precision,
    "imageUrl" text,
    "categoryId" integer NOT NULL,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    "isPublished" boolean DEFAULT true NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ProductCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ProductCategory" (
    id integer NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    "nameKo" text,
    description text,
    level integer DEFAULT 1 NOT NULL,
    "parentId" integer,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ProductCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ProductCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ProductCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ProductCategory_id_seq" OWNED BY public."ProductCategory".id;


--
-- Name: ProductImage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ProductImage" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    url text NOT NULL,
    alt text,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: ProductImage_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ProductImage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ProductImage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ProductImage_id_seq" OWNED BY public."ProductImage".id;


--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: SiteConfig; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SiteConfig" (
    id integer NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: SiteConfig_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."SiteConfig_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: SiteConfig_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."SiteConfig_id_seq" OWNED BY public."SiteConfig".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    role text DEFAULT 'user'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: VisitorStats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."VisitorStats" (
    id integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    visitors integer DEFAULT 0 NOT NULL,
    "pageViews" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: VisitorStats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."VisitorStats_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: VisitorStats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."VisitorStats_id_seq" OWNED BY public."VisitorStats".id;


--
-- Name: Attachment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Attachment" ALTER COLUMN id SET DEFAULT nextval('public."Attachment_id_seq"'::regclass);


--
-- Name: Banner id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Banner" ALTER COLUMN id SET DEFAULT nextval('public."Banner_id_seq"'::regclass);


--
-- Name: BoardCategory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BoardCategory" ALTER COLUMN id SET DEFAULT nextval('public."BoardCategory_id_seq"'::regclass);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: Gallery id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Gallery" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_id_seq"'::regclass);


--
-- Name: GalleryCategory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GalleryCategory" ALTER COLUMN id SET DEFAULT nextval('public."GalleryCategory_id_seq"'::regclass);


--
-- Name: HeroSlide id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HeroSlide" ALTER COLUMN id SET DEFAULT nextval('public."HeroSlide_id_seq"'::regclass);


--
-- Name: Menu id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Menu" ALTER COLUMN id SET DEFAULT nextval('public."Menu_id_seq"'::regclass);


--
-- Name: Page id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Page" ALTER COLUMN id SET DEFAULT nextval('public."Page_id_seq"'::regclass);


--
-- Name: PageContent id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PageContent" ALTER COLUMN id SET DEFAULT nextval('public."PageContent_id_seq"'::regclass);


--
-- Name: Post id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post" ALTER COLUMN id SET DEFAULT nextval('public."Post_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: ProductCategory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductCategory" ALTER COLUMN id SET DEFAULT nextval('public."ProductCategory_id_seq"'::regclass);


--
-- Name: ProductImage id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductImage" ALTER COLUMN id SET DEFAULT nextval('public."ProductImage_id_seq"'::regclass);


--
-- Name: SiteConfig id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteConfig" ALTER COLUMN id SET DEFAULT nextval('public."SiteConfig_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: VisitorStats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VisitorStats" ALTER COLUMN id SET DEFAULT nextval('public."VisitorStats_id_seq"'::regclass);


--
-- Data for Name: Attachment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Attachment" (id, filename, filepath, filesize, mimetype, "postId", "galleryId", "createdAt") FROM stdin;
\.


--
-- Data for Name: Banner; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Banner" (id, title, subtitle, "imageUrl", "mobileImageUrl", "linkUrl", "linkTarget", "orderIndex", "isActive", "startDate", "endDate", "position", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: BoardCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BoardCategory" (id, slug, name, description, "orderIndex", "isActive", "createdAt", "updatedAt") FROM stdin;
1	notice	공지사항	대경하드웨어의 중요한 공지사항입니다.	0	t	2025-06-10 02:59:22.942	2025-06-10 02:59:22.942
2	news	뉴스 & 소식	업계 동향과 회사 소식을 전해드립니다.	0	t	2025-06-10 02:59:22.945	2025-06-10 02:59:22.945
3	qna	Q&A	궁금한 점을 문의하고 답변을 받아보세요.	0	t	2025-06-10 02:59:22.947	2025-06-10 02:59:22.947
4	review	고객 후기	고객님들의 소중한 후기입니다.	0	t	2025-06-10 02:59:22.948	2025-06-10 02:59:22.948
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Comment" (id, content, "postId", "authorId", "parentId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Gallery; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Gallery" (id, title, description, "thumbnailUrl", "isPublished", "orderIndex", "categoryId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: GalleryCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."GalleryCategory" (id, slug, name, description, "orderIndex", "isActive", "createdAt", "updatedAt") FROM stdin;
1	product	제품 갤러리	대경하드웨어의 다양한 제품 이미지	0	t	2025-06-10 02:59:22.949	2025-06-10 02:59:22.949
2	portfolio	포트폴리오	프로젝트 및 시공 사례	0	t	2025-06-10 02:59:22.951	2025-06-10 02:59:22.951
3	event	이벤트 갤러리	행사 및 이벤트 사진	0	t	2025-06-10 02:59:22.952	2025-06-10 02:59:22.952
\.


--
-- Data for Name: HeroSlide; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."HeroSlide" (id, title, subtitle, "buttonText", "buttonUrl", "mediaType", "mediaUrl", "overlay", "orderIndex", "isActive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Menu; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") FROM stdin;
1	홈	/	internal	_self	\N	0	t	2025-06-10 02:59:22.97	2025-06-10 02:59:22.97
2	회사소개	/company	internal	_self	\N	1	t	2025-06-10 02:59:22.971	2025-06-10 02:59:22.971
3	제품소개	/products	internal	_self	\N	2	t	2025-06-10 02:59:22.972	2025-06-10 02:59:22.972
4	인증정보	/certification	internal	_self	\N	3	t	2025-06-10 02:59:22.972	2025-06-10 02:59:22.972
5	견적문의	/inquiry	internal	_self	\N	4	t	2025-06-10 02:59:22.973	2025-06-10 02:59:22.973
6	커뮤니티	/board	internal	_self	\N	5	t	2025-06-10 02:59:22.973	2025-06-10 02:59:22.973
7	갤러리	/gallery	internal	_self	\N	6	t	2025-06-10 02:59:22.973	2025-06-10 02:59:22.973
8	회사소개	/company	dropdown	_self	\N	1	t	2025-06-10 02:59:28.018	2025-06-10 02:59:28.018
9	제품소개	/products	dropdown	_self	\N	2	t	2025-06-10 02:59:28.02	2025-06-10 02:59:28.02
10	인증정보	/certification	dropdown	_self	\N	3	t	2025-06-10 02:59:28.021	2025-06-10 02:59:28.021
11	견적문의	/inquiry	internal	_self	\N	4	t	2025-06-10 02:59:28.021	2025-06-10 02:59:28.021
12	커뮤니티	/board	dropdown	_self	\N	5	t	2025-06-10 02:59:28.022	2025-06-10 02:59:28.022
13	갤러리	/gallery	dropdown	_self	\N	6	t	2025-06-10 02:59:28.022	2025-06-10 02:59:28.022
14	회사개요/인사말	/company	internal	_self	2	1	t	2025-06-10 02:59:28.024	2025-06-10 02:59:28.024
15	사업장 소개/오시는 길	/location	internal	_self	2	2	t	2025-06-10 02:59:28.024	2025-06-10 02:59:28.024
16	A | Handlelocker & Fasterner	/products?category=A	internal	_self	3	1	t	2025-06-10 02:59:28.025	2025-06-10 02:59:28.025
17	B | Hinge	/products?category=B	internal	_self	3	2	t	2025-06-10 02:59:28.025	2025-06-10 02:59:28.025
18	C | Clip & Latch	/products?category=C	internal	_self	3	3	t	2025-06-10 02:59:28.025	2025-06-10 02:59:28.025
19	G | Rubber & Seals	/products?category=G	internal	_self	3	4	t	2025-06-10 02:59:28.025	2025-06-10 02:59:28.025
20	H | Handle & Grip	/products?category=H	internal	_self	3	5	t	2025-06-10 02:59:28.025	2025-06-10 02:59:28.025
21	S | Stay & Sliderail	/products?category=S	internal	_self	3	6	t	2025-06-10 02:59:28.025	2025-06-10 02:59:28.025
\.


--
-- Data for Name: Page; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Page" (id, title, slug, content, "templateId", sections, "metaTitle", "metaDescription", "menuId", "isPublished", "createdAt", "updatedAt") FROM stdin;
1	회사소개	company		company	{"hero":{"id":"hero","type":"hero","title":"대경하드웨어","subtitle":"30년 이상의 경험과 기술력으로 최고 품질의 하드웨어 소재를 제공합니다"}}	\N	\N	\N	t	2025-06-10 02:59:28.026	2025-06-10 02:59:28.026
2	사업장 소개/오시는 길	location		location	{"hero":{"id":"hero","type":"hero","title":"오시는 길"}}	\N	\N	\N	t	2025-06-10 02:59:28.027	2025-06-10 02:59:28.027
3	견적문의	inquiry		inquiry	{"hero":{"id":"hero","type":"hero","title":"견적 문의"}}	\N	\N	\N	t	2025-06-10 02:59:28.028	2025-06-10 02:59:28.028
4	인증 및 특허	certification		certification	{"hero":{"id":"hero","type":"hero","title":"인증 정보"}}	\N	\N	\N	t	2025-06-10 02:59:28.029	2025-06-10 02:59:28.029
5	제품소개	products		products	{"hero":{"id":"hero","type":"hero","title":"제품 소개"}}	\N	\N	\N	t	2025-06-10 02:59:28.029	2025-06-10 02:59:28.029
\.


--
-- Data for Name: PageContent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PageContent" (id, "pageId", title, content, metadata, "createdAt", "updatedAt") FROM stdin;
1	home	홈페이지	{"heroTitle":"대한민국 대표 하드웨어 소재 전문기업","heroSubtitle":"대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.","aboutTitle":"대경하드웨어 소개","aboutContent":"대경하드웨어는 1990년 설립 이래 30년 이상의 역사를 가진 하드웨어 소재 전문기업으로, \\n다양한 산업 분야에 고품질의 하드웨어 소재를 공급하고 있습니다.\\n\\n우리 회사는 지속적인 연구개발과 품질 향상을 통해 국내외 시장에서 인정받는 기업으로 성장했으며,\\n다양한 인증과 특허를 보유하고 있습니다.","productsTitle":"제품 카테고리","productsSubtitle":"대경하드웨어는 다양한 산업 분야에 적용 가능한 고품질 하드웨어 소재를 제공합니다.","ctaTitle":"하드웨어 소재에 관한 문의가 있으신가요?","ctaSubtitle":"대경하드웨어의 전문가들이 고객님에게 최적화된 하드웨어 소재를 제안해 드립니다."}	{"title":"대경하드웨어 - 하드웨어 소재 전문기업","description":"30년 전통의 하드웨어 소재 전문기업 대경하드웨어","keywords":"하드웨어, 힌지, 핸들, 락커, 패스너"}	2025-06-10 02:59:22.96	2025-06-10 02:59:22.96
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Post" (id, title, content, excerpt, views, "isPublished", "isPinned", "categoryId", "authorId", "createdAt", "updatedAt", rating, "isAnswered", "answeredAt") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") FROM stdin;
1	\N	A-22T	A-22T	패스너 - A-22T	\N	\N	/images/A-Handlelocker & Fasterner/	16	0	t	t	2025-06-10 02:59:34.029	2025-06-10 02:59:34.029
2	\N	A-610	A-610	플랫 락 - A-610	\N	\N	/images/A-Handlelocker & Fasterner/	17	0	t	t	2025-06-10 02:59:34.031	2025-06-10 02:59:34.031
3	\N	A-611	A-611	플랫 락 - A-611	\N	\N	/images/A-Handlelocker & Fasterner/	17	1	t	t	2025-06-10 02:59:34.032	2025-06-10 02:59:34.032
4	\N	A-612	A-612	플랫 락 - A-612	\N	\N	/images/A-Handlelocker & Fasterner/	17	2	t	t	2025-06-10 02:59:34.033	2025-06-10 02:59:34.033
5	\N	A-61S	A-61S	플랫 락 - A-61S	\N	\N	/images/A-Handlelocker & Fasterner/	17	3	t	t	2025-06-10 02:59:34.034	2025-06-10 02:59:34.034
6	\N	A-63S	A-63S	플랫 락 - A-63S	\N	\N	/images/A-Handlelocker & Fasterner/	17	4	t	t	2025-06-10 02:59:34.034	2025-06-10 02:59:34.034
7	\N	A-65	A-65	플랫 락 - A-65	\N	\N	/images/A-Handlelocker & Fasterner/	17	5	t	t	2025-06-10 02:59:34.035	2025-06-10 02:59:34.035
8	\N	A-5600(LH)	A-5600(LH)	핸들 래치 - A-5600(LH)	\N	\N	/images/A-Handlelocker & Fasterner/	18	0	t	t	2025-06-10 02:59:34.037	2025-06-10 02:59:34.037
9	\N	A-5606	A-5606	핸들 래치 - A-5606	\N	\N	/images/A-Handlelocker & Fasterner/	18	1	t	t	2025-06-10 02:59:34.037	2025-06-10 02:59:34.037
10	\N	H-429-1	H-429-1	핸들 래치 - H-429-1	\N	\N	/images/A-Handlelocker & Fasterner/	18	2	t	t	2025-06-10 02:59:34.038	2025-06-10 02:59:34.038
11	\N	MDSI-A-30	MDSI-A-30	핸들 락 - MDSI-A-30	\N	\N	/images/A-Handlelocker & Fasterner/	19	0	t	t	2025-06-10 02:59:34.039	2025-06-10 02:59:34.039
12	\N	MDSI-A-31	MDSI-A-31	핸들 락 - MDSI-A-31	\N	\N	/images/A-Handlelocker & Fasterner/	19	1	t	t	2025-06-10 02:59:34.04	2025-06-10 02:59:34.04
13	\N	A-1200-1	A-1200-1	락 액세서리 - A-1200-1	\N	\N	/images/A-Handlelocker & Fasterner/	20	0	t	t	2025-06-10 02:59:34.042	2025-06-10 02:59:34.042
14	\N	E-1200	E-1200	락 액세서리 - E-1200	\N	\N	/images/A-Handlelocker & Fasterner/	20	1	t	t	2025-06-10 02:59:34.042	2025-06-10 02:59:34.042
15	\N	MDSI-A-1T8	MDSI-A-1T8	락 액세서리 - MDSI-A-1T8	\N	\N	/images/A-Handlelocker & Fasterner/	20	2	t	t	2025-06-10 02:59:34.043	2025-06-10 02:59:34.043
16	\N	MDSI-A-35	MDSI-A-35	락 액세서리 - MDSI-A-35	\N	\N	/images/A-Handlelocker & Fasterner/	20	3	t	t	2025-06-10 02:59:34.043	2025-06-10 02:59:34.043
17	\N	MDSI-A-38-2	MDSI-A-38-2	락 액세서리 - MDSI-A-38-2	\N	\N	/images/A-Handlelocker & Fasterner/	20	4	t	t	2025-06-10 02:59:34.044	2025-06-10 02:59:34.044
18	\N	MDSI-A-38-4	MDSI-A-38-4	락 액세서리 - MDSI-A-38-4	\N	\N	/images/A-Handlelocker & Fasterner/	20	5	t	t	2025-06-10 02:59:34.044	2025-06-10 02:59:34.044
19	\N	MDSI-A-42T	MDSI-A-42T	락 액세서리 - MDSI-A-42T	\N	\N	/images/A-Handlelocker & Fasterner/	20	6	t	t	2025-06-10 02:59:34.045	2025-06-10 02:59:34.045
20	\N	P-1250	P-1250	락 액세서리 - P-1250	\N	\N	/images/A-Handlelocker & Fasterner/	20	7	t	t	2025-06-10 02:59:34.045	2025-06-10 02:59:34.045
21	\N	A-1088	A-1088	플레인 락 - A-1088	\N	\N	/images/A-Handlelocker & Fasterner/	21	0	t	t	2025-06-10 02:59:34.046	2025-06-10 02:59:34.046
22	\N	A-305	A-305	플레인 락 - A-305	\N	\N	/images/A-Handlelocker & Fasterner/	21	1	t	t	2025-06-10 02:59:34.047	2025-06-10 02:59:34.047
23	\N	A-307	A-307	플레인 락 - A-307	\N	\N	/images/A-Handlelocker & Fasterner/	21	2	t	t	2025-06-10 02:59:34.047	2025-06-10 02:59:34.047
24	\N	A-310	A-310	플레인 락 - A-310	\N	\N	/images/A-Handlelocker & Fasterner/	21	3	t	t	2025-06-10 02:59:34.048	2025-06-10 02:59:34.048
25	\N	A-313	A-313	플레인 락 - A-313	\N	\N	/images/A-Handlelocker & Fasterner/	21	4	t	t	2025-06-10 02:59:34.048	2025-06-10 02:59:34.048
26	\N	A-401	A-401	플레인 락 - A-401	\N	\N	/images/A-Handlelocker & Fasterner/	21	5	t	t	2025-06-10 02:59:34.049	2025-06-10 02:59:34.049
27	\N	A-403-1	A-403-1	플레인 락 - A-403-1	\N	\N	/images/A-Handlelocker & Fasterner/	21	6	t	t	2025-06-10 02:59:34.049	2025-06-10 02:59:34.049
28	\N	A-403	A-403	플레인 락 - A-403	\N	\N	/images/A-Handlelocker & Fasterner/	21	7	t	t	2025-06-10 02:59:34.05	2025-06-10 02:59:34.05
29	\N	A-31T	A-31T	로드 컨트롤 락 - A-31T	\N	\N	/images/A-Handlelocker & Fasterner/	22	0	t	t	2025-06-10 02:59:34.051	2025-06-10 02:59:34.051
30	\N	A-3T	A-3T	로드 컨트롤 락 - A-3T	\N	\N	/images/A-Handlelocker & Fasterner/	22	1	t	t	2025-06-10 02:59:34.052	2025-06-10 02:59:34.052
31	\N	A-500	A-500	로드 컨트롤 락 - A-500	\N	\N	/images/A-Handlelocker & Fasterner/	22	2	t	t	2025-06-10 02:59:34.052	2025-06-10 02:59:34.052
32	\N	B-910	B-910	버터플라이 힌지 - B-910	\N	\N	/images/B-Hinge/	24	0	t	t	2025-06-10 02:59:34.054	2025-06-10 02:59:34.054
33	\N	DK-B-6060	DK-B-6060	버터플라이 힌지 - DK-B-6060	\N	\N	/images/B-Hinge/	24	1	t	t	2025-06-10 02:59:34.054	2025-06-10 02:59:34.054
34	\N	DK-B-8085	DK-B-8085	버터플라이 힌지 - DK-B-8085	\N	\N	/images/B-Hinge/	24	2	t	t	2025-06-10 02:59:34.055	2025-06-10 02:59:34.055
35	\N	Dk-B-6070	Dk-B-6070	버터플라이 힌지 - Dk-B-6070	\N	\N	/images/B-Hinge/	24	3	t	t	2025-06-10 02:59:34.055	2025-06-10 02:59:34.055
36	\N	B-1032	B-1032	기타 힌지 - B-1032	\N	\N	/images/B-Hinge/	25	0	t	t	2025-06-10 02:59:34.057	2025-06-10 02:59:34.057
37	\N	B-1038	B-1038	기타 힌지 - B-1038	\N	\N	/images/B-Hinge/	25	1	t	t	2025-06-10 02:59:34.057	2025-06-10 02:59:34.057
38	\N	B-1050-1	B-1050-1	기타 힌지 - B-1050-1	\N	\N	/images/B-Hinge/	25	2	t	t	2025-06-10 02:59:34.058	2025-06-10 02:59:34.058
39	\N	B-1225S	B-1225S	기타 힌지 - B-1225S	\N	\N	/images/B-Hinge/	25	3	t	t	2025-06-10 02:59:34.058	2025-06-10 02:59:34.058
40	\N	B-1240	B-1240	기타 힌지 - B-1240	\N	\N	/images/B-Hinge/	25	4	t	t	2025-06-10 02:59:34.059	2025-06-10 02:59:34.059
41	\N	B-1538LH_무	B-1538LH_무	플래그 힌지 - B-1538LH_무	\N	\N	/images/B-Hinge/	26	0	t	t	2025-06-10 02:59:34.06	2025-06-10 02:59:34.06
42	\N	B-1538LH_유	B-1538LH_유	플래그 힌지 - B-1538LH_유	\N	\N	/images/B-Hinge/	26	1	t	t	2025-06-10 02:59:34.06	2025-06-10 02:59:34.06
43	\N	B-1538RH	B-1538RH	플래그 힌지 - B-1538RH	\N	\N	/images/B-Hinge/	26	2	t	t	2025-06-10 02:59:34.061	2025-06-10 02:59:34.061
44	\N	B-1538RH_무	B-1538RH_무	플래그 힌지 - B-1538RH_무	\N	\N	/images/B-Hinge/	26	3	t	t	2025-06-10 02:59:34.062	2025-06-10 02:59:34.062
45	\N	B-2048LH_유	B-2048LH_유	플래그 힌지 - B-2048LH_유	\N	\N	/images/B-Hinge/	26	4	t	t	2025-06-10 02:59:34.063	2025-06-10 02:59:34.063
46	\N	B-130-2	B-130-2	사이드 힌지 - B-130-2	\N	\N	/images/B-Hinge/	27	0	t	t	2025-06-10 02:59:34.065	2025-06-10 02:59:34.065
47	\N	B-130-6	B-130-6	사이드 힌지 - B-130-6	\N	\N	/images/B-Hinge/	27	1	t	t	2025-06-10 02:59:34.065	2025-06-10 02:59:34.065
48	\N	B-3100	B-3100	스탬핑 힌지 - B-3100	\N	\N	/images/B-Hinge/	28	0	t	t	2025-06-10 02:59:34.066	2025-06-10 02:59:34.066
49	\N	B-50	B-50	스탬핑 힌지 - B-50	\N	\N	/images/B-Hinge/	28	1	t	t	2025-06-10 02:59:34.066	2025-06-10 02:59:34.066
50	\N	B-55	B-55	스탬핑 힌지 - B-55	\N	\N	/images/B-Hinge/	28	2	t	t	2025-06-10 02:59:34.067	2025-06-10 02:59:34.067
51	\N	B-60	B-60	스탬핑 힌지 - B-60	\N	\N	/images/B-Hinge/	28	3	t	t	2025-06-10 02:59:34.068	2025-06-10 02:59:34.068
52	\N	B-7255	B-7255	스탬핑 힌지 - B-7255	\N	\N	/images/B-Hinge/	28	4	t	t	2025-06-10 02:59:34.068	2025-06-10 02:59:34.068
53	\N	B-80	B-80	스탬핑 힌지 - B-80	\N	\N	/images/B-Hinge/	28	5	t	t	2025-06-10 02:59:34.069	2025-06-10 02:59:34.069
54	\N	B-81	B-81	스탬핑 힌지 - B-81	\N	\N	/images/B-Hinge/	28	6	t	t	2025-06-10 02:59:34.069	2025-06-10 02:59:34.069
55	\N	B-82	B-82	스탬핑 힌지 - B-82	\N	\N	/images/B-Hinge/	28	7	t	t	2025-06-10 02:59:34.07	2025-06-10 02:59:34.07
56	\N	B-TJ260	B-TJ260	스탬핑 힌지 - B-TJ260	\N	\N	/images/B-Hinge/	28	8	t	t	2025-06-10 02:59:34.07	2025-06-10 02:59:34.07
57	\N	DK-B-910	DK-B-910	스탬핑 힌지 - DK-B-910	\N	\N	/images/B-Hinge/	28	9	t	t	2025-06-10 02:59:34.071	2025-06-10 02:59:34.071
58	\N	Dk-B-900	Dk-B-900	스탬핑 힌지 - Dk-B-900	\N	\N	/images/B-Hinge/	28	10	t	t	2025-06-10 02:59:34.071	2025-06-10 02:59:34.071
59	\N	B-100	B-100	웰딩 힌지 - B-100	\N	\N	/images/B-Hinge/	29	0	t	t	2025-06-10 02:59:34.072	2025-06-10 02:59:34.072
60	\N	B-101	B-101	웰딩 힌지 - B-101	\N	\N	/images/B-Hinge/	29	1	t	t	2025-06-10 02:59:34.073	2025-06-10 02:59:34.073
61	\N	B-103	B-103	웰딩 힌지 - B-103	\N	\N	/images/B-Hinge/	29	2	t	t	2025-06-10 02:59:34.074	2025-06-10 02:59:34.074
62	\N	B-104	B-104	웰딩 힌지 - B-104	\N	\N	/images/B-Hinge/	29	3	t	t	2025-06-10 02:59:34.074	2025-06-10 02:59:34.074
63	\N	B-105-양	B-105-양	웰딩 힌지 - B-105-양	\N	\N	/images/B-Hinge/	29	4	t	t	2025-06-10 02:59:34.074	2025-06-10 02:59:34.074
64	\N	B-130-12	B-130-12	웰딩 힌지 - B-130-12	\N	\N	/images/B-Hinge/	29	5	t	t	2025-06-10 02:59:34.075	2025-06-10 02:59:34.075
65	\N	B-400	B-400	웰딩 힌지 - B-400	\N	\N	/images/B-Hinge/	29	6	t	t	2025-06-10 02:59:34.075	2025-06-10 02:59:34.075
66	\N	B-420	B-420	웰딩 힌지 - B-420	\N	\N	/images/B-Hinge/	29	7	t	t	2025-06-10 02:59:34.076	2025-06-10 02:59:34.076
67	\N	B-430	B-430	웰딩 힌지 - B-430	\N	\N	/images/B-Hinge/	29	8	t	t	2025-06-10 02:59:34.076	2025-06-10 02:59:34.076
68	\N	DK-B-3400	DK-B-3400	웰딩 힌지 - DK-B-3400	\N	\N	/images/B-Hinge/	29	9	t	t	2025-06-10 02:59:34.077	2025-06-10 02:59:34.077
69	\N	C-026	C-026	캐치 클립 - C-026	\N	\N	/images/C-Clip & Latch/	31	0	t	t	2025-06-10 02:59:34.078	2025-06-10 02:59:34.078
70	\N	C-033SL	C-033SL	캐치 클립 - C-033SL	\N	\N	/images/C-Clip & Latch/	31	1	t	t	2025-06-10 02:59:34.079	2025-06-10 02:59:34.079
71	\N	C-100	C-100	캐치 클립 - C-100	\N	\N	/images/C-Clip & Latch/	31	2	t	t	2025-06-10 02:59:34.079	2025-06-10 02:59:34.079
72	\N	C-104	C-104	캐치 클립 - C-104	\N	\N	/images/C-Clip & Latch/	31	3	t	t	2025-06-10 02:59:34.08	2025-06-10 02:59:34.08
73	\N	C-139	C-139	래치 - C-139	\N	\N	/images/C-Clip & Latch/	32	0	t	t	2025-06-10 02:59:34.081	2025-06-10 02:59:34.081
74	\N	C-280-2	C-280-2	래치 - C-280-2	\N	\N	/images/C-Clip & Latch/	32	1	t	t	2025-06-10 02:59:34.081	2025-06-10 02:59:34.081
75	\N	C-7150	C-7150	래치 - C-7150	\N	\N	/images/C-Clip & Latch/	32	2	t	t	2025-06-10 02:59:34.082	2025-06-10 02:59:34.082
76	\N	C-7151	C-7151	래치 - C-7151	\N	\N	/images/C-Clip & Latch/	32	3	t	t	2025-06-10 02:59:34.082	2025-06-10 02:59:34.082
77	\N	C-7152	C-7152	래치 - C-7152	\N	\N	/images/C-Clip & Latch/	32	4	t	t	2025-06-10 02:59:34.082	2025-06-10 02:59:34.082
78	\N	C-1001	C-1001	마그네틱 캐처 - C-1001	\N	\N	/images/C-Clip & Latch/	33	0	t	t	2025-06-10 02:59:34.083	2025-06-10 02:59:34.083
79	\N	C-1002	C-1002	마그네틱 캐처 - C-1002	\N	\N	/images/C-Clip & Latch/	33	1	t	t	2025-06-10 02:59:34.084	2025-06-10 02:59:34.084
80	\N	C-2001	C-2001	마그네틱 캐처 - C-2001	\N	\N	/images/C-Clip & Latch/	33	2	t	t	2025-06-10 02:59:34.085	2025-06-10 02:59:34.085
81	\N	C-016-41(S)	C-016-41(S)	토글 클램프 - C-016-41(S)	\N	\N	/images/C-Clip & Latch/	34	0	t	t	2025-06-10 02:59:34.086	2025-06-10 02:59:34.086
82	\N	C-016-41	C-016-41	토글 클램프 - C-016-41	\N	\N	/images/C-Clip & Latch/	34	1	t	t	2025-06-10 02:59:34.086	2025-06-10 02:59:34.086
83	\N	E-1216	E-1216	전기 자재 - E-1216	\N	\N	/images/E-Electrical materials/	36	0	t	t	2025-06-10 02:59:34.088	2025-06-10 02:59:34.088
84	\N	E-200	E-200	전기 자재 - E-200	\N	\N	/images/E-Electrical materials/	36	1	t	t	2025-06-10 02:59:34.088	2025-06-10 02:59:34.088
85	\N	P-102	P-102	전기 자재 - P-102	\N	\N	/images/E-Electrical materials/	36	2	t	t	2025-06-10 02:59:34.089	2025-06-10 02:59:34.089
86	\N	G-030	G-030	그로밋 패킹 - G-030	\N	\N	/images/G-Rubber & Seals/	38	0	t	t	2025-06-10 02:59:34.09	2025-06-10 02:59:34.09
87	\N	G-060	G-060	그로밋 패킹 - G-060	\N	\N	/images/G-Rubber & Seals/	38	1	t	t	2025-06-10 02:59:34.09	2025-06-10 02:59:34.09
88	\N	G-0603	G-0603	그로밋 패킹 - G-0603	\N	\N	/images/G-Rubber & Seals/	38	2	t	t	2025-06-10 02:59:34.091	2025-06-10 02:59:34.091
89	\N	G-1T-1	G-1T-1	그로밋 패킹 - G-1T-1	\N	\N	/images/G-Rubber & Seals/	38	3	t	t	2025-06-10 02:59:34.091	2025-06-10 02:59:34.091
90	\N	G-1T-2	G-1T-2	그로밋 패킹 - G-1T-2	\N	\N	/images/G-Rubber & Seals/	38	4	t	t	2025-06-10 02:59:34.092	2025-06-10 02:59:34.092
91	\N	MDSI-G-1T2	MDSI-G-1T2	그로밋 패킹 - MDSI-G-1T2	\N	\N	/images/G-Rubber & Seals/	38	5	t	t	2025-06-10 02:59:34.092	2025-06-10 02:59:34.092
92	\N	MDSI-G-1T3	MDSI-G-1T3	그로밋 패킹 - MDSI-G-1T3	\N	\N	/images/G-Rubber & Seals/	38	6	t	t	2025-06-10 02:59:34.093	2025-06-10 02:59:34.093
93	\N	G-020	G-020	홀 패킹 - G-020	\N	\N	/images/G-Rubber & Seals/	39	0	t	t	2025-06-10 02:59:34.094	2025-06-10 02:59:34.094
94	\N	G-0202	G-0202	홀 패킹 - G-0202	\N	\N	/images/G-Rubber & Seals/	39	1	t	t	2025-06-10 02:59:34.094	2025-06-10 02:59:34.094
95	\N	G-050	G-050	홀 패킹 - G-050	\N	\N	/images/G-Rubber & Seals/	39	2	t	t	2025-06-10 02:59:34.095	2025-06-10 02:59:34.095
96	\N	G-025	G-025	고무 씰 - G-025	\N	\N	/images/G-Rubber & Seals/	40	0	t	t	2025-06-10 02:59:34.096	2025-06-10 02:59:34.096
97	\N	G-026	G-026	고무 씰 - G-026	\N	\N	/images/G-Rubber & Seals/	40	1	t	t	2025-06-10 02:59:34.096	2025-06-10 02:59:34.096
98	\N	G-027	G-027	고무 씰 - G-027	\N	\N	/images/G-Rubber & Seals/	40	2	t	t	2025-06-10 02:59:34.097	2025-06-10 02:59:34.097
99	\N	G-028-1,029-1	G-028-1,029-1	고무 씰 - G-028-1,029-1	\N	\N	/images/G-Rubber & Seals/	40	3	t	t	2025-06-10 02:59:34.098	2025-06-10 02:59:34.098
100	\N	G-028-1	G-028-1	고무 씰 - G-028-1	\N	\N	/images/G-Rubber & Seals/	40	4	t	t	2025-06-10 02:59:34.098	2025-06-10 02:59:34.098
101	\N	G-028	G-028	고무 씰 - G-028	\N	\N	/images/G-Rubber & Seals/	40	5	t	t	2025-06-10 02:59:34.099	2025-06-10 02:59:34.099
102	\N	G-029-1	G-029-1	고무 씰 - G-029-1	\N	\N	/images/G-Rubber & Seals/	40	6	t	t	2025-06-10 02:59:34.099	2025-06-10 02:59:34.099
103	\N	G-029-2	G-029-2	고무 씰 - G-029-2	\N	\N	/images/G-Rubber & Seals/	40	7	t	t	2025-06-10 02:59:34.1	2025-06-10 02:59:34.1
104	\N	G-029	G-029	고무 씰 - G-029	\N	\N	/images/G-Rubber & Seals/	40	8	t	t	2025-06-10 02:59:34.1	2025-06-10 02:59:34.1
105	\N	G-030,031	G-030,031	고무 씰 - G-030,031	\N	\N	/images/G-Rubber & Seals/	40	9	t	t	2025-06-10 02:59:34.101	2025-06-10 02:59:34.101
106	\N	G-024	G-024	기타 패킹 - G-024	\N	\N	/images/G-Rubber & Seals/	41	0	t	t	2025-06-10 02:59:34.102	2025-06-10 02:59:34.102
107	\N	MDSI-G-22T-1	MDSI-G-22T-1	기타 패킹 - MDSI-G-22T-1	\N	\N	/images/G-Rubber & Seals/	41	1	t	t	2025-06-10 02:59:34.102	2025-06-10 02:59:34.102
108	\N	MDSI-G-22T	MDSI-G-22T	기타 패킹 - MDSI-G-22T	\N	\N	/images/G-Rubber & Seals/	41	2	t	t	2025-06-10 02:59:34.103	2025-06-10 02:59:34.103
109	\N	G-010	G-010	플레인 패킹 - G-010	\N	\N	/images/G-Rubber & Seals/	42	0	t	t	2025-06-10 02:59:34.104	2025-06-10 02:59:34.104
110	\N	G-011	G-011	플레인 패킹 - G-011	\N	\N	/images/G-Rubber & Seals/	42	1	t	t	2025-06-10 02:59:34.104	2025-06-10 02:59:34.104
111	\N	G-040-1	G-040-1	플레인 패킹 - G-040-1	\N	\N	/images/G-Rubber & Seals/	42	2	t	t	2025-06-10 02:59:34.105	2025-06-10 02:59:34.105
112	\N	G-040	G-040	플레인 패킹 - G-040	\N	\N	/images/G-Rubber & Seals/	42	3	t	t	2025-06-10 02:59:34.105	2025-06-10 02:59:34.105
113	\N	H-1005	H-1005	케이스 핸들 - H-1005	\N	\N	/images/H-Handle & Grip/	44	0	t	t	2025-06-10 02:59:34.107	2025-06-10 02:59:34.107
114	\N	H-1006-1	H-1006-1	케이스 핸들 - H-1006-1	\N	\N	/images/H-Handle & Grip/	44	1	t	t	2025-06-10 02:59:34.107	2025-06-10 02:59:34.107
115	\N	H-1007S-1	H-1007S-1	케이스 핸들 - H-1007S-1	\N	\N	/images/H-Handle & Grip/	44	2	t	t	2025-06-10 02:59:34.108	2025-06-10 02:59:34.108
116	\N	H-350-1	H-350-1	케이스 핸들 - H-350-1	\N	\N	/images/H-Handle & Grip/	44	3	t	t	2025-06-10 02:59:34.108	2025-06-10 02:59:34.108
117	\N	H-360-1	H-360-1	케이스 핸들 - H-360-1	\N	\N	/images/H-Handle & Grip/	44	4	t	t	2025-06-10 02:59:34.109	2025-06-10 02:59:34.109
118	\N	H-370-1	H-370-1	케이스 핸들 - H-370-1	\N	\N	/images/H-Handle & Grip/	44	5	t	t	2025-06-10 02:59:34.109	2025-06-10 02:59:34.109
119	\N	H-717	H-717	케이스 핸들 - H-717	\N	\N	/images/H-Handle & Grip/	44	6	t	t	2025-06-10 02:59:34.11	2025-06-10 02:59:34.11
120	\N	MDSI-C-3T	MDSI-C-3T	케이스 핸들 - MDSI-C-3T	\N	\N	/images/H-Handle & Grip/	44	7	t	t	2025-06-10 02:59:34.11	2025-06-10 02:59:34.11
121	\N	DK-H-285	DK-H-285	인서트 핸들 - DK-H-285	\N	\N	/images/H-Handle & Grip/	45	0	t	t	2025-06-10 02:59:34.111	2025-06-10 02:59:34.111
122	\N	H-141	H-141	인서트 핸들 - H-141	\N	\N	/images/H-Handle & Grip/	45	1	t	t	2025-06-10 02:59:34.112	2025-06-10 02:59:34.112
123	\N	H-142	H-142	인서트 핸들 - H-142	\N	\N	/images/H-Handle & Grip/	45	2	t	t	2025-06-10 02:59:34.112	2025-06-10 02:59:34.112
124	\N	H-142M	H-142M	인서트 핸들 - H-142M	\N	\N	/images/H-Handle & Grip/	45	3	t	t	2025-06-10 02:59:34.113	2025-06-10 02:59:34.113
125	\N	H-143	H-143	인서트 핸들 - H-143	\N	\N	/images/H-Handle & Grip/	45	4	t	t	2025-06-10 02:59:34.114	2025-06-10 02:59:34.114
126	\N	H-143M	H-143M	인서트 핸들 - H-143M	\N	\N	/images/H-Handle & Grip/	45	5	t	t	2025-06-10 02:59:34.114	2025-06-10 02:59:34.114
127	\N	H-145	H-145	인서트 핸들 - H-145	\N	\N	/images/H-Handle & Grip/	45	6	t	t	2025-06-10 02:59:34.115	2025-06-10 02:59:34.115
128	\N	H-283	H-283	인서트 핸들 - H-283	\N	\N	/images/H-Handle & Grip/	45	7	t	t	2025-06-10 02:59:34.115	2025-06-10 02:59:34.115
129	\N	H-306	H-306	인서트 핸들 - H-306	\N	\N	/images/H-Handle & Grip/	45	8	t	t	2025-06-10 02:59:34.116	2025-06-10 02:59:34.116
130	\N	H-307	H-307	인서트 핸들 - H-307	\N	\N	/images/H-Handle & Grip/	45	9	t	t	2025-06-10 02:59:34.116	2025-06-10 02:59:34.116
131	\N	H-360	H-360	기타 - H-360	\N	\N	/images/H-Handle & Grip/	46	0	t	t	2025-06-10 02:59:34.117	2025-06-10 02:59:34.117
132	\N	H-370	H-370	기타 - H-370	\N	\N	/images/H-Handle & Grip/	46	1	t	t	2025-06-10 02:59:34.118	2025-06-10 02:59:34.118
133	\N	H-431	H-431	기타 - H-431	\N	\N	/images/H-Handle & Grip/	46	2	t	t	2025-06-10 02:59:34.118	2025-06-10 02:59:34.118
134	\N	H-450	H-450	기타 - H-450	\N	\N	/images/H-Handle & Grip/	46	3	t	t	2025-06-10 02:59:34.118	2025-06-10 02:59:34.118
135	\N	H-452	H-452	기타 - H-452	\N	\N	/images/H-Handle & Grip/	46	4	t	t	2025-06-10 02:59:34.119	2025-06-10 02:59:34.119
136	\N	H-80T	H-80T	기타 - H-80T	\N	\N	/images/H-Handle & Grip/	46	5	t	t	2025-06-10 02:59:34.121	2025-06-10 02:59:34.121
137	\N	H-8T	H-8T	기타 - H-8T	\N	\N	/images/H-Handle & Grip/	46	6	t	t	2025-06-10 02:59:34.121	2025-06-10 02:59:34.121
138	\N	MDSI-D-90T4	MDSI-D-90T4	기타 - MDSI-D-90T4	\N	\N	/images/H-Handle & Grip/	46	7	t	t	2025-06-10 02:59:34.122	2025-06-10 02:59:34.122
139	\N	MDSI-D-9T1	MDSI-D-9T1	기타 - MDSI-D-9T1	\N	\N	/images/H-Handle & Grip/	46	8	t	t	2025-06-10 02:59:34.122	2025-06-10 02:59:34.122
140	\N	MDSI-D-9T2	MDSI-D-9T2	기타 - MDSI-D-9T2	\N	\N	/images/H-Handle & Grip/	46	9	t	t	2025-06-10 02:59:34.123	2025-06-10 02:59:34.123
141	\N	MDSI-D-9T3	MDSI-D-9T3	기타 - MDSI-D-9T3	\N	\N	/images/H-Handle & Grip/	46	10	t	t	2025-06-10 02:59:34.123	2025-06-10 02:59:34.123
142	\N	H-100P-1	H-100P-1	PVC 핸들 - H-100P-1	\N	\N	/images/H-Handle & Grip/	47	0	t	t	2025-06-10 02:59:34.124	2025-06-10 02:59:34.124
143	\N	H-100S	H-100S	PVC 핸들 - H-100S	\N	\N	/images/H-Handle & Grip/	47	1	t	t	2025-06-10 02:59:34.125	2025-06-10 02:59:34.125
144	\N	H-150P-2	H-150P-2	PVC 핸들 - H-150P-2	\N	\N	/images/H-Handle & Grip/	47	2	t	t	2025-06-10 02:59:34.125	2025-06-10 02:59:34.125
145	\N	H-150P	H-150P	PVC 핸들 - H-150P	\N	\N	/images/H-Handle & Grip/	47	3	t	t	2025-06-10 02:59:34.126	2025-06-10 02:59:34.126
146	\N	H-250P	H-250P	PVC 핸들 - H-250P	\N	\N	/images/H-Handle & Grip/	47	4	t	t	2025-06-10 02:59:34.127	2025-06-10 02:59:34.127
147	\N	H-2T	H-2T	PVC 핸들 - H-2T	\N	\N	/images/H-Handle & Grip/	47	5	t	t	2025-06-10 02:59:34.127	2025-06-10 02:59:34.127
148	\N	H-75P	H-75P	PVC 핸들 - H-75P	\N	\N	/images/H-Handle & Grip/	47	6	t	t	2025-06-10 02:59:34.127	2025-06-10 02:59:34.127
149	\N	H-10100S	H-10100S	풀 핸들 - H-10100S	\N	\N	/images/H-Handle & Grip/	48	0	t	t	2025-06-10 02:59:34.129	2025-06-10 02:59:34.129
150	\N	H-610	H-610	풀 핸들 - H-610	\N	\N	/images/H-Handle & Grip/	48	1	t	t	2025-06-10 02:59:34.129	2025-06-10 02:59:34.129
151	\N	H-620	H-620	풀 핸들 - H-620	\N	\N	/images/H-Handle & Grip/	48	2	t	t	2025-06-10 02:59:34.13	2025-06-10 02:59:34.13
152	\N	MDSI-C-4T	MDSI-C-4T	풀 핸들 - MDSI-C-4T	\N	\N	/images/H-Handle & Grip/	48	3	t	t	2025-06-10 02:59:34.13	2025-06-10 02:59:34.13
153	\N	P-3040	P-3040	그립 & 노브 - P-3040	\N	\N	/images/H-Handle & Grip/	49	0	t	t	2025-06-10 02:59:34.131	2025-06-10 02:59:34.131
154	\N	P-3050P	P-3050P	그립 & 노브 - P-3050P	\N	\N	/images/H-Handle & Grip/	49	1	t	t	2025-06-10 02:59:34.132	2025-06-10 02:59:34.132
155	\N	P-3090	P-3090	그립 & 노브 - P-3090	\N	\N	/images/H-Handle & Grip/	49	2	t	t	2025-06-10 02:59:34.132	2025-06-10 02:59:34.132
156	\N	P-6080	P-6080	그립 & 노브 - P-6080	\N	\N	/images/H-Handle & Grip/	49	3	t	t	2025-06-10 02:59:34.133	2025-06-10 02:59:34.133
157	\N	P-6080수정사진	P-6080수정사진	그립 & 노브 - P-6080수정사진	\N	\N	/images/H-Handle & Grip/	49	4	t	t	2025-06-10 02:59:34.133	2025-06-10 02:59:34.133
158	\N	B-2T, 3T	B-2T, 3T	해양 부품 - B-2T, 3T	\N	\N	/images/M-Marine part/	51	0	t	t	2025-06-10 02:59:34.134	2025-06-10 02:59:34.134
159	\N	B-4T,5T	B-4T,5T	해양 부품 - B-4T,5T	\N	\N	/images/M-Marine part/	51	1	t	t	2025-06-10 02:59:34.135	2025-06-10 02:59:34.135
160	\N	B-7T	B-7T	해양 부품 - B-7T	\N	\N	/images/M-Marine part/	51	2	t	t	2025-06-10 02:59:34.135	2025-06-10 02:59:34.135
161	\N	B-8T	B-8T	해양 부품 - B-8T	\N	\N	/images/M-Marine part/	51	3	t	t	2025-06-10 02:59:34.136	2025-06-10 02:59:34.136
162	\N	B-9T,10T	B-9T,10T	해양 부품 - B-9T,10T	\N	\N	/images/M-Marine part/	51	4	t	t	2025-06-10 02:59:34.136	2025-06-10 02:59:34.136
163	\N	P-1400	P-1400	정밀 부품 - P-1400	\N	\N	/images/P-Precision part/	53	0	t	t	2025-06-10 02:59:34.138	2025-06-10 02:59:34.138
164	\N	P-1500	P-1500	정밀 부품 - P-1500	\N	\N	/images/P-Precision part/	53	1	t	t	2025-06-10 02:59:34.138	2025-06-10 02:59:34.138
165	\N	P-1550	P-1550	정밀 부품 - P-1550	\N	\N	/images/P-Precision part/	53	2	t	t	2025-06-10 02:59:34.139	2025-06-10 02:59:34.139
166	\N	P-1620	P-1620	정밀 부품 - P-1620	\N	\N	/images/P-Precision part/	53	3	t	t	2025-06-10 02:59:34.14	2025-06-10 02:59:34.14
167	\N	S-365B-1사진수정	S-365B-1사진수정	가스 스프링 - S-365B-1사진수정	\N	\N	/images/S-Stay & Sliderail/	55	0	t	t	2025-06-10 02:59:34.142	2025-06-10 02:59:34.142
168	\N	S-365사진수정	S-365사진수정	가스 스프링 - S-365사진수정	\N	\N	/images/S-Stay & Sliderail/	55	1	t	t	2025-06-10 02:59:34.142	2025-06-10 02:59:34.142
169	\N	S-460-2	S-460-2	가스 스프링 - S-460-2	\N	\N	/images/S-Stay & Sliderail/	55	2	t	t	2025-06-10 02:59:34.143	2025-06-10 02:59:34.143
170	\N	C-3521	C-3521	슬라이드 레일 - C-3521	\N	\N	/images/S-Stay & Sliderail/	56	0	t	t	2025-06-10 02:59:34.143	2025-06-10 02:59:34.143
171	\N	C-3531	C-3531	슬라이드 레일 - C-3531	\N	\N	/images/S-Stay & Sliderail/	56	1	t	t	2025-06-10 02:59:34.144	2025-06-10 02:59:34.144
172	\N	S-137-1,2,3	S-137-1,2,3	스테이 - S-137-1,2,3	\N	\N	/images/S-Stay & Sliderail/	57	0	t	t	2025-06-10 02:59:34.145	2025-06-10 02:59:34.145
173	\N	S-137-123	S-137-123	스테이 - S-137-123	\N	\N	/images/S-Stay & Sliderail/	57	1	t	t	2025-06-10 02:59:34.145	2025-06-10 02:59:34.145
174	\N	S-1453	S-1453	스테이 - S-1453	\N	\N	/images/S-Stay & Sliderail/	57	2	t	t	2025-06-10 02:59:34.146	2025-06-10 02:59:34.146
175	\N	S-1454	S-1454	스테이 - S-1454	\N	\N	/images/S-Stay & Sliderail/	57	3	t	t	2025-06-10 02:59:34.146	2025-06-10 02:59:34.146
176	\N	S-1454사진수정	S-1454사진수정	스테이 - S-1454사진수정	\N	\N	/images/S-Stay & Sliderail/	57	4	t	t	2025-06-10 02:59:34.147	2025-06-10 02:59:34.147
177	\N	S-7T-2	S-7T-2	스테이 - S-7T-2	\N	\N	/images/S-Stay & Sliderail/	57	5	t	t	2025-06-10 02:59:34.147	2025-06-10 02:59:34.147
\.


--
-- Data for Name: ProductCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") FROM stdin;
13	A	Handlelocker & Fasterner	핸들로커 및 패스너	핸들로커, 패스너 관련 하드웨어	1	\N	0	t	2025-06-10 02:59:34.025	2025-06-10 02:59:34.025
14	A-1	Airtightness	기밀성	핸들로커 및 패스너 - 기밀성	2	13	0	t	2025-06-10 02:59:34.026	2025-06-10 02:59:34.026
15	A-2	Cylinder lock & camlock	실린더 락 & 캠 락	핸들로커 및 패스너 - 실린더 락 & 캠 락	2	13	1	t	2025-06-10 02:59:34.027	2025-06-10 02:59:34.027
16	A-3	Fasterner	패스너	핸들로커 및 패스너 - 패스너	2	13	2	t	2025-06-10 02:59:34.028	2025-06-10 02:59:34.028
17	A-4	Flat lock	플랫 락	핸들로커 및 패스너 - 플랫 락	2	13	3	t	2025-06-10 02:59:34.03	2025-06-10 02:59:34.03
18	A-5	Handle latch	핸들 래치	핸들로커 및 패스너 - 핸들 래치	2	13	4	t	2025-06-10 02:59:34.036	2025-06-10 02:59:34.036
19	A-6	Handle lock	핸들 락	핸들로커 및 패스너 - 핸들 락	2	13	5	t	2025-06-10 02:59:34.038	2025-06-10 02:59:34.038
20	A-7	Lock accessory	락 액세서리	핸들로커 및 패스너 - 락 액세서리	2	13	6	t	2025-06-10 02:59:34.041	2025-06-10 02:59:34.041
21	A-8	Plane lock	플레인 락	핸들로커 및 패스너 - 플레인 락	2	13	7	t	2025-06-10 02:59:34.046	2025-06-10 02:59:34.046
22	A-9	Rod control lock	로드 컨트롤 락	핸들로커 및 패스너 - 로드 컨트롤 락	2	13	8	t	2025-06-10 02:59:34.05	2025-06-10 02:59:34.05
23	B	Hinge	힌지	각종 힌지 제품	1	\N	1	t	2025-06-10 02:59:34.053	2025-06-10 02:59:34.053
24	B-1	Butterfly hinge	버터플라이 힌지	힌지 - 버터플라이 힌지	2	23	0	t	2025-06-10 02:59:34.053	2025-06-10 02:59:34.053
25	B-2	Other hinge	기타 힌지	힌지 - 기타 힌지	2	23	1	t	2025-06-10 02:59:34.056	2025-06-10 02:59:34.056
26	B-3	Plage hinge	플래그 힌지	힌지 - 플래그 힌지	2	23	2	t	2025-06-10 02:59:34.059	2025-06-10 02:59:34.059
27	B-4	Side hinge	사이드 힌지	힌지 - 사이드 힌지	2	23	3	t	2025-06-10 02:59:34.063	2025-06-10 02:59:34.063
28	B-5	Stamping hinge	스탬핑 힌지	힌지 - 스탬핑 힌지	2	23	4	t	2025-06-10 02:59:34.066	2025-06-10 02:59:34.066
29	B-6	Welding hinge	웰딩 힌지	힌지 - 웰딩 힌지	2	23	5	t	2025-06-10 02:59:34.072	2025-06-10 02:59:34.072
30	C	Clip & Latch	클립 & 래치	클립 및 래치 제품	1	\N	2	t	2025-06-10 02:59:34.077	2025-06-10 02:59:34.077
31	C-1	Catch clip	캐치 클립	클립 & 래치 - 캐치 클립	2	30	0	t	2025-06-10 02:59:34.078	2025-06-10 02:59:34.078
32	C-2	Latch	래치	클립 & 래치 - 래치	2	30	1	t	2025-06-10 02:59:34.08	2025-06-10 02:59:34.08
33	C-3	Magnetic catcher	마그네틱 캐처	클립 & 래치 - 마그네틱 캐처	2	30	2	t	2025-06-10 02:59:34.083	2025-06-10 02:59:34.083
34	C-4	toggle clamp	토글 클램프	클립 & 래치 - 토글 클램프	2	30	3	t	2025-06-10 02:59:34.085	2025-06-10 02:59:34.085
35	E	Electrical materials	전기 자재	전기 관련 자재	1	\N	4	t	2025-06-10 02:59:34.087	2025-06-10 02:59:34.087
36	E-1	Electrical materials	전기 자재	전기 자재 - 전기 자재	2	35	0	t	2025-06-10 02:59:34.087	2025-06-10 02:59:34.087
37	G	Rubber & Seals	고무 & 씰	고무 및 씰 제품	1	\N	6	t	2025-06-10 02:59:34.089	2025-06-10 02:59:34.089
38	G-1	Grommet packing	그로밋 패킹	고무 & 씰 - 그로밋 패킹	2	37	0	t	2025-06-10 02:59:34.09	2025-06-10 02:59:34.09
39	G-2	Hole packing	홀 패킹	고무 & 씰 - 홀 패킹	2	37	1	t	2025-06-10 02:59:34.093	2025-06-10 02:59:34.093
40	G-3	Rubber seals	고무 씰	고무 & 씰 - 고무 씰	2	37	2	t	2025-06-10 02:59:34.095	2025-06-10 02:59:34.095
41	G-4	other packing	기타 패킹	고무 & 씰 - 기타 패킹	2	37	3	t	2025-06-10 02:59:34.101	2025-06-10 02:59:34.101
42	G-5	plane packing	플레인 패킹	고무 & 씰 - 플레인 패킹	2	37	4	t	2025-06-10 02:59:34.103	2025-06-10 02:59:34.103
43	H	Handle & Grip	핸들 & 그립	핸들 및 그립 제품	1	\N	7	t	2025-06-10 02:59:34.106	2025-06-10 02:59:34.106
44	H-1	Case handle	케이스 핸들	핸들 & 그립 - 케이스 핸들	2	43	0	t	2025-06-10 02:59:34.106	2025-06-10 02:59:34.106
45	H-2	Insert handle	인서트 핸들	핸들 & 그립 - 인서트 핸들	2	43	1	t	2025-06-10 02:59:34.111	2025-06-10 02:59:34.111
46	H-3	Other	기타	핸들 & 그립 - 기타	2	43	2	t	2025-06-10 02:59:34.117	2025-06-10 02:59:34.117
47	H-4	PVC handle	PVC 핸들	핸들 & 그립 - PVC 핸들	2	43	3	t	2025-06-10 02:59:34.124	2025-06-10 02:59:34.124
48	H-5	Pull handle	풀 핸들	핸들 & 그립 - 풀 핸들	2	43	4	t	2025-06-10 02:59:34.128	2025-06-10 02:59:34.128
49	H-6	grip & knob	그립 & 노브	핸들 & 그립 - 그립 & 노브	2	43	5	t	2025-06-10 02:59:34.131	2025-06-10 02:59:34.131
50	M	Marine part	해양 부품	해양 관련 부품	1	\N	12	t	2025-06-10 02:59:34.133	2025-06-10 02:59:34.133
51	M-1	Marine part	해양 부품	해양 부품 - 해양 부품	2	50	0	t	2025-06-10 02:59:34.134	2025-06-10 02:59:34.134
52	P	Precision part	정밀 부품	정밀 가공 부품	1	\N	15	t	2025-06-10 02:59:34.137	2025-06-10 02:59:34.137
53	P-1	Precision part	정밀 부품	정밀 부품 - 정밀 부품	2	52	0	t	2025-06-10 02:59:34.137	2025-06-10 02:59:34.137
54	S	Stay & Sliderail	스테이 & 슬라이드레일	스테이 및 슬라이드레일 제품	1	\N	18	t	2025-06-10 02:59:34.141	2025-06-10 02:59:34.141
55	S-1	Gas spring	가스 스프링	스테이 & 슬라이드레일 - 가스 스프링	2	54	0	t	2025-06-10 02:59:34.141	2025-06-10 02:59:34.141
56	S-2	Slide rail	슬라이드 레일	스테이 & 슬라이드레일 - 슬라이드 레일	2	54	1	t	2025-06-10 02:59:34.143	2025-06-10 02:59:34.143
57	S-3	Stay	스테이	스테이 & 슬라이드레일 - 스테이	2	54	2	t	2025-06-10 02:59:34.144	2025-06-10 02:59:34.144
\.


--
-- Data for Name: ProductImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ProductImage" (id, "productId", url, alt, "orderIndex", "createdAt") FROM stdin;
\.


--
-- Data for Name: SiteConfig; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") FROM stdin;
1	site_name	대경하드웨어	사이트 이름	2025-06-10 02:59:22.953	2025-06-10 02:59:22.953
2	site_description	하드웨어 소재 전문기업	사이트 설명	2025-06-10 02:59:22.956	2025-06-10 02:59:22.956
3	contact_email	dkhw6789@naver.com	대표 이메일	2025-06-10 02:59:22.956	2025-06-10 02:59:22.956
4	contact_phone	055-333-6790~1	대표 전화번호	2025-06-10 02:59:22.957	2025-06-10 02:59:22.957
5	contact_address	경남 김해시 삼안로 112번길 9-14	회사 주소	2025-06-10 02:59:22.958	2025-06-10 02:59:22.958
6	siteName	대경하드웨어	사이트명	2025-06-10 02:59:28.035	2025-06-10 02:59:28.035
7	siteDescription	하드웨어 소재 전문기업	사이트 설명	2025-06-10 02:59:28.036	2025-06-10 02:59:28.036
8	contactEmail	dkhw6789@naver.com	연락처 이메일	2025-06-10 02:59:28.036	2025-06-10 02:59:28.036
9	contactPhone	055-333-6790~1	연락처 전화번호	2025-06-10 02:59:28.036	2025-06-10 02:59:28.036
10	contactAddress	경남 김해시 삼안로 112번길 9-14	회사 주소	2025-06-10 02:59:28.037	2025-06-10 02:59:28.037
11	heroType	slides	히어로 섹션 타입	2025-06-10 02:59:28.037	2025-06-10 02:59:28.037
12	heroVideoUrl		히어로 비디오 URL	2025-06-10 02:59:28.038	2025-06-10 02:59:28.038
13	heroVideoOverlay	10	히어로 비디오 오버레이	2025-06-10 02:59:28.038	2025-06-10 02:59:28.038
14	heroTitle	대한민국 대표 하드웨어 소재 전문기업	히어로 타이틀	2025-06-10 02:59:28.039	2025-06-10 02:59:28.039
15	heroSubtitle	대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.	히어로 서브타이틀	2025-06-10 02:59:28.039	2025-06-10 02:59:28.039
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, email, password, name, role, "createdAt", "updatedAt") FROM stdin;
1	admin@daekyung.com	$2b$10$tXpcw3qf0eiXsAS2dfj94us4Q2SUKzsOt7f1dpG.wyf7b57VkMuyy	관리자	admin	2025-06-10 02:59:22.937	2025-06-10 02:59:22.937
\.


--
-- Data for Name: VisitorStats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."VisitorStats" (id, date, visitors, "pageViews", "createdAt") FROM stdin;
\.


--
-- Name: Attachment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Attachment_id_seq"', 1, false);


--
-- Name: Banner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Banner_id_seq"', 1, false);


--
-- Name: BoardCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."BoardCategory_id_seq"', 4, true);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 1, false);


--
-- Name: GalleryCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."GalleryCategory_id_seq"', 3, true);


--
-- Name: Gallery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Gallery_id_seq"', 1, false);


--
-- Name: HeroSlide_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."HeroSlide_id_seq"', 1, false);


--
-- Name: Menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Menu_id_seq"', 21, true);


--
-- Name: PageContent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."PageContent_id_seq"', 1, true);


--
-- Name: Page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Page_id_seq"', 5, true);


--
-- Name: Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Post_id_seq"', 1, false);


--
-- Name: ProductCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ProductCategory_id_seq"', 57, true);


--
-- Name: ProductImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ProductImage_id_seq"', 1, false);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Product_id_seq"', 177, true);


--
-- Name: SiteConfig_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."SiteConfig_id_seq"', 15, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- Name: VisitorStats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."VisitorStats_id_seq"', 1, false);


--
-- Name: Attachment Attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Attachment"
    ADD CONSTRAINT "Attachment_pkey" PRIMARY KEY (id);


--
-- Name: Banner Banner_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Banner"
    ADD CONSTRAINT "Banner_pkey" PRIMARY KEY (id);


--
-- Name: BoardCategory BoardCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BoardCategory"
    ADD CONSTRAINT "BoardCategory_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: GalleryCategory GalleryCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GalleryCategory"
    ADD CONSTRAINT "GalleryCategory_pkey" PRIMARY KEY (id);


--
-- Name: Gallery Gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Gallery"
    ADD CONSTRAINT "Gallery_pkey" PRIMARY KEY (id);


--
-- Name: HeroSlide HeroSlide_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HeroSlide"
    ADD CONSTRAINT "HeroSlide_pkey" PRIMARY KEY (id);


--
-- Name: Menu Menu_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Menu"
    ADD CONSTRAINT "Menu_pkey" PRIMARY KEY (id);


--
-- Name: PageContent PageContent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PageContent"
    ADD CONSTRAINT "PageContent_pkey" PRIMARY KEY (id);


--
-- Name: Page Page_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: ProductCategory ProductCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY (id);


--
-- Name: ProductImage ProductImage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductImage"
    ADD CONSTRAINT "ProductImage_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: SiteConfig SiteConfig_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteConfig"
    ADD CONSTRAINT "SiteConfig_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VisitorStats VisitorStats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VisitorStats"
    ADD CONSTRAINT "VisitorStats_pkey" PRIMARY KEY (id);


--
-- Name: BoardCategory_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "BoardCategory_slug_key" ON public."BoardCategory" USING btree (slug);


--
-- Name: GalleryCategory_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "GalleryCategory_slug_key" ON public."GalleryCategory" USING btree (slug);


--
-- Name: PageContent_pageId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "PageContent_pageId_key" ON public."PageContent" USING btree ("pageId");


--
-- Name: Page_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Page_slug_key" ON public."Page" USING btree (slug);


--
-- Name: ProductCategory_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ProductCategory_code_key" ON public."ProductCategory" USING btree (code);


--
-- Name: SiteConfig_key_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "SiteConfig_key_key" ON public."SiteConfig" USING btree (key);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VisitorStats_date_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "VisitorStats_date_key" ON public."VisitorStats" USING btree (date);


--
-- Name: Attachment Attachment_galleryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Attachment"
    ADD CONSTRAINT "Attachment_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES public."Gallery"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Attachment Attachment_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Attachment"
    ADD CONSTRAINT "Attachment_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Comment Comment_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Gallery Gallery_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Gallery"
    ADD CONSTRAINT "Gallery_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."GalleryCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Menu Menu_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Menu"
    ADD CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Menu"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Page Page_menuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES public."Menu"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Post Post_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."BoardCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProductCategory ProductCategory_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."ProductCategory"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProductImage ProductImage_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductImage"
    ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."ProductCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

