--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-01-02 21:07:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16521)
-- Name: Camp_Data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Camp_Data" (
    "Id" integer NOT NULL,
    "CampAdminId" integer,
    "Name" character varying,
    "Description" character varying,
    "LocationAddress" character varying,
    "CreatedBy" integer,
    "CreatedOn" date,
    "UpdatedBy" integer,
    "UpdatedOn" date,
    "IsDeleted" boolean,
    "District" character varying
);


ALTER TABLE public."Camp_Data" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16526)
-- Name: Camp_Data_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Camp_Data_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Camp_Data_Id_seq" OWNER TO postgres;

--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 218
-- Name: Camp_Data_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Camp_Data_Id_seq" OWNED BY public."Camp_Data"."Id";


--
-- TOC entry 219 (class 1259 OID 16527)
-- Name: Camp_Volunteers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Camp_Volunteers" (
    "Id" integer NOT NULL,
    "UserId" integer,
    "CampId" integer,
    "CreatedBy" integer,
    "CreatedOn" date,
    "UpdatedBy" integer,
    "UpdatedOn" date,
    "IsDeleted" boolean
);


ALTER TABLE public."Camp_Volunteers" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16530)
-- Name: Camp_Volunteers_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Camp_Volunteers_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Camp_Volunteers_Id_seq" OWNER TO postgres;

--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 220
-- Name: Camp_Volunteers_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Camp_Volunteers_Id_seq" OWNED BY public."Camp_Volunteers"."Id";


--
-- TOC entry 221 (class 1259 OID 16531)
-- Name: Items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Items" (
    "Id" integer NOT NULL,
    "Name" character varying,
    "Description" character varying,
    "CreatedBy" integer,
    "CreatedOn" date,
    "UpdatedBy" integer,
    "UpdatedOn" date,
    "IsDeleted" boolean,
    "PostedDate" date
);


ALTER TABLE public."Items" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16536)
-- Name: Items_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Items_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Items_Id_seq" OWNER TO postgres;

--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 222
-- Name: Items_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Items_Id_seq" OWNED BY public."Items"."Id";


--
-- TOC entry 223 (class 1259 OID 16537)
-- Name: Orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Orders" (
    "Id" integer NOT NULL,
    "RequirementId" integer,
    "StatusId" integer,
    "UserId" integer,
    "Quantity" integer,
    "CreatedBy" integer,
    "CreatedOn" date,
    "UpdatedBy" integer,
    "UpdatedOn" date,
    "IsDeleted" boolean
);


ALTER TABLE public."Orders" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16540)
-- Name: Orders_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Orders_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Orders_Id_seq" OWNER TO postgres;

--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 224
-- Name: Orders_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Orders_Id_seq" OWNED BY public."Orders"."Id";


--
-- TOC entry 225 (class 1259 OID 16541)
-- Name: Requirement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Requirement" (
    "Id" integer NOT NULL,
    "ItemId" integer,
    "CampId" integer,
    "StatusId" integer,
    "RequiredQuantity" integer,
    "AchievedQuantity" integer,
    "CreatedBy" integer,
    "CreatedOn" date,
    "UpdatedBy" integer[],
    "UpdatedOn" date,
    "IsDeleted" boolean
);


ALTER TABLE public."Requirement" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16546)
-- Name: Requirement Comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Requirement Comment" (
    "Id" integer NOT NULL,
    "RequirementId" integer,
    "UserId" integer,
    "Comment" text,
    "CreatedBy" integer,
    "CreatedOn" date,
    "UpdatedBy" integer,
    "UpdatedOn" date,
    "IsDeleted" boolean
);


ALTER TABLE public."Requirement Comment" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16551)
-- Name: Requirement Comment_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Requirement Comment_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Requirement Comment_Id_seq" OWNER TO postgres;

--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 227
-- Name: Requirement Comment_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Requirement Comment_Id_seq" OWNED BY public."Requirement Comment"."Id";


--
-- TOC entry 228 (class 1259 OID 16552)
-- Name: Requirement_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Requirement_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Requirement_Id_seq" OWNER TO postgres;

--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 228
-- Name: Requirement_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Requirement_Id_seq" OWNED BY public."Requirement"."Id";


--
-- TOC entry 229 (class 1259 OID 16553)
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    "RoleName" character varying,
    "CreatedBy" integer,
    "CreatedOn" date,
    "UpdatedBy" integer,
    "UpdatedOn" date,
    "IsDeleted" boolean
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16558)
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Role_id_seq" OWNER TO postgres;

--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 230
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- TOC entry 231 (class 1259 OID 16559)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    "Id" integer NOT NULL,
    "FirstName" character varying,
    "LastName" character varying,
    "RoleId" integer,
    "Password" character varying,
    "Email" character varying,
    "Address" character varying,
    "Mobile" bigint,
    "CreatedBy" integer,
    "CreatedOn" date,
    "UpdatedBy" integer,
    "UpdatedOn" date,
    "IsDeleted" boolean
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16564)
-- Name: User_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_Id_seq" OWNER TO postgres;

--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 232
-- Name: User_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_Id_seq" OWNED BY public."User"."Id";


--
-- TOC entry 4730 (class 2604 OID 16565)
-- Name: Camp_Data Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camp_Data" ALTER COLUMN "Id" SET DEFAULT nextval('public."Camp_Data_Id_seq"'::regclass);


--
-- TOC entry 4731 (class 2604 OID 16566)
-- Name: Camp_Volunteers Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camp_Volunteers" ALTER COLUMN "Id" SET DEFAULT nextval('public."Camp_Volunteers_Id_seq"'::regclass);


--
-- TOC entry 4732 (class 2604 OID 16567)
-- Name: Items Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items" ALTER COLUMN "Id" SET DEFAULT nextval('public."Items_Id_seq"'::regclass);


--
-- TOC entry 4733 (class 2604 OID 16568)
-- Name: Orders Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders" ALTER COLUMN "Id" SET DEFAULT nextval('public."Orders_Id_seq"'::regclass);


--
-- TOC entry 4734 (class 2604 OID 16569)
-- Name: Requirement Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirement" ALTER COLUMN "Id" SET DEFAULT nextval('public."Requirement_Id_seq"'::regclass);


--
-- TOC entry 4735 (class 2604 OID 16570)
-- Name: Requirement Comment Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirement Comment" ALTER COLUMN "Id" SET DEFAULT nextval('public."Requirement Comment_Id_seq"'::regclass);


--
-- TOC entry 4736 (class 2604 OID 16571)
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- TOC entry 4737 (class 2604 OID 16572)
-- Name: User Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN "Id" SET DEFAULT nextval('public."User_Id_seq"'::regclass);


--
-- TOC entry 4915 (class 0 OID 16521)
-- Dependencies: 217
-- Data for Name: Camp_Data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Camp_Data" ("Id", "CampAdminId", "Name", "Description", "LocationAddress", "CreatedBy", "CreatedOn", "UpdatedBy", "UpdatedOn", "IsDeleted", "District") FROM stdin;
15	1	palakkad123	hytjku	dfsghj	\N	\N	\N	\N	\N	palakkad
18	4	valanchery123	hhhjh	fghdm	\N	\N	\N	\N	\N	malappuram
19	6	chooralmala	thhn	jhfhfg	\N	\N	\N	\N	\N	wayanad
20	6	pattambi	uyurt	rrtyt	\N	\N	\N	\N	\N	palakkad
89	1	Thiruvananthapuram Relief Camp	Providing shelter and food for flood victims	Location Address 1	\N	2025-01-02	\N	\N	f	Thiruvananthapuram
90	4	Kollam Support Center	Offering medical aid and basic necessities	Location Address 2	\N	2025-01-02	\N	\N	f	Kollam
91	6	Pathanamthitta Refugee Camp	Temporary housing and food supplies	Location Address 3	\N	2025-01-02	\N	\N	f	Pathanamthitta
92	1	Alappuzha Flood Relief	Assisting with flood recovery and rehabilitation	Location Address 4	\N	2025-01-02	\N	\N	f	Alappuzha
93	4	Kottayam Emergency Shelter	Emergency shelter and food distribution	Location Address 5	\N	2025-01-02	\N	\N	f	Kottayam
94	6	Idukki Disaster Relief	Providing aid and support for disaster victims	Location Address 6	\N	2025-01-02	\N	\N	f	Idukki
95	1	Ernakulam Aid Center	Offering medical aid and food supplies	Location Address 7	\N	2025-01-02	\N	\N	f	Ernakulam
96	4	Thrissur Relief Camp	Temporary housing and basic necessities	Location Address 8	\N	2025-01-02	\N	\N	f	Thrissur
97	6	Palakkad Support Camp	Providing shelter and food for displaced families	Location Address 9	\N	2025-01-02	\N	\N	f	Palakkad
98	1	Malappuram Emergency Relief	Assisting with emergency relief and recovery	Location Address 10	\N	2025-01-02	\N	\N	f	Malappuram
99	4	Kozhikode Refugee Center	Temporary housing and medical aid	Location Address 11	\N	2025-01-02	\N	\N	f	Kozhikode
100	6	Wayanad Disaster Support	Providing aid and support for disaster victims	Location Address 12	\N	2025-01-02	\N	\N	f	Wayanad
101	1	Kannur Relief Camp	Offering shelter and food for flood victims	Location Address 13	\N	2025-01-02	\N	\N	f	Kannur
102	4	Kasaragod Support Center	Assisting with flood recovery and rehabilitation	Location Address 14	\N	2025-01-02	\N	\N	f	Kasaragod
103	6	Thiruvananthapuram Aid Camp	Providing medical aid and basic necessities	Location Address 15	\N	2025-01-02	\N	\N	f	Thiruvananthapuram
104	1	Kollam Relief Shelter	Temporary housing and food distribution	Location Address 16	\N	2025-01-02	\N	\N	f	Kollam
105	4	Pathanamthitta Emergency Camp	Offering shelter and food for displaced families	Location Address 17	\N	2025-01-02	\N	\N	f	Pathanamthitta
106	6	Alappuzha Support Camp	Providing aid and support for disaster victims	Location Address 18	\N	2025-01-02	\N	\N	f	Alappuzha
107	1	Kottayam Disaster Relief	Assisting with emergency relief and recovery	Location Address 19	\N	2025-01-02	\N	\N	f	Kottayam
108	4	Idukki Refugee Camp	Temporary housing and medical aid	Location Address 20	\N	2025-01-02	\N	\N	f	Idukki
109	6	Ernakulam Emergency Support	Providing shelter and food for flood victims	Location Address 21	\N	2025-01-02	\N	\N	f	Ernakulam
110	1	Thrissur Aid Center	Offering medical aid and basic necessities	Location Address 22	\N	2025-01-02	\N	\N	f	Thrissur
111	4	Palakkad Relief Camp	Temporary housing and food distribution	Location Address 23	\N	2025-01-02	\N	\N	f	Palakkad
112	6	Malappuram Support Shelter	Providing shelter and food for displaced families	Location Address 24	\N	2025-01-02	\N	\N	f	Malappuram
113	1	Kozhikode Disaster Relief	Assisting with emergency relief and recovery	Location Address 25	\N	2025-01-02	\N	\N	f	Kozhikode
114	4	Wayanad Refugee Center	Temporary housing and medical aid	Location Address 26	\N	2025-01-02	\N	\N	f	Wayanad
115	6	Kannur Emergency Support	Providing aid and support for disaster victims	Location Address 27	\N	2025-01-02	\N	\N	f	Kannur
116	1	Kasaragod Relief Shelter	Offering shelter and food for flood victims	Location Address 28	\N	2025-01-02	\N	\N	f	Kasaragod
117	4	Thiruvananthapuram Support Camp	Assisting with flood recovery and rehabilitation	Location Address 29	\N	2025-01-02	\N	\N	f	Thiruvananthapuram
118	6	Kollam Aid Center	Providing medical aid and basic necessities	Location Address 30	\N	2025-01-02	\N	\N	f	Kollam
119	1	Pathanamthitta Relief Camp	Temporary housing and food distribution	Location Address 31	\N	2025-01-02	\N	\N	f	Pathanamthitta
120	4	Alappuzha Emergency Shelter	Offering shelter and food for displaced families	Location Address 32	\N	2025-01-02	\N	\N	f	Alappuzha
121	6	Kottayam Support Camp	Providing aid and support for disaster victims	Location Address 33	\N	2025-01-02	\N	\N	f	Kottayam
122	1	Idukki Disaster Relief	Assisting with emergency relief and recovery	Location Address 34	\N	2025-01-02	\N	\N	f	Idukki
123	4	Ernakulam Refugee Camp	Temporary housing and medical aid	Location Address 35	\N	2025-01-02	\N	\N	f	Ernakulam
124	6	Thrissur Emergency Support	Providing shelter and food for flood victims	Location Address 36	\N	2025-01-02	\N	\N	f	Thrissur
125	1	Palakkad Aid Center	Offering medical aid and basic necessities	Location Address 37	\N	2025-01-02	\N	\N	f	Palakkad
126	4	Malappuram Relief Camp	Temporary housing and food distribution	Location Address 38	\N	2025-01-02	\N	\N	f	Malappuram
127	6	Kozhikode Support Shelter	Providing shelter and food for displaced families	Location Address 39	\N	2025-01-02	\N	\N	f	Kozhikode
128	1	Wayanad Disaster Relief	Assisting with emergency relief and recovery	Location Address 40	\N	2025-01-02	\N	\N	f	Wayanad
129	4	Kannur Refugee Center	Temporary housing and medical aid	Location Address 41	\N	2025-01-02	\N	\N	f	Kannur
130	6	Kasaragod Emergency Support	Providing aid and support for disaster victims	Location Address 42	\N	2025-01-02	\N	\N	f	Kasaragod
\.


--
-- TOC entry 4917 (class 0 OID 16527)
-- Dependencies: 219
-- Data for Name: Camp_Volunteers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Camp_Volunteers" ("Id", "UserId", "CampId", "CreatedBy", "CreatedOn", "UpdatedBy", "UpdatedOn", "IsDeleted") FROM stdin;
1	1	\N	\N	\N	\N	\N	\N
3	6	\N	\N	\N	\N	\N	\N
6	6	\N	\N	\N	\N	\N	\N
4	4	\N	\N	\N	\N	\N	\N
5	4	\N	\N	\N	\N	\N	\N
\.


--
-- TOC entry 4919 (class 0 OID 16531)
-- Dependencies: 221
-- Data for Name: Items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Items" ("Id", "Name", "Description", "CreatedBy", "CreatedOn", "UpdatedBy", "UpdatedOn", "IsDeleted", "PostedDate") FROM stdin;
13	 Men's Cloths	Shirts,Pants,shorts,etc	\N	\N	\N	\N	\N	\N
14	 Women's Cloths	Tops,Pants,skirts,etc	\N	\N	\N	\N	\N	\N
15	 Furnitures	Table,chair,beds,etc	\N	\N	\N	\N	\N	\N
16	 Food Items	Fruits,vegitables,proteins,etc	\N	\N	\N	\N	\N	\N
17	 Electronics	phone, torch,tv,etc	\N	\N	\N	\N	\N	\N
18	 Education	Books,pen,box,etc	\N	\N	\N	\N	\N	\N
21	Bed	Single beds for sleeping	\N	2025-01-02	\N	\N	f	2025-01-02
22	Torch	Battery-operated torches for lighting	\N	2025-01-02	\N	\N	f	2025-01-02
23	Chair	Plastic chairs for seating	\N	2025-01-02	\N	\N	f	2025-01-02
24	Blanket	Warm blankets for cold weather	\N	2025-01-02	\N	\N	f	2025-01-02
25	First Aid Kit	Basic first aid supplies	\N	2025-01-02	\N	\N	f	2025-01-02
26	Water Bottle	Reusable water bottles	\N	2025-01-02	\N	\N	f	2025-01-02
27	Tent	Temporary tents for shelter	\N	2025-01-02	\N	\N	f	2025-01-02
28	Food Pack	Non-perishable food items	\N	2025-01-02	\N	\N	f	2025-01-02
29	Clothing	Basic clothing items	\N	2025-01-02	\N	\N	f	2025-01-02
30	Sleeping Bag	Sleeping bags for warmth	\N	2025-01-02	\N	\N	f	2025-01-02
31	Flashlight	Handheld flashlights	\N	2025-01-02	\N	\N	f	2025-01-02
32	Cooking Stove	Portable cooking stoves	\N	2025-01-02	\N	\N	f	2025-01-02
33	Mosquito Net	Nets to protect against mosquitoes	\N	2025-01-02	\N	\N	f	2025-01-02
34	Sanitary Kit	Sanitary supplies for hygiene	\N	2025-01-02	\N	\N	f	2025-01-02
35	Pillow	Comfortable pillows for sleeping	\N	2025-01-02	\N	\N	f	2025-01-02
36	Towel	Bath towels	\N	2025-01-02	\N	\N	f	2025-01-02
37	Soap	Bars of soap for cleaning	\N	2025-01-02	\N	\N	f	2025-01-02
38	Toothbrush	Toothbrushes for dental hygiene	\N	2025-01-02	\N	\N	f	2025-01-02
39	Toothpaste	Tubes of toothpaste	\N	2025-01-02	\N	\N	f	2025-01-02
40	Shampoo	Bottles of shampoo	\N	2025-01-02	\N	\N	f	2025-01-02
41	Diapers	Disposable diapers for infants	\N	2025-01-02	\N	\N	f	2025-01-02
42	Baby Food	Baby food jars and packets	\N	2025-01-02	\N	\N	f	2025-01-02
43	Hand Sanitizer	Bottles of hand sanitizer	\N	2025-01-02	\N	\N	f	2025-01-02
44	Face Mask	Disposable face masks	\N	2025-01-02	\N	\N	f	2025-01-02
45	Gloves	Disposable gloves	\N	2025-01-02	\N	\N	f	2025-01-02
46	Raincoat	Waterproof raincoats	\N	2025-01-02	\N	\N	f	2025-01-02
47	Umbrella	Portable umbrellas	\N	2025-01-02	\N	\N	f	2025-01-02
48	Laundry Detergent	Packets of laundry detergent	\N	2025-01-02	\N	\N	f	2025-01-02
49	Dish Soap	Bottles of dish soap	\N	2025-01-02	\N	\N	f	2025-01-02
50	Cleaning Supplies	General cleaning supplies	\N	2025-01-02	\N	\N	f	2025-01-02
51	Broom	Brooms for cleaning	\N	2025-01-02	\N	\N	f	2025-01-02
52	Mop	Mops for cleaning	\N	2025-01-02	\N	\N	f	2025-01-02
53	Bucket	Plastic buckets	\N	2025-01-02	\N	\N	f	2025-01-02
54	Dustpan	Dustpans for cleaning	\N	2025-01-02	\N	\N	f	2025-01-02
55	Trash Bags	Rolls of trash bags	\N	2025-01-02	\N	\N	f	2025-01-02
56	Toilet Paper	Rolls of toilet paper	\N	2025-01-02	\N	\N	f	2025-01-02
57	Paper Towels	Rolls of paper towels	\N	2025-01-02	\N	\N	f	2025-01-02
58	Hand Soap	Bottles of hand soap	\N	2025-01-02	\N	\N	f	2025-01-02
59	Disinfectant Wipes	Packets of disinfectant wipes	\N	2025-01-02	\N	\N	f	2025-01-02
60	Laundry Basket	Plastic laundry baskets	\N	2025-01-02	\N	\N	f	2025-01-02
61	Clothesline	Clotheslines for drying clothes	\N	2025-01-02	\N	\N	f	2025-01-02
62	Clothespins	Packets of clothespins	\N	2025-01-02	\N	\N	f	2025-01-02
\.


--
-- TOC entry 4921 (class 0 OID 16537)
-- Dependencies: 223
-- Data for Name: Orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Orders" ("Id", "RequirementId", "StatusId", "UserId", "Quantity", "CreatedBy", "CreatedOn", "UpdatedBy", "UpdatedOn", "IsDeleted") FROM stdin;
3	3	1	7	\N	\N	\N	\N	\N	\N
4	3	1	7	10	\N	\N	\N	\N	\N
2	4	2	7	30	\N	\N	\N	\N	\N
5	3	6	7	20	\N	\N	\N	\N	\N
6	3	6	7	20	\N	\N	\N	\N	\N
7	3	6	5	20	\N	\N	\N	\N	\N
\.


--
-- TOC entry 4923 (class 0 OID 16541)
-- Dependencies: 225
-- Data for Name: Requirement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Requirement" ("Id", "ItemId", "CampId", "StatusId", "RequiredQuantity", "AchievedQuantity", "CreatedBy", "CreatedOn", "UpdatedBy", "UpdatedOn", "IsDeleted") FROM stdin;
12	13	18	1	50	10	\N	2025-01-02	\N	\N	\N
13	14	19	2	20	5	\N	2025-01-02	\N	\N	\N
14	17	20	2	30	15	\N	2025-01-02	\N	\N	\N
15	18	19	2	15	5	\N	2025-01-02	\N	\N	\N
16	21	89	1	100	20	\N	2025-01-02	\N	\N	f
17	22	90	1	50	10	\N	2025-01-02	\N	\N	f
18	23	91	1	200	150	\N	2025-01-02	\N	\N	f
19	24	92	1	300	100	\N	2025-01-02	\N	\N	f
20	25	93	1	50	25	\N	2025-01-02	\N	\N	f
21	26	94	1	500	300	\N	2025-01-02	\N	\N	f
22	27	95	1	100	50	\N	2025-01-02	\N	\N	f
23	28	96	1	1000	700	\N	2025-01-02	\N	\N	f
24	29	97	1	400	200	\N	2025-01-02	\N	\N	f
25	30	98	1	150	75	\N	2025-01-02	\N	\N	f
26	31	99	1	60	30	\N	2025-01-02	\N	\N	f
27	32	100	1	40	20	\N	2025-01-02	\N	\N	f
28	33	101	1	200	100	\N	2025-01-02	\N	\N	f
29	34	102	1	300	150	\N	2025-01-02	\N	\N	f
30	35	103	1	100	50	\N	2025-01-02	\N	\N	f
31	36	104	1	200	100	\N	2025-01-02	\N	\N	f
32	37	105	1	500	250	\N	2025-01-02	\N	\N	f
33	38	106	1	300	150	\N	2025-01-02	\N	\N	f
34	39	107	1	300	150	\N	2025-01-02	\N	\N	f
35	40	108	1	200	100	\N	2025-01-02	\N	\N	f
36	41	109	1	100	50	\N	2025-01-02	\N	\N	f
37	42	110	1	200	100	\N	2025-01-02	\N	\N	f
38	43	111	1	300	150	\N	2025-01-02	\N	\N	f
39	44	112	1	500	250	\N	2025-01-02	\N	\N	f
40	45	113	1	400	200	\N	2025-01-02	\N	\N	f
41	46	114	1	100	50	\N	2025-01-02	\N	\N	f
42	47	115	1	100	50	\N	2025-01-02	\N	\N	f
43	48	116	1	200	100	\N	2025-01-02	\N	\N	f
44	49	117	1	300	150	\N	2025-01-02	\N	\N	f
45	50	118	1	400	200	\N	2025-01-02	\N	\N	f
46	51	119	1	100	50	\N	2025-01-02	\N	\N	f
47	52	120	1	100	50	\N	2025-01-02	\N	\N	f
48	53	121	1	200	100	\N	2025-01-02	\N	\N	f
49	54	122	1	100	50	\N	2025-01-02	\N	\N	f
50	55	123	1	300	150	\N	2025-01-02	\N	\N	f
51	56	124	1	500	250	\N	2025-01-02	\N	\N	f
52	57	125	1	300	150	\N	2025-01-02	\N	\N	f
53	58	126	1	400	200	\N	2025-01-02	\N	\N	f
54	59	127	1	200	100	\N	2025-01-02	\N	\N	f
55	60	128	1	100	50	\N	2025-01-02	\N	\N	f
56	61	129	1	100	50	\N	2025-01-02	\N	\N	f
57	62	130	1	100	50	\N	2025-01-02	\N	\N	f
\.


--
-- TOC entry 4924 (class 0 OID 16546)
-- Dependencies: 226
-- Data for Name: Requirement Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Requirement Comment" ("Id", "RequirementId", "UserId", "Comment", "CreatedBy", "CreatedOn", "UpdatedBy", "UpdatedOn", "IsDeleted") FROM stdin;
\.


--
-- TOC entry 4927 (class 0 OID 16553)
-- Dependencies: 229
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (id, "RoleName", "CreatedBy", "CreatedOn", "UpdatedBy", "UpdatedOn", "IsDeleted") FROM stdin;
1	Master	\N	\N	\N	\N	\N
2	Camp Admin	\N	\N	\N	\N	\N
3	Normal User	\N	\N	\N	\N	\N
4	volunteers	\N	\N	\N	\N	\N
5	campAdmin	\N	\N	\N	\N	\N
\.


--
-- TOC entry 4929 (class 0 OID 16559)
-- Dependencies: 231
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" ("Id", "FirstName", "LastName", "RoleId", "Password", "Email", "Address", "Mobile", "CreatedBy", "CreatedOn", "UpdatedBy", "UpdatedOn", "IsDeleted") FROM stdin;
1	dhilsha	pappay	2	newpassword123	dhilshapappay@example.com	123 Main St	1234567890	\N	\N	\N	\N	\N
4	gfhmhg	hgm	1	5566787	sdggkl	thjykuli	5365787988	\N	\N	\N	\N	\N
7	Afi	mol	1	875646787	terrewergjhf@gmail.com	karathanathodiyil	6579567423	\N	\N	\N	\N	\N
6	ameertest	pappay	2	newpassword123	ameerpappay@example.com	123 Main St	3546879085	\N	\N	\N	\N	\N
9	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 218
-- Name: Camp_Data_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Camp_Data_Id_seq"', 130, true);


--
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 220
-- Name: Camp_Volunteers_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Camp_Volunteers_Id_seq"', 6, true);


--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 222
-- Name: Items_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Items_Id_seq"', 62, true);


--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 224
-- Name: Orders_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Orders_Id_seq"', 7, true);


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 227
-- Name: Requirement Comment_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Requirement Comment_Id_seq"', 1, false);


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 228
-- Name: Requirement_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Requirement_Id_seq"', 57, true);


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 230
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_id_seq"', 5, true);


--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 232
-- Name: User_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_Id_seq"', 9, true);


--
-- TOC entry 4739 (class 2606 OID 16574)
-- Name: Camp_Data Camp_Data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camp_Data"
    ADD CONSTRAINT "Camp_Data_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 4743 (class 2606 OID 16580)
-- Name: Camp_Volunteers Camp_Volunteers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camp_Volunteers"
    ADD CONSTRAINT "Camp_Volunteers_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 4757 (class 2606 OID 16582)
-- Name: User Email_Unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "Email_Unique" UNIQUE ("Email");


--
-- TOC entry 4745 (class 2606 OID 16584)
-- Name: Items Item_Name_Unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "Item_Name_Unique" UNIQUE ("Name");


--
-- TOC entry 4747 (class 2606 OID 16586)
-- Name: Items Items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 4759 (class 2606 OID 16588)
-- Name: User Mobile_Unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "Mobile_Unique" UNIQUE ("Mobile");


--
-- TOC entry 4751 (class 2606 OID 16590)
-- Name: Requirement Comment Requirement Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirement Comment"
    ADD CONSTRAINT "Requirement Comment_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 4749 (class 2606 OID 16592)
-- Name: Requirement Requirement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirement"
    ADD CONSTRAINT "Requirement_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 4753 (class 2606 OID 16594)
-- Name: Role RoleName_Unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "RoleName_Unique" UNIQUE ("RoleName");


--
-- TOC entry 4755 (class 2606 OID 16596)
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- TOC entry 4761 (class 2606 OID 16598)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 4741 (class 2606 OID 16640)
-- Name: Camp_Data campname_location; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camp_Data"
    ADD CONSTRAINT campname_location UNIQUE ("Name", "LocationAddress");


--
-- TOC entry 4762 (class 2606 OID 16599)
-- Name: Camp_Data CampAdminId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camp_Data"
    ADD CONSTRAINT "CampAdminId_FK" FOREIGN KEY ("CampAdminId") REFERENCES public."User"("Id") NOT VALID;


--
-- TOC entry 4763 (class 2606 OID 16604)
-- Name: Camp_Volunteers CampId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camp_Volunteers"
    ADD CONSTRAINT "CampId_FK" FOREIGN KEY ("CampId") REFERENCES public."Camp_Data"("Id") ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4765 (class 2606 OID 16609)
-- Name: Requirement ItemId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirement"
    ADD CONSTRAINT "ItemId_FK" FOREIGN KEY ("ItemId") REFERENCES public."Items"("Id") ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4767 (class 2606 OID 16614)
-- Name: Requirement Comment RequirementId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirement Comment"
    ADD CONSTRAINT "RequirementId_FK" FOREIGN KEY ("RequirementId") REFERENCES public."Requirement"("Id") NOT VALID;


--
-- TOC entry 4769 (class 2606 OID 16619)
-- Name: User RoleId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "RoleId_FK" FOREIGN KEY ("RoleId") REFERENCES public."Role"(id) NOT VALID;


--
-- TOC entry 4768 (class 2606 OID 16624)
-- Name: Requirement Comment UserId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirement Comment"
    ADD CONSTRAINT "UserId_FK" FOREIGN KEY ("UserId") REFERENCES public."User"("Id") NOT VALID;


--
-- TOC entry 4764 (class 2606 OID 16629)
-- Name: Camp_Volunteers UserId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Camp_Volunteers"
    ADD CONSTRAINT "UserId_FK" FOREIGN KEY ("UserId") REFERENCES public."User"("Id") NOT VALID;


--
-- TOC entry 4766 (class 2606 OID 16634)
-- Name: Requirement campId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirement"
    ADD CONSTRAINT "campId_FK" FOREIGN KEY ("CampId") REFERENCES public."Camp_Data"("Id") ON DELETE SET NULL NOT VALID;


-- Completed on 2025-01-02 21:07:09

--
-- PostgreSQL database dump complete
--

