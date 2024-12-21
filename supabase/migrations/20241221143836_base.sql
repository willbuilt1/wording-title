create table "public"."category" (
    "id" integer generated always as identity not null,
    "name" character varying not null,
    "created_at" timestamp without time zone not null default now(),
    "icon" character varying not null default '❔'::character varying
);


create table "public"."user" (
    "id" integer generated always as identity not null,
    "created_at" timestamp without time zone not null default now(),
    "email" character varying not null,
    "password" character varying not null
);


create table "public"."word" (
    "id" integer generated always as identity not null,
    "created_at" timestamp without time zone not null default now(),
    "word" text
);


create table "public"."word_category" (
    "id" integer generated always as identity not null,
    "created_at" timestamp without time zone not null default now(),
    "word_id" bigint not null,
    "category_id" bigint not null
);


CREATE UNIQUE INDEX categories_pkey ON public.word_category USING btree (id);

CREATE UNIQUE INDEX user_email_unique ON public."user" USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.category USING btree (id);

CREATE UNIQUE INDEX word_categories_pkey ON public.word USING btree (id);

CREATE UNIQUE INDEX words_pkey ON public."user" USING btree (id);

alter table "public"."category" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."user" add constraint "words_pkey" PRIMARY KEY using index "words_pkey";

alter table "public"."word" add constraint "word_categories_pkey" PRIMARY KEY using index "word_categories_pkey";

alter table "public"."word_category" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."user" add constraint "user_email_unique" UNIQUE using index "user_email_unique";

alter table "public"."word_category" add constraint "word_category_category_id_category_id_fk" FOREIGN KEY (category_id) REFERENCES category(id) not valid;

alter table "public"."word_category" validate constraint "word_category_category_id_category_id_fk";

alter table "public"."word_category" add constraint "word_category_word_id_word_id_fk" FOREIGN KEY (word_id) REFERENCES word(id) not valid;

alter table "public"."word_category" validate constraint "word_category_word_id_word_id_fk";

grant delete on table "public"."category" to "anon";

grant insert on table "public"."category" to "anon";

grant references on table "public"."category" to "anon";

grant select on table "public"."category" to "anon";

grant trigger on table "public"."category" to "anon";

grant truncate on table "public"."category" to "anon";

grant update on table "public"."category" to "anon";

grant delete on table "public"."category" to "authenticated";

grant insert on table "public"."category" to "authenticated";

grant references on table "public"."category" to "authenticated";

grant select on table "public"."category" to "authenticated";

grant trigger on table "public"."category" to "authenticated";

grant truncate on table "public"."category" to "authenticated";

grant update on table "public"."category" to "authenticated";

grant delete on table "public"."category" to "service_role";

grant insert on table "public"."category" to "service_role";

grant references on table "public"."category" to "service_role";

grant select on table "public"."category" to "service_role";

grant trigger on table "public"."category" to "service_role";

grant truncate on table "public"."category" to "service_role";

grant update on table "public"."category" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";

grant delete on table "public"."word" to "anon";

grant insert on table "public"."word" to "anon";

grant references on table "public"."word" to "anon";

grant select on table "public"."word" to "anon";

grant trigger on table "public"."word" to "anon";

grant truncate on table "public"."word" to "anon";

grant update on table "public"."word" to "anon";

grant delete on table "public"."word" to "authenticated";

grant insert on table "public"."word" to "authenticated";

grant references on table "public"."word" to "authenticated";

grant select on table "public"."word" to "authenticated";

grant trigger on table "public"."word" to "authenticated";

grant truncate on table "public"."word" to "authenticated";

grant update on table "public"."word" to "authenticated";

grant delete on table "public"."word" to "service_role";

grant insert on table "public"."word" to "service_role";

grant references on table "public"."word" to "service_role";

grant select on table "public"."word" to "service_role";

grant trigger on table "public"."word" to "service_role";

grant truncate on table "public"."word" to "service_role";

grant update on table "public"."word" to "service_role";

grant delete on table "public"."word_category" to "anon";

grant insert on table "public"."word_category" to "anon";

grant references on table "public"."word_category" to "anon";

grant select on table "public"."word_category" to "anon";

grant trigger on table "public"."word_category" to "anon";

grant truncate on table "public"."word_category" to "anon";

grant update on table "public"."word_category" to "anon";

grant delete on table "public"."word_category" to "authenticated";

grant insert on table "public"."word_category" to "authenticated";

grant references on table "public"."word_category" to "authenticated";

grant select on table "public"."word_category" to "authenticated";

grant trigger on table "public"."word_category" to "authenticated";

grant truncate on table "public"."word_category" to "authenticated";

grant update on table "public"."word_category" to "authenticated";

grant delete on table "public"."word_category" to "service_role";

grant insert on table "public"."word_category" to "service_role";

grant references on table "public"."word_category" to "service_role";

grant select on table "public"."word_category" to "service_role";

grant trigger on table "public"."word_category" to "service_role";

grant truncate on table "public"."word_category" to "service_role";

grant update on table "public"."word_category" to "service_role";


