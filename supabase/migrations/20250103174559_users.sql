create table "public"."category_user" (
    "category_id" bigint not null,
    "user_id" bigint not null,
    "id" integer generated always as identity not null,
    "created_at" timestamp without time zone not null default now()
);


alter table "public"."category" add column "private" boolean not null default false;

alter table "public"."user" drop column "password";

alter table "public"."user" add column "user_id" character varying not null;

alter table "public"."user" alter column "email" drop not null;

CREATE UNIQUE INDEX category_user_pkey ON public.category_user USING btree (id);

alter table "public"."category_user" add constraint "category_user_pkey" PRIMARY KEY using index "category_user_pkey";

alter table "public"."category_user" add constraint "category_user_category_id_category_id_fk" FOREIGN KEY (category_id) REFERENCES category(id) not valid;

alter table "public"."category_user" validate constraint "category_user_category_id_category_id_fk";

alter table "public"."category_user" add constraint "category_user_user_id_user_id_fk" FOREIGN KEY (user_id) REFERENCES "user"(id) not valid;

alter table "public"."category_user" validate constraint "category_user_user_id_user_id_fk";

grant delete on table "public"."category_user" to "anon";

grant insert on table "public"."category_user" to "anon";

grant references on table "public"."category_user" to "anon";

grant select on table "public"."category_user" to "anon";

grant trigger on table "public"."category_user" to "anon";

grant truncate on table "public"."category_user" to "anon";

grant update on table "public"."category_user" to "anon";

grant delete on table "public"."category_user" to "authenticated";

grant insert on table "public"."category_user" to "authenticated";

grant references on table "public"."category_user" to "authenticated";

grant select on table "public"."category_user" to "authenticated";

grant trigger on table "public"."category_user" to "authenticated";

grant truncate on table "public"."category_user" to "authenticated";

grant update on table "public"."category_user" to "authenticated";

grant delete on table "public"."category_user" to "service_role";

grant insert on table "public"."category_user" to "service_role";

grant references on table "public"."category_user" to "service_role";

grant select on table "public"."category_user" to "service_role";

grant trigger on table "public"."category_user" to "service_role";

grant truncate on table "public"."category_user" to "service_role";

grant update on table "public"."category_user" to "service_role";