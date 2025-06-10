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
-- Data for Name: BoardCategory; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."BoardCategory" (id, slug, name, description, "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (1, 'notice', '공지사항', '대경하드웨어의 중요한 공지사항입니다.', 0, true, '2025-06-10 02:59:22.942', '2025-06-10 02:59:22.942');
INSERT INTO public."BoardCategory" (id, slug, name, description, "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (2, 'news', '뉴스 & 소식', '업계 동향과 회사 소식을 전해드립니다.', 0, true, '2025-06-10 02:59:22.945', '2025-06-10 02:59:22.945');
INSERT INTO public."BoardCategory" (id, slug, name, description, "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (3, 'qna', 'Q&A', '궁금한 점을 문의하고 답변을 받아보세요.', 0, true, '2025-06-10 02:59:22.947', '2025-06-10 02:59:22.947');
INSERT INTO public."BoardCategory" (id, slug, name, description, "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (4, 'review', '고객 후기', '고객님들의 소중한 후기입니다.', 0, true, '2025-06-10 02:59:22.948', '2025-06-10 02:59:22.948');


--
-- Data for Name: GalleryCategory; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."GalleryCategory" (id, slug, name, description, "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (1, 'product', '제품 갤러리', '대경하드웨어의 다양한 제품 이미지', 0, true, '2025-06-10 02:59:22.949', '2025-06-10 02:59:22.949');
INSERT INTO public."GalleryCategory" (id, slug, name, description, "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (2, 'portfolio', '포트폴리오', '프로젝트 및 시공 사례', 0, true, '2025-06-10 02:59:22.951', '2025-06-10 02:59:22.951');
INSERT INTO public."GalleryCategory" (id, slug, name, description, "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (3, 'event', '이벤트 갤러리', '행사 및 이벤트 사진', 0, true, '2025-06-10 02:59:22.952', '2025-06-10 02:59:22.952');


--
-- Data for Name: Gallery; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."User" (id, email, password, name, role, "createdAt", "updatedAt") VALUES (1, 'admin@daekyung.com', '$2b$10$tXpcw3qf0eiXsAS2dfj94us4Q2SUKzsOt7f1dpG.wyf7b57VkMuyy', '관리자', 'admin', '2025-06-10 02:59:22.937', '2025-06-10 02:59:22.937');


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: Attachment; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: Banner; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: HeroSlide; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: Menu; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (1, '홈', '/', 'internal', '_self', NULL, 0, true, '2025-06-10 02:59:22.97', '2025-06-10 02:59:22.97');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (2, '회사소개', '/company', 'internal', '_self', NULL, 1, true, '2025-06-10 02:59:22.971', '2025-06-10 02:59:22.971');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (3, '제품소개', '/products', 'internal', '_self', NULL, 2, true, '2025-06-10 02:59:22.972', '2025-06-10 02:59:22.972');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (4, '인증정보', '/certification', 'internal', '_self', NULL, 3, true, '2025-06-10 02:59:22.972', '2025-06-10 02:59:22.972');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (5, '견적문의', '/inquiry', 'internal', '_self', NULL, 4, true, '2025-06-10 02:59:22.973', '2025-06-10 02:59:22.973');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (6, '커뮤니티', '/board', 'internal', '_self', NULL, 5, true, '2025-06-10 02:59:22.973', '2025-06-10 02:59:22.973');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (7, '갤러리', '/gallery', 'internal', '_self', NULL, 6, true, '2025-06-10 02:59:22.973', '2025-06-10 02:59:22.973');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (8, '회사소개', '/company', 'dropdown', '_self', NULL, 1, true, '2025-06-10 02:59:28.018', '2025-06-10 02:59:28.018');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (9, '제품소개', '/products', 'dropdown', '_self', NULL, 2, true, '2025-06-10 02:59:28.02', '2025-06-10 02:59:28.02');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (10, '인증정보', '/certification', 'dropdown', '_self', NULL, 3, true, '2025-06-10 02:59:28.021', '2025-06-10 02:59:28.021');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (11, '견적문의', '/inquiry', 'internal', '_self', NULL, 4, true, '2025-06-10 02:59:28.021', '2025-06-10 02:59:28.021');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (12, '커뮤니티', '/board', 'dropdown', '_self', NULL, 5, true, '2025-06-10 02:59:28.022', '2025-06-10 02:59:28.022');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (13, '갤러리', '/gallery', 'dropdown', '_self', NULL, 6, true, '2025-06-10 02:59:28.022', '2025-06-10 02:59:28.022');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (14, '회사개요/인사말', '/company', 'internal', '_self', 2, 1, true, '2025-06-10 02:59:28.024', '2025-06-10 02:59:28.024');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (15, '사업장 소개/오시는 길', '/location', 'internal', '_self', 2, 2, true, '2025-06-10 02:59:28.024', '2025-06-10 02:59:28.024');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (16, 'A | Handlelocker & Fasterner', '/products?category=A', 'internal', '_self', 3, 1, true, '2025-06-10 02:59:28.025', '2025-06-10 02:59:28.025');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (17, 'B | Hinge', '/products?category=B', 'internal', '_self', 3, 2, true, '2025-06-10 02:59:28.025', '2025-06-10 02:59:28.025');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (18, 'C | Clip & Latch', '/products?category=C', 'internal', '_self', 3, 3, true, '2025-06-10 02:59:28.025', '2025-06-10 02:59:28.025');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (19, 'G | Rubber & Seals', '/products?category=G', 'internal', '_self', 3, 4, true, '2025-06-10 02:59:28.025', '2025-06-10 02:59:28.025');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (20, 'H | Handle & Grip', '/products?category=H', 'internal', '_self', 3, 5, true, '2025-06-10 02:59:28.025', '2025-06-10 02:59:28.025');
INSERT INTO public."Menu" (id, title, path, type, target, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (21, 'S | Stay & Sliderail', '/products?category=S', 'internal', '_self', 3, 6, true, '2025-06-10 02:59:28.025', '2025-06-10 02:59:28.025');


--
-- Data for Name: Page; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Page" (id, title, slug, content, "templateId", sections, "metaTitle", "metaDescription", "menuId", "isPublished", "createdAt", "updatedAt") VALUES (1, '회사소개', 'company', '', 'company', '{"hero":{"id":"hero","type":"hero","title":"대경하드웨어","subtitle":"30년 이상의 경험과 기술력으로 최고 품질의 하드웨어 소재를 제공합니다"}}', NULL, NULL, NULL, true, '2025-06-10 02:59:28.026', '2025-06-10 02:59:28.026');
INSERT INTO public."Page" (id, title, slug, content, "templateId", sections, "metaTitle", "metaDescription", "menuId", "isPublished", "createdAt", "updatedAt") VALUES (2, '사업장 소개/오시는 길', 'location', '', 'location', '{"hero":{"id":"hero","type":"hero","title":"오시는 길"}}', NULL, NULL, NULL, true, '2025-06-10 02:59:28.027', '2025-06-10 02:59:28.027');
INSERT INTO public."Page" (id, title, slug, content, "templateId", sections, "metaTitle", "metaDescription", "menuId", "isPublished", "createdAt", "updatedAt") VALUES (3, '견적문의', 'inquiry', '', 'inquiry', '{"hero":{"id":"hero","type":"hero","title":"견적 문의"}}', NULL, NULL, NULL, true, '2025-06-10 02:59:28.028', '2025-06-10 02:59:28.028');
INSERT INTO public."Page" (id, title, slug, content, "templateId", sections, "metaTitle", "metaDescription", "menuId", "isPublished", "createdAt", "updatedAt") VALUES (4, '인증 및 특허', 'certification', '', 'certification', '{"hero":{"id":"hero","type":"hero","title":"인증 정보"}}', NULL, NULL, NULL, true, '2025-06-10 02:59:28.029', '2025-06-10 02:59:28.029');
INSERT INTO public."Page" (id, title, slug, content, "templateId", sections, "metaTitle", "metaDescription", "menuId", "isPublished", "createdAt", "updatedAt") VALUES (5, '제품소개', 'products', '', 'products', '{"hero":{"id":"hero","type":"hero","title":"제품 소개"}}', NULL, NULL, NULL, true, '2025-06-10 02:59:28.029', '2025-06-10 02:59:28.029');


--
-- Data for Name: PageContent; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."PageContent" (id, "pageId", title, content, metadata, "createdAt", "updatedAt") VALUES (1, 'home', '홈페이지', '{"heroTitle":"대한민국 대표 하드웨어 소재 전문기업","heroSubtitle":"대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.","aboutTitle":"대경하드웨어 소개","aboutContent":"대경하드웨어는 1990년 설립 이래 30년 이상의 역사를 가진 하드웨어 소재 전문기업으로, \n다양한 산업 분야에 고품질의 하드웨어 소재를 공급하고 있습니다.\n\n우리 회사는 지속적인 연구개발과 품질 향상을 통해 국내외 시장에서 인정받는 기업으로 성장했으며,\n다양한 인증과 특허를 보유하고 있습니다.","productsTitle":"제품 카테고리","productsSubtitle":"대경하드웨어는 다양한 산업 분야에 적용 가능한 고품질 하드웨어 소재를 제공합니다.","ctaTitle":"하드웨어 소재에 관한 문의가 있으신가요?","ctaSubtitle":"대경하드웨어의 전문가들이 고객님에게 최적화된 하드웨어 소재를 제안해 드립니다."}', '{"title":"대경하드웨어 - 하드웨어 소재 전문기업","description":"30년 전통의 하드웨어 소재 전문기업 대경하드웨어","keywords":"하드웨어, 힌지, 핸들, 락커, 패스너"}', '2025-06-10 02:59:22.96', '2025-06-10 02:59:22.96');


--
-- Data for Name: ProductCategory; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (13, 'A', 'Handlelocker & Fasterner', '핸들로커 및 패스너', '핸들로커, 패스너 관련 하드웨어', 1, NULL, 0, true, '2025-06-10 02:59:34.025', '2025-06-10 02:59:34.025');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (14, 'A-1', 'Airtightness', '기밀성', '핸들로커 및 패스너 - 기밀성', 2, 13, 0, true, '2025-06-10 02:59:34.026', '2025-06-10 02:59:34.026');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (15, 'A-2', 'Cylinder lock & camlock', '실린더 락 & 캠 락', '핸들로커 및 패스너 - 실린더 락 & 캠 락', 2, 13, 1, true, '2025-06-10 02:59:34.027', '2025-06-10 02:59:34.027');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (16, 'A-3', 'Fasterner', '패스너', '핸들로커 및 패스너 - 패스너', 2, 13, 2, true, '2025-06-10 02:59:34.028', '2025-06-10 02:59:34.028');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (17, 'A-4', 'Flat lock', '플랫 락', '핸들로커 및 패스너 - 플랫 락', 2, 13, 3, true, '2025-06-10 02:59:34.03', '2025-06-10 02:59:34.03');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (18, 'A-5', 'Handle latch', '핸들 래치', '핸들로커 및 패스너 - 핸들 래치', 2, 13, 4, true, '2025-06-10 02:59:34.036', '2025-06-10 02:59:34.036');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (19, 'A-6', 'Handle lock', '핸들 락', '핸들로커 및 패스너 - 핸들 락', 2, 13, 5, true, '2025-06-10 02:59:34.038', '2025-06-10 02:59:34.038');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (20, 'A-7', 'Lock accessory', '락 액세서리', '핸들로커 및 패스너 - 락 액세서리', 2, 13, 6, true, '2025-06-10 02:59:34.041', '2025-06-10 02:59:34.041');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (21, 'A-8', 'Plane lock', '플레인 락', '핸들로커 및 패스너 - 플레인 락', 2, 13, 7, true, '2025-06-10 02:59:34.046', '2025-06-10 02:59:34.046');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (22, 'A-9', 'Rod control lock', '로드 컨트롤 락', '핸들로커 및 패스너 - 로드 컨트롤 락', 2, 13, 8, true, '2025-06-10 02:59:34.05', '2025-06-10 02:59:34.05');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (23, 'B', 'Hinge', '힌지', '각종 힌지 제품', 1, NULL, 1, true, '2025-06-10 02:59:34.053', '2025-06-10 02:59:34.053');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (24, 'B-1', 'Butterfly hinge', '버터플라이 힌지', '힌지 - 버터플라이 힌지', 2, 23, 0, true, '2025-06-10 02:59:34.053', '2025-06-10 02:59:34.053');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (25, 'B-2', 'Other hinge', '기타 힌지', '힌지 - 기타 힌지', 2, 23, 1, true, '2025-06-10 02:59:34.056', '2025-06-10 02:59:34.056');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (26, 'B-3', 'Plage hinge', '플래그 힌지', '힌지 - 플래그 힌지', 2, 23, 2, true, '2025-06-10 02:59:34.059', '2025-06-10 02:59:34.059');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (27, 'B-4', 'Side hinge', '사이드 힌지', '힌지 - 사이드 힌지', 2, 23, 3, true, '2025-06-10 02:59:34.063', '2025-06-10 02:59:34.063');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (28, 'B-5', 'Stamping hinge', '스탬핑 힌지', '힌지 - 스탬핑 힌지', 2, 23, 4, true, '2025-06-10 02:59:34.066', '2025-06-10 02:59:34.066');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (29, 'B-6', 'Welding hinge', '웰딩 힌지', '힌지 - 웰딩 힌지', 2, 23, 5, true, '2025-06-10 02:59:34.072', '2025-06-10 02:59:34.072');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (30, 'C', 'Clip & Latch', '클립 & 래치', '클립 및 래치 제품', 1, NULL, 2, true, '2025-06-10 02:59:34.077', '2025-06-10 02:59:34.077');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (31, 'C-1', 'Catch clip', '캐치 클립', '클립 & 래치 - 캐치 클립', 2, 30, 0, true, '2025-06-10 02:59:34.078', '2025-06-10 02:59:34.078');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (32, 'C-2', 'Latch', '래치', '클립 & 래치 - 래치', 2, 30, 1, true, '2025-06-10 02:59:34.08', '2025-06-10 02:59:34.08');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (33, 'C-3', 'Magnetic catcher', '마그네틱 캐처', '클립 & 래치 - 마그네틱 캐처', 2, 30, 2, true, '2025-06-10 02:59:34.083', '2025-06-10 02:59:34.083');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (34, 'C-4', 'toggle clamp', '토글 클램프', '클립 & 래치 - 토글 클램프', 2, 30, 3, true, '2025-06-10 02:59:34.085', '2025-06-10 02:59:34.085');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (35, 'E', 'Electrical materials', '전기 자재', '전기 관련 자재', 1, NULL, 4, true, '2025-06-10 02:59:34.087', '2025-06-10 02:59:34.087');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (36, 'E-1', 'Electrical materials', '전기 자재', '전기 자재 - 전기 자재', 2, 35, 0, true, '2025-06-10 02:59:34.087', '2025-06-10 02:59:34.087');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (37, 'G', 'Rubber & Seals', '고무 & 씰', '고무 및 씰 제품', 1, NULL, 6, true, '2025-06-10 02:59:34.089', '2025-06-10 02:59:34.089');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (38, 'G-1', 'Grommet packing', '그로밋 패킹', '고무 & 씰 - 그로밋 패킹', 2, 37, 0, true, '2025-06-10 02:59:34.09', '2025-06-10 02:59:34.09');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (39, 'G-2', 'Hole packing', '홀 패킹', '고무 & 씰 - 홀 패킹', 2, 37, 1, true, '2025-06-10 02:59:34.093', '2025-06-10 02:59:34.093');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (40, 'G-3', 'Rubber seals', '고무 씰', '고무 & 씰 - 고무 씰', 2, 37, 2, true, '2025-06-10 02:59:34.095', '2025-06-10 02:59:34.095');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (41, 'G-4', 'other packing', '기타 패킹', '고무 & 씰 - 기타 패킹', 2, 37, 3, true, '2025-06-10 02:59:34.101', '2025-06-10 02:59:34.101');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (42, 'G-5', 'plane packing', '플레인 패킹', '고무 & 씰 - 플레인 패킹', 2, 37, 4, true, '2025-06-10 02:59:34.103', '2025-06-10 02:59:34.103');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (43, 'H', 'Handle & Grip', '핸들 & 그립', '핸들 및 그립 제품', 1, NULL, 7, true, '2025-06-10 02:59:34.106', '2025-06-10 02:59:34.106');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (44, 'H-1', 'Case handle', '케이스 핸들', '핸들 & 그립 - 케이스 핸들', 2, 43, 0, true, '2025-06-10 02:59:34.106', '2025-06-10 02:59:34.106');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (45, 'H-2', 'Insert handle', '인서트 핸들', '핸들 & 그립 - 인서트 핸들', 2, 43, 1, true, '2025-06-10 02:59:34.111', '2025-06-10 02:59:34.111');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (46, 'H-3', 'Other', '기타', '핸들 & 그립 - 기타', 2, 43, 2, true, '2025-06-10 02:59:34.117', '2025-06-10 02:59:34.117');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (47, 'H-4', 'PVC handle', 'PVC 핸들', '핸들 & 그립 - PVC 핸들', 2, 43, 3, true, '2025-06-10 02:59:34.124', '2025-06-10 02:59:34.124');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (48, 'H-5', 'Pull handle', '풀 핸들', '핸들 & 그립 - 풀 핸들', 2, 43, 4, true, '2025-06-10 02:59:34.128', '2025-06-10 02:59:34.128');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (49, 'H-6', 'grip & knob', '그립 & 노브', '핸들 & 그립 - 그립 & 노브', 2, 43, 5, true, '2025-06-10 02:59:34.131', '2025-06-10 02:59:34.131');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (50, 'M', 'Marine part', '해양 부품', '해양 관련 부품', 1, NULL, 12, true, '2025-06-10 02:59:34.133', '2025-06-10 02:59:34.133');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (51, 'M-1', 'Marine part', '해양 부품', '해양 부품 - 해양 부품', 2, 50, 0, true, '2025-06-10 02:59:34.134', '2025-06-10 02:59:34.134');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (52, 'P', 'Precision part', '정밀 부품', '정밀 가공 부품', 1, NULL, 15, true, '2025-06-10 02:59:34.137', '2025-06-10 02:59:34.137');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (53, 'P-1', 'Precision part', '정밀 부품', '정밀 부품 - 정밀 부품', 2, 52, 0, true, '2025-06-10 02:59:34.137', '2025-06-10 02:59:34.137');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (54, 'S', 'Stay & Sliderail', '스테이 & 슬라이드레일', '스테이 및 슬라이드레일 제품', 1, NULL, 18, true, '2025-06-10 02:59:34.141', '2025-06-10 02:59:34.141');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (55, 'S-1', 'Gas spring', '가스 스프링', '스테이 & 슬라이드레일 - 가스 스프링', 2, 54, 0, true, '2025-06-10 02:59:34.141', '2025-06-10 02:59:34.141');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (56, 'S-2', 'Slide rail', '슬라이드 레일', '스테이 & 슬라이드레일 - 슬라이드 레일', 2, 54, 1, true, '2025-06-10 02:59:34.143', '2025-06-10 02:59:34.143');
INSERT INTO public."ProductCategory" (id, code, name, "nameKo", description, level, "parentId", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES (57, 'S-3', 'Stay', '스테이', '스테이 & 슬라이드레일 - 스테이', 2, 54, 2, true, '2025-06-10 02:59:34.144', '2025-06-10 02:59:34.144');


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (1, NULL, 'A-22T', 'A-22T', '패스너 - A-22T', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 16, 0, true, true, '2025-06-10 02:59:34.029', '2025-06-10 02:59:34.029');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (2, NULL, 'A-610', 'A-610', '플랫 락 - A-610', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 17, 0, true, true, '2025-06-10 02:59:34.031', '2025-06-10 02:59:34.031');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (3, NULL, 'A-611', 'A-611', '플랫 락 - A-611', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 17, 1, true, true, '2025-06-10 02:59:34.032', '2025-06-10 02:59:34.032');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (4, NULL, 'A-612', 'A-612', '플랫 락 - A-612', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 17, 2, true, true, '2025-06-10 02:59:34.033', '2025-06-10 02:59:34.033');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (5, NULL, 'A-61S', 'A-61S', '플랫 락 - A-61S', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 17, 3, true, true, '2025-06-10 02:59:34.034', '2025-06-10 02:59:34.034');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (6, NULL, 'A-63S', 'A-63S', '플랫 락 - A-63S', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 17, 4, true, true, '2025-06-10 02:59:34.034', '2025-06-10 02:59:34.034');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (7, NULL, 'A-65', 'A-65', '플랫 락 - A-65', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 17, 5, true, true, '2025-06-10 02:59:34.035', '2025-06-10 02:59:34.035');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (8, NULL, 'A-5600(LH)', 'A-5600(LH)', '핸들 래치 - A-5600(LH)', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 18, 0, true, true, '2025-06-10 02:59:34.037', '2025-06-10 02:59:34.037');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (9, NULL, 'A-5606', 'A-5606', '핸들 래치 - A-5606', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 18, 1, true, true, '2025-06-10 02:59:34.037', '2025-06-10 02:59:34.037');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (10, NULL, 'H-429-1', 'H-429-1', '핸들 래치 - H-429-1', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 18, 2, true, true, '2025-06-10 02:59:34.038', '2025-06-10 02:59:34.038');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (11, NULL, 'MDSI-A-30', 'MDSI-A-30', '핸들 락 - MDSI-A-30', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 19, 0, true, true, '2025-06-10 02:59:34.039', '2025-06-10 02:59:34.039');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (12, NULL, 'MDSI-A-31', 'MDSI-A-31', '핸들 락 - MDSI-A-31', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 19, 1, true, true, '2025-06-10 02:59:34.04', '2025-06-10 02:59:34.04');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (13, NULL, 'A-1200-1', 'A-1200-1', '락 액세서리 - A-1200-1', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 20, 0, true, true, '2025-06-10 02:59:34.042', '2025-06-10 02:59:34.042');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (14, NULL, 'E-1200', 'E-1200', '락 액세서리 - E-1200', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 20, 1, true, true, '2025-06-10 02:59:34.042', '2025-06-10 02:59:34.042');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (15, NULL, 'MDSI-A-1T8', 'MDSI-A-1T8', '락 액세서리 - MDSI-A-1T8', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 20, 2, true, true, '2025-06-10 02:59:34.043', '2025-06-10 02:59:34.043');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (16, NULL, 'MDSI-A-35', 'MDSI-A-35', '락 액세서리 - MDSI-A-35', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 20, 3, true, true, '2025-06-10 02:59:34.043', '2025-06-10 02:59:34.043');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (17, NULL, 'MDSI-A-38-2', 'MDSI-A-38-2', '락 액세서리 - MDSI-A-38-2', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 20, 4, true, true, '2025-06-10 02:59:34.044', '2025-06-10 02:59:34.044');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (18, NULL, 'MDSI-A-38-4', 'MDSI-A-38-4', '락 액세서리 - MDSI-A-38-4', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 20, 5, true, true, '2025-06-10 02:59:34.044', '2025-06-10 02:59:34.044');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (19, NULL, 'MDSI-A-42T', 'MDSI-A-42T', '락 액세서리 - MDSI-A-42T', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 20, 6, true, true, '2025-06-10 02:59:34.045', '2025-06-10 02:59:34.045');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (20, NULL, 'P-1250', 'P-1250', '락 액세서리 - P-1250', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 20, 7, true, true, '2025-06-10 02:59:34.045', '2025-06-10 02:59:34.045');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (21, NULL, 'A-1088', 'A-1088', '플레인 락 - A-1088', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 21, 0, true, true, '2025-06-10 02:59:34.046', '2025-06-10 02:59:34.046');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (22, NULL, 'A-305', 'A-305', '플레인 락 - A-305', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 21, 1, true, true, '2025-06-10 02:59:34.047', '2025-06-10 02:59:34.047');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (23, NULL, 'A-307', 'A-307', '플레인 락 - A-307', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 21, 2, true, true, '2025-06-10 02:59:34.047', '2025-06-10 02:59:34.047');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (24, NULL, 'A-310', 'A-310', '플레인 락 - A-310', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 21, 3, true, true, '2025-06-10 02:59:34.048', '2025-06-10 02:59:34.048');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (25, NULL, 'A-313', 'A-313', '플레인 락 - A-313', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 21, 4, true, true, '2025-06-10 02:59:34.048', '2025-06-10 02:59:34.048');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (26, NULL, 'A-401', 'A-401', '플레인 락 - A-401', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 21, 5, true, true, '2025-06-10 02:59:34.049', '2025-06-10 02:59:34.049');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (27, NULL, 'A-403-1', 'A-403-1', '플레인 락 - A-403-1', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 21, 6, true, true, '2025-06-10 02:59:34.049', '2025-06-10 02:59:34.049');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (28, NULL, 'A-403', 'A-403', '플레인 락 - A-403', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 21, 7, true, true, '2025-06-10 02:59:34.05', '2025-06-10 02:59:34.05');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (29, NULL, 'A-31T', 'A-31T', '로드 컨트롤 락 - A-31T', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 22, 0, true, true, '2025-06-10 02:59:34.051', '2025-06-10 02:59:34.051');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (30, NULL, 'A-3T', 'A-3T', '로드 컨트롤 락 - A-3T', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 22, 1, true, true, '2025-06-10 02:59:34.052', '2025-06-10 02:59:34.052');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (31, NULL, 'A-500', 'A-500', '로드 컨트롤 락 - A-500', NULL, NULL, '/images/A-Handlelocker & Fasterner/', 22, 2, true, true, '2025-06-10 02:59:34.052', '2025-06-10 02:59:34.052');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (32, NULL, 'B-910', 'B-910', '버터플라이 힌지 - B-910', NULL, NULL, '/images/B-Hinge/', 24, 0, true, true, '2025-06-10 02:59:34.054', '2025-06-10 02:59:34.054');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (33, NULL, 'DK-B-6060', 'DK-B-6060', '버터플라이 힌지 - DK-B-6060', NULL, NULL, '/images/B-Hinge/', 24, 1, true, true, '2025-06-10 02:59:34.054', '2025-06-10 02:59:34.054');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (34, NULL, 'DK-B-8085', 'DK-B-8085', '버터플라이 힌지 - DK-B-8085', NULL, NULL, '/images/B-Hinge/', 24, 2, true, true, '2025-06-10 02:59:34.055', '2025-06-10 02:59:34.055');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (35, NULL, 'Dk-B-6070', 'Dk-B-6070', '버터플라이 힌지 - Dk-B-6070', NULL, NULL, '/images/B-Hinge/', 24, 3, true, true, '2025-06-10 02:59:34.055', '2025-06-10 02:59:34.055');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (36, NULL, 'B-1032', 'B-1032', '기타 힌지 - B-1032', NULL, NULL, '/images/B-Hinge/', 25, 0, true, true, '2025-06-10 02:59:34.057', '2025-06-10 02:59:34.057');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (37, NULL, 'B-1038', 'B-1038', '기타 힌지 - B-1038', NULL, NULL, '/images/B-Hinge/', 25, 1, true, true, '2025-06-10 02:59:34.057', '2025-06-10 02:59:34.057');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (38, NULL, 'B-1050-1', 'B-1050-1', '기타 힌지 - B-1050-1', NULL, NULL, '/images/B-Hinge/', 25, 2, true, true, '2025-06-10 02:59:34.058', '2025-06-10 02:59:34.058');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (39, NULL, 'B-1225S', 'B-1225S', '기타 힌지 - B-1225S', NULL, NULL, '/images/B-Hinge/', 25, 3, true, true, '2025-06-10 02:59:34.058', '2025-06-10 02:59:34.058');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (40, NULL, 'B-1240', 'B-1240', '기타 힌지 - B-1240', NULL, NULL, '/images/B-Hinge/', 25, 4, true, true, '2025-06-10 02:59:34.059', '2025-06-10 02:59:34.059');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (41, NULL, 'B-1538LH_무', 'B-1538LH_무', '플래그 힌지 - B-1538LH_무', NULL, NULL, '/images/B-Hinge/', 26, 0, true, true, '2025-06-10 02:59:34.06', '2025-06-10 02:59:34.06');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (42, NULL, 'B-1538LH_유', 'B-1538LH_유', '플래그 힌지 - B-1538LH_유', NULL, NULL, '/images/B-Hinge/', 26, 1, true, true, '2025-06-10 02:59:34.06', '2025-06-10 02:59:34.06');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (43, NULL, 'B-1538RH', 'B-1538RH', '플래그 힌지 - B-1538RH', NULL, NULL, '/images/B-Hinge/', 26, 2, true, true, '2025-06-10 02:59:34.061', '2025-06-10 02:59:34.061');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (44, NULL, 'B-1538RH_무', 'B-1538RH_무', '플래그 힌지 - B-1538RH_무', NULL, NULL, '/images/B-Hinge/', 26, 3, true, true, '2025-06-10 02:59:34.062', '2025-06-10 02:59:34.062');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (45, NULL, 'B-2048LH_유', 'B-2048LH_유', '플래그 힌지 - B-2048LH_유', NULL, NULL, '/images/B-Hinge/', 26, 4, true, true, '2025-06-10 02:59:34.063', '2025-06-10 02:59:34.063');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (46, NULL, 'B-130-2', 'B-130-2', '사이드 힌지 - B-130-2', NULL, NULL, '/images/B-Hinge/', 27, 0, true, true, '2025-06-10 02:59:34.065', '2025-06-10 02:59:34.065');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (47, NULL, 'B-130-6', 'B-130-6', '사이드 힌지 - B-130-6', NULL, NULL, '/images/B-Hinge/', 27, 1, true, true, '2025-06-10 02:59:34.065', '2025-06-10 02:59:34.065');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (48, NULL, 'B-3100', 'B-3100', '스탬핑 힌지 - B-3100', NULL, NULL, '/images/B-Hinge/', 28, 0, true, true, '2025-06-10 02:59:34.066', '2025-06-10 02:59:34.066');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (49, NULL, 'B-50', 'B-50', '스탬핑 힌지 - B-50', NULL, NULL, '/images/B-Hinge/', 28, 1, true, true, '2025-06-10 02:59:34.066', '2025-06-10 02:59:34.066');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (50, NULL, 'B-55', 'B-55', '스탬핑 힌지 - B-55', NULL, NULL, '/images/B-Hinge/', 28, 2, true, true, '2025-06-10 02:59:34.067', '2025-06-10 02:59:34.067');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (51, NULL, 'B-60', 'B-60', '스탬핑 힌지 - B-60', NULL, NULL, '/images/B-Hinge/', 28, 3, true, true, '2025-06-10 02:59:34.068', '2025-06-10 02:59:34.068');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (52, NULL, 'B-7255', 'B-7255', '스탬핑 힌지 - B-7255', NULL, NULL, '/images/B-Hinge/', 28, 4, true, true, '2025-06-10 02:59:34.068', '2025-06-10 02:59:34.068');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (53, NULL, 'B-80', 'B-80', '스탬핑 힌지 - B-80', NULL, NULL, '/images/B-Hinge/', 28, 5, true, true, '2025-06-10 02:59:34.069', '2025-06-10 02:59:34.069');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (54, NULL, 'B-81', 'B-81', '스탬핑 힌지 - B-81', NULL, NULL, '/images/B-Hinge/', 28, 6, true, true, '2025-06-10 02:59:34.069', '2025-06-10 02:59:34.069');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (55, NULL, 'B-82', 'B-82', '스탬핑 힌지 - B-82', NULL, NULL, '/images/B-Hinge/', 28, 7, true, true, '2025-06-10 02:59:34.07', '2025-06-10 02:59:34.07');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (56, NULL, 'B-TJ260', 'B-TJ260', '스탬핑 힌지 - B-TJ260', NULL, NULL, '/images/B-Hinge/', 28, 8, true, true, '2025-06-10 02:59:34.07', '2025-06-10 02:59:34.07');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (57, NULL, 'DK-B-910', 'DK-B-910', '스탬핑 힌지 - DK-B-910', NULL, NULL, '/images/B-Hinge/', 28, 9, true, true, '2025-06-10 02:59:34.071', '2025-06-10 02:59:34.071');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (58, NULL, 'Dk-B-900', 'Dk-B-900', '스탬핑 힌지 - Dk-B-900', NULL, NULL, '/images/B-Hinge/', 28, 10, true, true, '2025-06-10 02:59:34.071', '2025-06-10 02:59:34.071');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (59, NULL, 'B-100', 'B-100', '웰딩 힌지 - B-100', NULL, NULL, '/images/B-Hinge/', 29, 0, true, true, '2025-06-10 02:59:34.072', '2025-06-10 02:59:34.072');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (60, NULL, 'B-101', 'B-101', '웰딩 힌지 - B-101', NULL, NULL, '/images/B-Hinge/', 29, 1, true, true, '2025-06-10 02:59:34.073', '2025-06-10 02:59:34.073');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (61, NULL, 'B-103', 'B-103', '웰딩 힌지 - B-103', NULL, NULL, '/images/B-Hinge/', 29, 2, true, true, '2025-06-10 02:59:34.074', '2025-06-10 02:59:34.074');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (62, NULL, 'B-104', 'B-104', '웰딩 힌지 - B-104', NULL, NULL, '/images/B-Hinge/', 29, 3, true, true, '2025-06-10 02:59:34.074', '2025-06-10 02:59:34.074');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (63, NULL, 'B-105-양', 'B-105-양', '웰딩 힌지 - B-105-양', NULL, NULL, '/images/B-Hinge/', 29, 4, true, true, '2025-06-10 02:59:34.074', '2025-06-10 02:59:34.074');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (64, NULL, 'B-130-12', 'B-130-12', '웰딩 힌지 - B-130-12', NULL, NULL, '/images/B-Hinge/', 29, 5, true, true, '2025-06-10 02:59:34.075', '2025-06-10 02:59:34.075');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (65, NULL, 'B-400', 'B-400', '웰딩 힌지 - B-400', NULL, NULL, '/images/B-Hinge/', 29, 6, true, true, '2025-06-10 02:59:34.075', '2025-06-10 02:59:34.075');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (66, NULL, 'B-420', 'B-420', '웰딩 힌지 - B-420', NULL, NULL, '/images/B-Hinge/', 29, 7, true, true, '2025-06-10 02:59:34.076', '2025-06-10 02:59:34.076');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (67, NULL, 'B-430', 'B-430', '웰딩 힌지 - B-430', NULL, NULL, '/images/B-Hinge/', 29, 8, true, true, '2025-06-10 02:59:34.076', '2025-06-10 02:59:34.076');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (68, NULL, 'DK-B-3400', 'DK-B-3400', '웰딩 힌지 - DK-B-3400', NULL, NULL, '/images/B-Hinge/', 29, 9, true, true, '2025-06-10 02:59:34.077', '2025-06-10 02:59:34.077');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (69, NULL, 'C-026', 'C-026', '캐치 클립 - C-026', NULL, NULL, '/images/C-Clip & Latch/', 31, 0, true, true, '2025-06-10 02:59:34.078', '2025-06-10 02:59:34.078');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (70, NULL, 'C-033SL', 'C-033SL', '캐치 클립 - C-033SL', NULL, NULL, '/images/C-Clip & Latch/', 31, 1, true, true, '2025-06-10 02:59:34.079', '2025-06-10 02:59:34.079');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (71, NULL, 'C-100', 'C-100', '캐치 클립 - C-100', NULL, NULL, '/images/C-Clip & Latch/', 31, 2, true, true, '2025-06-10 02:59:34.079', '2025-06-10 02:59:34.079');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (72, NULL, 'C-104', 'C-104', '캐치 클립 - C-104', NULL, NULL, '/images/C-Clip & Latch/', 31, 3, true, true, '2025-06-10 02:59:34.08', '2025-06-10 02:59:34.08');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (73, NULL, 'C-139', 'C-139', '래치 - C-139', NULL, NULL, '/images/C-Clip & Latch/', 32, 0, true, true, '2025-06-10 02:59:34.081', '2025-06-10 02:59:34.081');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (74, NULL, 'C-280-2', 'C-280-2', '래치 - C-280-2', NULL, NULL, '/images/C-Clip & Latch/', 32, 1, true, true, '2025-06-10 02:59:34.081', '2025-06-10 02:59:34.081');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (75, NULL, 'C-7150', 'C-7150', '래치 - C-7150', NULL, NULL, '/images/C-Clip & Latch/', 32, 2, true, true, '2025-06-10 02:59:34.082', '2025-06-10 02:59:34.082');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (76, NULL, 'C-7151', 'C-7151', '래치 - C-7151', NULL, NULL, '/images/C-Clip & Latch/', 32, 3, true, true, '2025-06-10 02:59:34.082', '2025-06-10 02:59:34.082');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (77, NULL, 'C-7152', 'C-7152', '래치 - C-7152', NULL, NULL, '/images/C-Clip & Latch/', 32, 4, true, true, '2025-06-10 02:59:34.082', '2025-06-10 02:59:34.082');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (78, NULL, 'C-1001', 'C-1001', '마그네틱 캐처 - C-1001', NULL, NULL, '/images/C-Clip & Latch/', 33, 0, true, true, '2025-06-10 02:59:34.083', '2025-06-10 02:59:34.083');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (79, NULL, 'C-1002', 'C-1002', '마그네틱 캐처 - C-1002', NULL, NULL, '/images/C-Clip & Latch/', 33, 1, true, true, '2025-06-10 02:59:34.084', '2025-06-10 02:59:34.084');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (80, NULL, 'C-2001', 'C-2001', '마그네틱 캐처 - C-2001', NULL, NULL, '/images/C-Clip & Latch/', 33, 2, true, true, '2025-06-10 02:59:34.085', '2025-06-10 02:59:34.085');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (81, NULL, 'C-016-41(S)', 'C-016-41(S)', '토글 클램프 - C-016-41(S)', NULL, NULL, '/images/C-Clip & Latch/', 34, 0, true, true, '2025-06-10 02:59:34.086', '2025-06-10 02:59:34.086');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (82, NULL, 'C-016-41', 'C-016-41', '토글 클램프 - C-016-41', NULL, NULL, '/images/C-Clip & Latch/', 34, 1, true, true, '2025-06-10 02:59:34.086', '2025-06-10 02:59:34.086');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (83, NULL, 'E-1216', 'E-1216', '전기 자재 - E-1216', NULL, NULL, '/images/E-Electrical materials/', 36, 0, true, true, '2025-06-10 02:59:34.088', '2025-06-10 02:59:34.088');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (84, NULL, 'E-200', 'E-200', '전기 자재 - E-200', NULL, NULL, '/images/E-Electrical materials/', 36, 1, true, true, '2025-06-10 02:59:34.088', '2025-06-10 02:59:34.088');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (85, NULL, 'P-102', 'P-102', '전기 자재 - P-102', NULL, NULL, '/images/E-Electrical materials/', 36, 2, true, true, '2025-06-10 02:59:34.089', '2025-06-10 02:59:34.089');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (86, NULL, 'G-030', 'G-030', '그로밋 패킹 - G-030', NULL, NULL, '/images/G-Rubber & Seals/', 38, 0, true, true, '2025-06-10 02:59:34.09', '2025-06-10 02:59:34.09');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (87, NULL, 'G-060', 'G-060', '그로밋 패킹 - G-060', NULL, NULL, '/images/G-Rubber & Seals/', 38, 1, true, true, '2025-06-10 02:59:34.09', '2025-06-10 02:59:34.09');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (88, NULL, 'G-0603', 'G-0603', '그로밋 패킹 - G-0603', NULL, NULL, '/images/G-Rubber & Seals/', 38, 2, true, true, '2025-06-10 02:59:34.091', '2025-06-10 02:59:34.091');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (89, NULL, 'G-1T-1', 'G-1T-1', '그로밋 패킹 - G-1T-1', NULL, NULL, '/images/G-Rubber & Seals/', 38, 3, true, true, '2025-06-10 02:59:34.091', '2025-06-10 02:59:34.091');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (90, NULL, 'G-1T-2', 'G-1T-2', '그로밋 패킹 - G-1T-2', NULL, NULL, '/images/G-Rubber & Seals/', 38, 4, true, true, '2025-06-10 02:59:34.092', '2025-06-10 02:59:34.092');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (91, NULL, 'MDSI-G-1T2', 'MDSI-G-1T2', '그로밋 패킹 - MDSI-G-1T2', NULL, NULL, '/images/G-Rubber & Seals/', 38, 5, true, true, '2025-06-10 02:59:34.092', '2025-06-10 02:59:34.092');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (92, NULL, 'MDSI-G-1T3', 'MDSI-G-1T3', '그로밋 패킹 - MDSI-G-1T3', NULL, NULL, '/images/G-Rubber & Seals/', 38, 6, true, true, '2025-06-10 02:59:34.093', '2025-06-10 02:59:34.093');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (93, NULL, 'G-020', 'G-020', '홀 패킹 - G-020', NULL, NULL, '/images/G-Rubber & Seals/', 39, 0, true, true, '2025-06-10 02:59:34.094', '2025-06-10 02:59:34.094');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (94, NULL, 'G-0202', 'G-0202', '홀 패킹 - G-0202', NULL, NULL, '/images/G-Rubber & Seals/', 39, 1, true, true, '2025-06-10 02:59:34.094', '2025-06-10 02:59:34.094');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (95, NULL, 'G-050', 'G-050', '홀 패킹 - G-050', NULL, NULL, '/images/G-Rubber & Seals/', 39, 2, true, true, '2025-06-10 02:59:34.095', '2025-06-10 02:59:34.095');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (96, NULL, 'G-025', 'G-025', '고무 씰 - G-025', NULL, NULL, '/images/G-Rubber & Seals/', 40, 0, true, true, '2025-06-10 02:59:34.096', '2025-06-10 02:59:34.096');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (97, NULL, 'G-026', 'G-026', '고무 씰 - G-026', NULL, NULL, '/images/G-Rubber & Seals/', 40, 1, true, true, '2025-06-10 02:59:34.096', '2025-06-10 02:59:34.096');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (98, NULL, 'G-027', 'G-027', '고무 씰 - G-027', NULL, NULL, '/images/G-Rubber & Seals/', 40, 2, true, true, '2025-06-10 02:59:34.097', '2025-06-10 02:59:34.097');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (99, NULL, 'G-028-1,029-1', 'G-028-1,029-1', '고무 씰 - G-028-1,029-1', NULL, NULL, '/images/G-Rubber & Seals/', 40, 3, true, true, '2025-06-10 02:59:34.098', '2025-06-10 02:59:34.098');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (100, NULL, 'G-028-1', 'G-028-1', '고무 씰 - G-028-1', NULL, NULL, '/images/G-Rubber & Seals/', 40, 4, true, true, '2025-06-10 02:59:34.098', '2025-06-10 02:59:34.098');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (101, NULL, 'G-028', 'G-028', '고무 씰 - G-028', NULL, NULL, '/images/G-Rubber & Seals/', 40, 5, true, true, '2025-06-10 02:59:34.099', '2025-06-10 02:59:34.099');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (102, NULL, 'G-029-1', 'G-029-1', '고무 씰 - G-029-1', NULL, NULL, '/images/G-Rubber & Seals/', 40, 6, true, true, '2025-06-10 02:59:34.099', '2025-06-10 02:59:34.099');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (103, NULL, 'G-029-2', 'G-029-2', '고무 씰 - G-029-2', NULL, NULL, '/images/G-Rubber & Seals/', 40, 7, true, true, '2025-06-10 02:59:34.1', '2025-06-10 02:59:34.1');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (104, NULL, 'G-029', 'G-029', '고무 씰 - G-029', NULL, NULL, '/images/G-Rubber & Seals/', 40, 8, true, true, '2025-06-10 02:59:34.1', '2025-06-10 02:59:34.1');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (105, NULL, 'G-030,031', 'G-030,031', '고무 씰 - G-030,031', NULL, NULL, '/images/G-Rubber & Seals/', 40, 9, true, true, '2025-06-10 02:59:34.101', '2025-06-10 02:59:34.101');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (106, NULL, 'G-024', 'G-024', '기타 패킹 - G-024', NULL, NULL, '/images/G-Rubber & Seals/', 41, 0, true, true, '2025-06-10 02:59:34.102', '2025-06-10 02:59:34.102');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (107, NULL, 'MDSI-G-22T-1', 'MDSI-G-22T-1', '기타 패킹 - MDSI-G-22T-1', NULL, NULL, '/images/G-Rubber & Seals/', 41, 1, true, true, '2025-06-10 02:59:34.102', '2025-06-10 02:59:34.102');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (108, NULL, 'MDSI-G-22T', 'MDSI-G-22T', '기타 패킹 - MDSI-G-22T', NULL, NULL, '/images/G-Rubber & Seals/', 41, 2, true, true, '2025-06-10 02:59:34.103', '2025-06-10 02:59:34.103');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (109, NULL, 'G-010', 'G-010', '플레인 패킹 - G-010', NULL, NULL, '/images/G-Rubber & Seals/', 42, 0, true, true, '2025-06-10 02:59:34.104', '2025-06-10 02:59:34.104');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (110, NULL, 'G-011', 'G-011', '플레인 패킹 - G-011', NULL, NULL, '/images/G-Rubber & Seals/', 42, 1, true, true, '2025-06-10 02:59:34.104', '2025-06-10 02:59:34.104');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (111, NULL, 'G-040-1', 'G-040-1', '플레인 패킹 - G-040-1', NULL, NULL, '/images/G-Rubber & Seals/', 42, 2, true, true, '2025-06-10 02:59:34.105', '2025-06-10 02:59:34.105');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (112, NULL, 'G-040', 'G-040', '플레인 패킹 - G-040', NULL, NULL, '/images/G-Rubber & Seals/', 42, 3, true, true, '2025-06-10 02:59:34.105', '2025-06-10 02:59:34.105');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (113, NULL, 'H-1005', 'H-1005', '케이스 핸들 - H-1005', NULL, NULL, '/images/H-Handle & Grip/', 44, 0, true, true, '2025-06-10 02:59:34.107', '2025-06-10 02:59:34.107');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (114, NULL, 'H-1006-1', 'H-1006-1', '케이스 핸들 - H-1006-1', NULL, NULL, '/images/H-Handle & Grip/', 44, 1, true, true, '2025-06-10 02:59:34.107', '2025-06-10 02:59:34.107');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (115, NULL, 'H-1007S-1', 'H-1007S-1', '케이스 핸들 - H-1007S-1', NULL, NULL, '/images/H-Handle & Grip/', 44, 2, true, true, '2025-06-10 02:59:34.108', '2025-06-10 02:59:34.108');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (116, NULL, 'H-350-1', 'H-350-1', '케이스 핸들 - H-350-1', NULL, NULL, '/images/H-Handle & Grip/', 44, 3, true, true, '2025-06-10 02:59:34.108', '2025-06-10 02:59:34.108');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (117, NULL, 'H-360-1', 'H-360-1', '케이스 핸들 - H-360-1', NULL, NULL, '/images/H-Handle & Grip/', 44, 4, true, true, '2025-06-10 02:59:34.109', '2025-06-10 02:59:34.109');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (118, NULL, 'H-370-1', 'H-370-1', '케이스 핸들 - H-370-1', NULL, NULL, '/images/H-Handle & Grip/', 44, 5, true, true, '2025-06-10 02:59:34.109', '2025-06-10 02:59:34.109');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (119, NULL, 'H-717', 'H-717', '케이스 핸들 - H-717', NULL, NULL, '/images/H-Handle & Grip/', 44, 6, true, true, '2025-06-10 02:59:34.11', '2025-06-10 02:59:34.11');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (120, NULL, 'MDSI-C-3T', 'MDSI-C-3T', '케이스 핸들 - MDSI-C-3T', NULL, NULL, '/images/H-Handle & Grip/', 44, 7, true, true, '2025-06-10 02:59:34.11', '2025-06-10 02:59:34.11');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (121, NULL, 'DK-H-285', 'DK-H-285', '인서트 핸들 - DK-H-285', NULL, NULL, '/images/H-Handle & Grip/', 45, 0, true, true, '2025-06-10 02:59:34.111', '2025-06-10 02:59:34.111');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (122, NULL, 'H-141', 'H-141', '인서트 핸들 - H-141', NULL, NULL, '/images/H-Handle & Grip/', 45, 1, true, true, '2025-06-10 02:59:34.112', '2025-06-10 02:59:34.112');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (123, NULL, 'H-142', 'H-142', '인서트 핸들 - H-142', NULL, NULL, '/images/H-Handle & Grip/', 45, 2, true, true, '2025-06-10 02:59:34.112', '2025-06-10 02:59:34.112');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (124, NULL, 'H-142M', 'H-142M', '인서트 핸들 - H-142M', NULL, NULL, '/images/H-Handle & Grip/', 45, 3, true, true, '2025-06-10 02:59:34.113', '2025-06-10 02:59:34.113');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (125, NULL, 'H-143', 'H-143', '인서트 핸들 - H-143', NULL, NULL, '/images/H-Handle & Grip/', 45, 4, true, true, '2025-06-10 02:59:34.114', '2025-06-10 02:59:34.114');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (126, NULL, 'H-143M', 'H-143M', '인서트 핸들 - H-143M', NULL, NULL, '/images/H-Handle & Grip/', 45, 5, true, true, '2025-06-10 02:59:34.114', '2025-06-10 02:59:34.114');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (127, NULL, 'H-145', 'H-145', '인서트 핸들 - H-145', NULL, NULL, '/images/H-Handle & Grip/', 45, 6, true, true, '2025-06-10 02:59:34.115', '2025-06-10 02:59:34.115');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (128, NULL, 'H-283', 'H-283', '인서트 핸들 - H-283', NULL, NULL, '/images/H-Handle & Grip/', 45, 7, true, true, '2025-06-10 02:59:34.115', '2025-06-10 02:59:34.115');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (129, NULL, 'H-306', 'H-306', '인서트 핸들 - H-306', NULL, NULL, '/images/H-Handle & Grip/', 45, 8, true, true, '2025-06-10 02:59:34.116', '2025-06-10 02:59:34.116');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (130, NULL, 'H-307', 'H-307', '인서트 핸들 - H-307', NULL, NULL, '/images/H-Handle & Grip/', 45, 9, true, true, '2025-06-10 02:59:34.116', '2025-06-10 02:59:34.116');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (131, NULL, 'H-360', 'H-360', '기타 - H-360', NULL, NULL, '/images/H-Handle & Grip/', 46, 0, true, true, '2025-06-10 02:59:34.117', '2025-06-10 02:59:34.117');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (132, NULL, 'H-370', 'H-370', '기타 - H-370', NULL, NULL, '/images/H-Handle & Grip/', 46, 1, true, true, '2025-06-10 02:59:34.118', '2025-06-10 02:59:34.118');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (133, NULL, 'H-431', 'H-431', '기타 - H-431', NULL, NULL, '/images/H-Handle & Grip/', 46, 2, true, true, '2025-06-10 02:59:34.118', '2025-06-10 02:59:34.118');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (134, NULL, 'H-450', 'H-450', '기타 - H-450', NULL, NULL, '/images/H-Handle & Grip/', 46, 3, true, true, '2025-06-10 02:59:34.118', '2025-06-10 02:59:34.118');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (135, NULL, 'H-452', 'H-452', '기타 - H-452', NULL, NULL, '/images/H-Handle & Grip/', 46, 4, true, true, '2025-06-10 02:59:34.119', '2025-06-10 02:59:34.119');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (136, NULL, 'H-80T', 'H-80T', '기타 - H-80T', NULL, NULL, '/images/H-Handle & Grip/', 46, 5, true, true, '2025-06-10 02:59:34.121', '2025-06-10 02:59:34.121');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (137, NULL, 'H-8T', 'H-8T', '기타 - H-8T', NULL, NULL, '/images/H-Handle & Grip/', 46, 6, true, true, '2025-06-10 02:59:34.121', '2025-06-10 02:59:34.121');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (138, NULL, 'MDSI-D-90T4', 'MDSI-D-90T4', '기타 - MDSI-D-90T4', NULL, NULL, '/images/H-Handle & Grip/', 46, 7, true, true, '2025-06-10 02:59:34.122', '2025-06-10 02:59:34.122');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (139, NULL, 'MDSI-D-9T1', 'MDSI-D-9T1', '기타 - MDSI-D-9T1', NULL, NULL, '/images/H-Handle & Grip/', 46, 8, true, true, '2025-06-10 02:59:34.122', '2025-06-10 02:59:34.122');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (140, NULL, 'MDSI-D-9T2', 'MDSI-D-9T2', '기타 - MDSI-D-9T2', NULL, NULL, '/images/H-Handle & Grip/', 46, 9, true, true, '2025-06-10 02:59:34.123', '2025-06-10 02:59:34.123');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (141, NULL, 'MDSI-D-9T3', 'MDSI-D-9T3', '기타 - MDSI-D-9T3', NULL, NULL, '/images/H-Handle & Grip/', 46, 10, true, true, '2025-06-10 02:59:34.123', '2025-06-10 02:59:34.123');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (142, NULL, 'H-100P-1', 'H-100P-1', 'PVC 핸들 - H-100P-1', NULL, NULL, '/images/H-Handle & Grip/', 47, 0, true, true, '2025-06-10 02:59:34.124', '2025-06-10 02:59:34.124');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (143, NULL, 'H-100S', 'H-100S', 'PVC 핸들 - H-100S', NULL, NULL, '/images/H-Handle & Grip/', 47, 1, true, true, '2025-06-10 02:59:34.125', '2025-06-10 02:59:34.125');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (144, NULL, 'H-150P-2', 'H-150P-2', 'PVC 핸들 - H-150P-2', NULL, NULL, '/images/H-Handle & Grip/', 47, 2, true, true, '2025-06-10 02:59:34.125', '2025-06-10 02:59:34.125');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (145, NULL, 'H-150P', 'H-150P', 'PVC 핸들 - H-150P', NULL, NULL, '/images/H-Handle & Grip/', 47, 3, true, true, '2025-06-10 02:59:34.126', '2025-06-10 02:59:34.126');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (146, NULL, 'H-250P', 'H-250P', 'PVC 핸들 - H-250P', NULL, NULL, '/images/H-Handle & Grip/', 47, 4, true, true, '2025-06-10 02:59:34.127', '2025-06-10 02:59:34.127');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (147, NULL, 'H-2T', 'H-2T', 'PVC 핸들 - H-2T', NULL, NULL, '/images/H-Handle & Grip/', 47, 5, true, true, '2025-06-10 02:59:34.127', '2025-06-10 02:59:34.127');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (148, NULL, 'H-75P', 'H-75P', 'PVC 핸들 - H-75P', NULL, NULL, '/images/H-Handle & Grip/', 47, 6, true, true, '2025-06-10 02:59:34.127', '2025-06-10 02:59:34.127');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (149, NULL, 'H-10100S', 'H-10100S', '풀 핸들 - H-10100S', NULL, NULL, '/images/H-Handle & Grip/', 48, 0, true, true, '2025-06-10 02:59:34.129', '2025-06-10 02:59:34.129');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (150, NULL, 'H-610', 'H-610', '풀 핸들 - H-610', NULL, NULL, '/images/H-Handle & Grip/', 48, 1, true, true, '2025-06-10 02:59:34.129', '2025-06-10 02:59:34.129');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (151, NULL, 'H-620', 'H-620', '풀 핸들 - H-620', NULL, NULL, '/images/H-Handle & Grip/', 48, 2, true, true, '2025-06-10 02:59:34.13', '2025-06-10 02:59:34.13');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (152, NULL, 'MDSI-C-4T', 'MDSI-C-4T', '풀 핸들 - MDSI-C-4T', NULL, NULL, '/images/H-Handle & Grip/', 48, 3, true, true, '2025-06-10 02:59:34.13', '2025-06-10 02:59:34.13');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (153, NULL, 'P-3040', 'P-3040', '그립 & 노브 - P-3040', NULL, NULL, '/images/H-Handle & Grip/', 49, 0, true, true, '2025-06-10 02:59:34.131', '2025-06-10 02:59:34.131');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (154, NULL, 'P-3050P', 'P-3050P', '그립 & 노브 - P-3050P', NULL, NULL, '/images/H-Handle & Grip/', 49, 1, true, true, '2025-06-10 02:59:34.132', '2025-06-10 02:59:34.132');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (155, NULL, 'P-3090', 'P-3090', '그립 & 노브 - P-3090', NULL, NULL, '/images/H-Handle & Grip/', 49, 2, true, true, '2025-06-10 02:59:34.132', '2025-06-10 02:59:34.132');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (156, NULL, 'P-6080', 'P-6080', '그립 & 노브 - P-6080', NULL, NULL, '/images/H-Handle & Grip/', 49, 3, true, true, '2025-06-10 02:59:34.133', '2025-06-10 02:59:34.133');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (157, NULL, 'P-6080수정사진', 'P-6080수정사진', '그립 & 노브 - P-6080수정사진', NULL, NULL, '/images/H-Handle & Grip/', 49, 4, true, true, '2025-06-10 02:59:34.133', '2025-06-10 02:59:34.133');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (158, NULL, 'B-2T, 3T', 'B-2T, 3T', '해양 부품 - B-2T, 3T', NULL, NULL, '/images/M-Marine part/', 51, 0, true, true, '2025-06-10 02:59:34.134', '2025-06-10 02:59:34.134');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (159, NULL, 'B-4T,5T', 'B-4T,5T', '해양 부품 - B-4T,5T', NULL, NULL, '/images/M-Marine part/', 51, 1, true, true, '2025-06-10 02:59:34.135', '2025-06-10 02:59:34.135');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (160, NULL, 'B-7T', 'B-7T', '해양 부품 - B-7T', NULL, NULL, '/images/M-Marine part/', 51, 2, true, true, '2025-06-10 02:59:34.135', '2025-06-10 02:59:34.135');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (161, NULL, 'B-8T', 'B-8T', '해양 부품 - B-8T', NULL, NULL, '/images/M-Marine part/', 51, 3, true, true, '2025-06-10 02:59:34.136', '2025-06-10 02:59:34.136');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (162, NULL, 'B-9T,10T', 'B-9T,10T', '해양 부품 - B-9T,10T', NULL, NULL, '/images/M-Marine part/', 51, 4, true, true, '2025-06-10 02:59:34.136', '2025-06-10 02:59:34.136');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (163, NULL, 'P-1400', 'P-1400', '정밀 부품 - P-1400', NULL, NULL, '/images/P-Precision part/', 53, 0, true, true, '2025-06-10 02:59:34.138', '2025-06-10 02:59:34.138');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (164, NULL, 'P-1500', 'P-1500', '정밀 부품 - P-1500', NULL, NULL, '/images/P-Precision part/', 53, 1, true, true, '2025-06-10 02:59:34.138', '2025-06-10 02:59:34.138');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (165, NULL, 'P-1550', 'P-1550', '정밀 부품 - P-1550', NULL, NULL, '/images/P-Precision part/', 53, 2, true, true, '2025-06-10 02:59:34.139', '2025-06-10 02:59:34.139');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (166, NULL, 'P-1620', 'P-1620', '정밀 부품 - P-1620', NULL, NULL, '/images/P-Precision part/', 53, 3, true, true, '2025-06-10 02:59:34.14', '2025-06-10 02:59:34.14');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (167, NULL, 'S-365B-1사진수정', 'S-365B-1사진수정', '가스 스프링 - S-365B-1사진수정', NULL, NULL, '/images/S-Stay & Sliderail/', 55, 0, true, true, '2025-06-10 02:59:34.142', '2025-06-10 02:59:34.142');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (168, NULL, 'S-365사진수정', 'S-365사진수정', '가스 스프링 - S-365사진수정', NULL, NULL, '/images/S-Stay & Sliderail/', 55, 1, true, true, '2025-06-10 02:59:34.142', '2025-06-10 02:59:34.142');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (169, NULL, 'S-460-2', 'S-460-2', '가스 스프링 - S-460-2', NULL, NULL, '/images/S-Stay & Sliderail/', 55, 2, true, true, '2025-06-10 02:59:34.143', '2025-06-10 02:59:34.143');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (170, NULL, 'C-3521', 'C-3521', '슬라이드 레일 - C-3521', NULL, NULL, '/images/S-Stay & Sliderail/', 56, 0, true, true, '2025-06-10 02:59:34.143', '2025-06-10 02:59:34.143');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (171, NULL, 'C-3531', 'C-3531', '슬라이드 레일 - C-3531', NULL, NULL, '/images/S-Stay & Sliderail/', 56, 1, true, true, '2025-06-10 02:59:34.144', '2025-06-10 02:59:34.144');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (172, NULL, 'S-137-1,2,3', 'S-137-1,2,3', '스테이 - S-137-1,2,3', NULL, NULL, '/images/S-Stay & Sliderail/', 57, 0, true, true, '2025-06-10 02:59:34.145', '2025-06-10 02:59:34.145');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (173, NULL, 'S-137-123', 'S-137-123', '스테이 - S-137-123', NULL, NULL, '/images/S-Stay & Sliderail/', 57, 1, true, true, '2025-06-10 02:59:34.145', '2025-06-10 02:59:34.145');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (174, NULL, 'S-1453', 'S-1453', '스테이 - S-1453', NULL, NULL, '/images/S-Stay & Sliderail/', 57, 2, true, true, '2025-06-10 02:59:34.146', '2025-06-10 02:59:34.146');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (175, NULL, 'S-1454', 'S-1454', '스테이 - S-1454', NULL, NULL, '/images/S-Stay & Sliderail/', 57, 3, true, true, '2025-06-10 02:59:34.146', '2025-06-10 02:59:34.146');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (176, NULL, 'S-1454사진수정', 'S-1454사진수정', '스테이 - S-1454사진수정', NULL, NULL, '/images/S-Stay & Sliderail/', 57, 4, true, true, '2025-06-10 02:59:34.147', '2025-06-10 02:59:34.147');
INSERT INTO public."Product" (id, code, name, model, description, specifications, price, "imageUrl", "categoryId", "orderIndex", "isPublished", "isActive", "createdAt", "updatedAt") VALUES (177, NULL, 'S-7T-2', 'S-7T-2', '스테이 - S-7T-2', NULL, NULL, '/images/S-Stay & Sliderail/', 57, 5, true, true, '2025-06-10 02:59:34.147', '2025-06-10 02:59:34.147');


--
-- Data for Name: ProductImage; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: SiteConfig; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (1, 'site_name', '대경하드웨어', '사이트 이름', '2025-06-10 02:59:22.953', '2025-06-10 02:59:22.953');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (2, 'site_description', '하드웨어 소재 전문기업', '사이트 설명', '2025-06-10 02:59:22.956', '2025-06-10 02:59:22.956');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (3, 'contact_email', 'dkhw6789@naver.com', '대표 이메일', '2025-06-10 02:59:22.956', '2025-06-10 02:59:22.956');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (4, 'contact_phone', '055-333-6790~1', '대표 전화번호', '2025-06-10 02:59:22.957', '2025-06-10 02:59:22.957');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (5, 'contact_address', '경남 김해시 삼안로 112번길 9-14', '회사 주소', '2025-06-10 02:59:22.958', '2025-06-10 02:59:22.958');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (6, 'siteName', '대경하드웨어', '사이트명', '2025-06-10 02:59:28.035', '2025-06-10 02:59:28.035');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (7, 'siteDescription', '하드웨어 소재 전문기업', '사이트 설명', '2025-06-10 02:59:28.036', '2025-06-10 02:59:28.036');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (8, 'contactEmail', 'dkhw6789@naver.com', '연락처 이메일', '2025-06-10 02:59:28.036', '2025-06-10 02:59:28.036');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (9, 'contactPhone', '055-333-6790~1', '연락처 전화번호', '2025-06-10 02:59:28.036', '2025-06-10 02:59:28.036');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (10, 'contactAddress', '경남 김해시 삼안로 112번길 9-14', '회사 주소', '2025-06-10 02:59:28.037', '2025-06-10 02:59:28.037');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (11, 'heroType', 'slides', '히어로 섹션 타입', '2025-06-10 02:59:28.037', '2025-06-10 02:59:28.037');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (12, 'heroVideoUrl', '', '히어로 비디오 URL', '2025-06-10 02:59:28.038', '2025-06-10 02:59:28.038');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (13, 'heroVideoOverlay', '10', '히어로 비디오 오버레이', '2025-06-10 02:59:28.038', '2025-06-10 02:59:28.038');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (14, 'heroTitle', '대한민국 대표 하드웨어 소재 전문기업', '히어로 타이틀', '2025-06-10 02:59:28.039', '2025-06-10 02:59:28.039');
INSERT INTO public."SiteConfig" (id, key, value, description, "createdAt", "updatedAt") VALUES (15, 'heroSubtitle', '대경하드웨어는 30년 이상의 경험과 기술력을 바탕으로 다양한 산업 분야에 최고 품질의 하드웨어 소재를 공급하고 있습니다.', '히어로 서브타이틀', '2025-06-10 02:59:28.039', '2025-06-10 02:59:28.039');


--
-- Data for Name: VisitorStats; Type: TABLE DATA; Schema: public; Owner: -
--



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
-- PostgreSQL database dump complete
--

