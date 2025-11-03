CREATE TABLE "comments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ride_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ride_participants" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ride_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"joined_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rides" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"date" timestamp NOT NULL,
	"time" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text,
	"latitude" double precision,
	"longitude" double precision,
	"distance" integer NOT NULL,
	"difficulty" text NOT NULL,
	"pace" text NOT NULL,
	"terrain" text NOT NULL,
	"max_participants" integer NOT NULL,
	"description" text,
	"organizer_id" varchar NOT NULL,
	"is_archived" boolean DEFAULT false,
	"is_recurring" boolean DEFAULT false,
	"recurrence_pattern" text,
	"recurrence_day_of_week" integer,
	"recurrence_end_date" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"ride_types" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"difficulties" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"paces" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"terrains" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"available_days" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"club_affiliation" text,
	"min_distance" integer DEFAULT 0,
	"max_distance" integer DEFAULT 100,
	"search_radius" integer DEFAULT 50
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text,
	"club" text,
	"location" text,
	"latitude" double precision,
	"longitude" double precision,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_ride_id_rides_id_fk" FOREIGN KEY ("ride_id") REFERENCES "public"."rides"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ride_participants" ADD CONSTRAINT "ride_participants_ride_id_rides_id_fk" FOREIGN KEY ("ride_id") REFERENCES "public"."rides"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ride_participants" ADD CONSTRAINT "ride_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rides" ADD CONSTRAINT "rides_organizer_id_users_id_fk" FOREIGN KEY ("organizer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;