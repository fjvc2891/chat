PGDMP                  
    |            chat    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    82320    chat    DATABASE     z   CREATE DATABASE chat WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE chat;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    82343    messages    TABLE     �   CREATE TABLE public.messages (
    id integer NOT NULL,
    user_id integer NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    user_type character varying(20) NOT NULL
);
    DROP TABLE public.messages;
       public         heap    postgres    false    4            �            1259    82342    messages_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.messages_id_seq;
       public          postgres    false    4    218            �           0    0    messages_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
          public          postgres    false    217            �            1259    82358    sessions    TABLE     �   CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    expires_at timestamp without time zone NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false    4            �            1259    82357    sessions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sessions_id_seq;
       public          postgres    false    4    220            �           0    0    sessions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
          public          postgres    false    219            �            1259    82332    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    user_type character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT users_user_type_check CHECK (((user_type)::text = ANY ((ARRAY['student'::character varying, 'moderator'::character varying])::text[])))
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    82331    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216    4            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            &           2604    82346    messages id    DEFAULT     j   ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);
 :   ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            (           2604    82361    sessions id    DEFAULT     j   ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
 :   ALTER TABLE public.sessions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            $           2604    82335    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    82343    messages 
   TABLE DATA                 public          postgres    false    218           �          0    82358    sessions 
   TABLE DATA                 public          postgres    false    220           �          0    82332    users 
   TABLE DATA                 public          postgres    false    216   6        �           0    0    messages_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.messages_id_seq', 11, true);
          public          postgres    false    217            �           0    0    sessions_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);
          public          postgres    false    219            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    215            0           2606    82351    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    218            2           2606    82364    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    220            ,           2606    82339    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            .           2606    82341    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216            3           2606    82352    messages messages_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_user_id_fkey;
       public          postgres    false    216    218    4652            4           2606    82365    sessions sessions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_user_id_fkey;
       public          postgres    false    4652    220    216            �   
   x���          �   
   x���          �   �   x����
�@F�>�,R��&�2,5s����O8�O_.�]m�}g�b/J��<T^WWKɢ�$u'/&X�M����:�:P�z�%�����6܄�ջ�Q�A��h=�o��ɑQ<��g8��N�e��	&�	`�Mp� :,��a�r��_��VăE;��W����;5�Ý_�     