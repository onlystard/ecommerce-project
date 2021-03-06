PGDMP     :    !                y            parkspot    13.2    13.2 *    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16972    parkspot    DATABASE     l   CREATE DATABASE parkspot WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE parkspot;
                postgres    false            ?            1259    16973    fms_parking_lot    TABLE     0  CREATE TABLE public.fms_parking_lot (
    pd_lot_id integer NOT NULL,
    pd_loc_name character varying(100) NOT NULL,
    pd_loc_address character varying(500) NOT NULL,
    pd_loc_pincode numeric(10,0) DEFAULT 0,
    pd_entry integer DEFAULT 0 NOT NULL,
    pd_exit integer DEFAULT 0 NOT NULL,
    pd_hrly_rate integer DEFAULT 0 NOT NULL,
    pd_owner_id integer NOT NULL,
    longitude character varying(100) NOT NULL,
    latitude character varying(100) NOT NULL,
    occupied_spot integer DEFAULT 0 NOT NULL,
    total_spot integer DEFAULT 30 NOT NULL
);
 #   DROP TABLE public.fms_parking_lot;
       public         heap    postgres    false            ?            1259    16985 "   fms_parking_details_pd_spot_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.fms_parking_details_pd_spot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.fms_parking_details_pd_spot_id_seq;
       public          postgres    false    200            ?           0    0 "   fms_parking_details_pd_spot_id_seq    SEQUENCE OWNED BY     d   ALTER SEQUENCE public.fms_parking_details_pd_spot_id_seq OWNED BY public.fms_parking_lot.pd_lot_id;
          public          postgres    false    201            ?            1259    16987    fms_parking_history    TABLE     r  CREATE TABLE public.fms_parking_history (
    user_id integer DEFAULT 0 NOT NULL,
    parking_lot integer DEFAULT 0 NOT NULL,
    parking_spot integer DEFAULT 0 NOT NULL,
    in_time timestamp with time zone,
    out_time timestamp with time zone,
    record integer NOT NULL,
    payment double precision DEFAULT 0 NOT NULL,
    total_time time(6) without time zone
);
 '   DROP TABLE public.fms_parking_history;
       public         heap    postgres    false            ?            1259    16994    fms_parking_history_record_seq    SEQUENCE     ?   CREATE SEQUENCE public.fms_parking_history_record_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.fms_parking_history_record_seq;
       public          postgres    false    202            ?           0    0    fms_parking_history_record_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.fms_parking_history_record_seq OWNED BY public.fms_parking_history.record;
          public          postgres    false    203            ?            1259    16996    fms_parking_lot_history    TABLE     r  CREATE TABLE public.fms_parking_lot_history (
    lh_id bigint NOT NULL,
    date date,
    pd_lot_id integer DEFAULT 0 NOT NULL,
    hour_0 integer,
    hour_1 integer,
    hour_2 integer,
    hour_3 integer,
    hour_4 integer,
    hour_5 integer,
    hour_6 integer,
    hour_7 integer,
    hour_8 integer,
    hour_9 integer,
    hour_10 integer,
    hour_11 integer,
    hour_12 integer,
    hour_13 integer,
    hour_14 integer,
    hour_15 integer,
    hour_16 integer,
    hour_17 integer,
    hour_18 integer,
    hour_19 integer,
    hour_20 integer,
    hour_21 integer,
    hour_22 integer,
    hour_23 integer
);
 +   DROP TABLE public.fms_parking_lot_history;
       public         heap    postgres    false            ?            1259    17000 !   fms_parking_lot_history_lh_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.fms_parking_lot_history_lh_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.fms_parking_lot_history_lh_id_seq;
       public          postgres    false    204            ?           0    0 !   fms_parking_lot_history_lh_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.fms_parking_lot_history_lh_id_seq OWNED BY public.fms_parking_lot_history.lh_id;
          public          postgres    false    205            ?            1259    17002    fms_parking_spot    TABLE     ?   CREATE TABLE public.fms_parking_spot (
    sd_status integer DEFAULT 0 NOT NULL,
    spot_no integer DEFAULT 1 NOT NULL,
    lot_id integer DEFAULT 1 NOT NULL
);
 $   DROP TABLE public.fms_parking_spot;
       public         heap    postgres    false            ?            1259    17008    fms_user    TABLE     W  CREATE TABLE public.fms_user (
    user_email_id character varying(50) NOT NULL,
    user_first_name character varying(50) NOT NULL,
    user_last_name character varying(50) NOT NULL,
    user_password character varying(50) DEFAULT 0 NOT NULL,
    access_right character varying(10) DEFAULT USER NOT NULL,
    user_user_id integer NOT NULL
);
    DROP TABLE public.fms_user;
       public         heap    postgres    false            ?            1259    17013    fms_user_user_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.fms_user_user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.fms_user_user_user_id_seq;
       public          postgres    false    207            ?           0    0    fms_user_user_user_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.fms_user_user_user_id_seq OWNED BY public.fms_user.user_user_id;
          public          postgres    false    208            D           2604    17015    fms_parking_history record    DEFAULT     ?   ALTER TABLE ONLY public.fms_parking_history ALTER COLUMN record SET DEFAULT nextval('public.fms_parking_history_record_seq'::regclass);
 I   ALTER TABLE public.fms_parking_history ALTER COLUMN record DROP DEFAULT;
       public          postgres    false    203    202            ?           2604    17016    fms_parking_lot pd_lot_id    DEFAULT     ?   ALTER TABLE ONLY public.fms_parking_lot ALTER COLUMN pd_lot_id SET DEFAULT nextval('public.fms_parking_details_pd_spot_id_seq'::regclass);
 H   ALTER TABLE public.fms_parking_lot ALTER COLUMN pd_lot_id DROP DEFAULT;
       public          postgres    false    201    200            F           2604    17017    fms_parking_lot_history lh_id    DEFAULT     ?   ALTER TABLE ONLY public.fms_parking_lot_history ALTER COLUMN lh_id SET DEFAULT nextval('public.fms_parking_lot_history_lh_id_seq'::regclass);
 L   ALTER TABLE public.fms_parking_lot_history ALTER COLUMN lh_id DROP DEFAULT;
       public          postgres    false    205    204            L           2604    17018    fms_user user_user_id    DEFAULT     ~   ALTER TABLE ONLY public.fms_user ALTER COLUMN user_user_id SET DEFAULT nextval('public.fms_user_user_user_id_seq'::regclass);
 D   ALTER TABLE public.fms_user ALTER COLUMN user_user_id DROP DEFAULT;
       public          postgres    false    208    207            ?          0    16987    fms_parking_history 
   TABLE DATA           ?   COPY public.fms_parking_history (user_id, parking_lot, parking_spot, in_time, out_time, record, payment, total_time) FROM stdin;
    public          postgres    false    202   U9       ?          0    16973    fms_parking_lot 
   TABLE DATA           ?   COPY public.fms_parking_lot (pd_lot_id, pd_loc_name, pd_loc_address, pd_loc_pincode, pd_entry, pd_exit, pd_hrly_rate, pd_owner_id, longitude, latitude, occupied_spot, total_spot) FROM stdin;
    public          postgres    false    200   r9       ?          0    16996    fms_parking_lot_history 
   TABLE DATA             COPY public.fms_parking_lot_history (lh_id, date, pd_lot_id, hour_0, hour_1, hour_2, hour_3, hour_4, hour_5, hour_6, hour_7, hour_8, hour_9, hour_10, hour_11, hour_12, hour_13, hour_14, hour_15, hour_16, hour_17, hour_18, hour_19, hour_20, hour_21, hour_22, hour_23) FROM stdin;
    public          postgres    false    204   ?9       ?          0    17002    fms_parking_spot 
   TABLE DATA           F   COPY public.fms_parking_spot (sd_status, spot_no, lot_id) FROM stdin;
    public          postgres    false    206   ?9       ?          0    17008    fms_user 
   TABLE DATA           }   COPY public.fms_user (user_email_id, user_first_name, user_last_name, user_password, access_right, user_user_id) FROM stdin;
    public          postgres    false    207   ?9       ?           0    0 "   fms_parking_details_pd_spot_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.fms_parking_details_pd_spot_id_seq', 64, true);
          public          postgres    false    201            ?           0    0    fms_parking_history_record_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.fms_parking_history_record_seq', 4229, true);
          public          postgres    false    203            ?           0    0 !   fms_parking_lot_history_lh_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.fms_parking_lot_history_lh_id_seq', 1889, true);
          public          postgres    false    205            ?           0    0    fms_user_user_user_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.fms_user_user_user_id_seq', 32, true);
          public          postgres    false    208            R           2606    17020 ,   fms_parking_history fms_parking_history_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.fms_parking_history
    ADD CONSTRAINT fms_parking_history_pkey PRIMARY KEY (record);
 V   ALTER TABLE ONLY public.fms_parking_history DROP CONSTRAINT fms_parking_history_pkey;
       public            postgres    false    202            T           2606    17022 4   fms_parking_lot_history fms_parking_lot_history_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.fms_parking_lot_history
    ADD CONSTRAINT fms_parking_lot_history_pkey PRIMARY KEY (lh_id);
 ^   ALTER TABLE ONLY public.fms_parking_lot_history DROP CONSTRAINT fms_parking_lot_history_pkey;
       public            postgres    false    204            V           2606    17024 &   fms_parking_spot fms_parking_spot_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.fms_parking_spot
    ADD CONSTRAINT fms_parking_spot_pkey PRIMARY KEY (spot_no, lot_id);
 P   ALTER TABLE ONLY public.fms_parking_spot DROP CONSTRAINT fms_parking_spot_pkey;
       public            postgres    false    206    206            X           2606    17026    fms_user fms_user_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.fms_user
    ADD CONSTRAINT fms_user_pkey PRIMARY KEY (user_user_id);
 @   ALTER TABLE ONLY public.fms_user DROP CONSTRAINT fms_user_pkey;
       public            postgres    false    207            N           2606    17028    fms_parking_lot pd_id 
   CONSTRAINT     U   ALTER TABLE ONLY public.fms_parking_lot
    ADD CONSTRAINT pd_id UNIQUE (pd_lot_id);
 ?   ALTER TABLE ONLY public.fms_parking_lot DROP CONSTRAINT pd_id;
       public            postgres    false    200            P           2606    17030    fms_parking_lot pd_spot_id 
   CONSTRAINT     _   ALTER TABLE ONLY public.fms_parking_lot
    ADD CONSTRAINT pd_spot_id PRIMARY KEY (pd_lot_id);
 D   ALTER TABLE ONLY public.fms_parking_lot DROP CONSTRAINT pd_spot_id;
       public            postgres    false    200            Z           2606    17032    fms_user user_email_id 
   CONSTRAINT     Z   ALTER TABLE ONLY public.fms_user
    ADD CONSTRAINT user_email_id UNIQUE (user_email_id);
 @   ALTER TABLE ONLY public.fms_user DROP CONSTRAINT user_email_id;
       public            postgres    false    207            _           2606    17033    fms_parking_spot lot_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.fms_parking_spot
    ADD CONSTRAINT lot_id FOREIGN KEY (lot_id) REFERENCES public.fms_parking_lot(pd_lot_id) NOT VALID;
 A   ALTER TABLE ONLY public.fms_parking_spot DROP CONSTRAINT lot_id;
       public          postgres    false    2894    200    206            \           2606    17038    fms_parking_history parking_lot    FK CONSTRAINT     ?   ALTER TABLE ONLY public.fms_parking_history
    ADD CONSTRAINT parking_lot FOREIGN KEY (parking_lot) REFERENCES public.fms_parking_lot(pd_lot_id) NOT VALID;
 I   ALTER TABLE ONLY public.fms_parking_history DROP CONSTRAINT parking_lot;
       public          postgres    false    202    2894    200            ^           2606    17043 !   fms_parking_lot_history pd_lot_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.fms_parking_lot_history
    ADD CONSTRAINT pd_lot_id FOREIGN KEY (pd_lot_id) REFERENCES public.fms_parking_lot(pd_lot_id) NOT VALID;
 K   ALTER TABLE ONLY public.fms_parking_lot_history DROP CONSTRAINT pd_lot_id;
       public          postgres    false    200    2894    204            [           2606    17048    fms_parking_lot pd_owner_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.fms_parking_lot
    ADD CONSTRAINT pd_owner_id FOREIGN KEY (pd_owner_id) REFERENCES public.fms_user(user_user_id) NOT VALID;
 E   ALTER TABLE ONLY public.fms_parking_lot DROP CONSTRAINT pd_owner_id;
       public          postgres    false    207    2904    200            ]           2606    17053    fms_parking_history user_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.fms_parking_history
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.fms_user(user_user_id) NOT VALID;
 E   ALTER TABLE ONLY public.fms_parking_history DROP CONSTRAINT user_id;
       public          postgres    false    202    2904    207            ?      x?????? ? ?      ?      x?????? ? ?      ?      x?????? ? ?      ?      x?????? ? ?      ?      x?????? ? ?     