CREATE TABLE "invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"inviter_email" text NOT NULL,
	"invitee_email" text NOT NULL,
	"status" text DEFAULT 'sent' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"used_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "waitlist_signups" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"lang" text DEFAULT 'es' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_hash" text,
	"user_agent_hash" text,
	"source" text DEFAULT 'landing_v0',
	"confirmed" boolean DEFAULT false NOT NULL,
	CONSTRAINT "waitlist_signups_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "invitations_inviter_invitee_unique" ON "invitations" USING btree ("inviter_email","invitee_email");