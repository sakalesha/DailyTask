-- Run this in your Supabase SQL Editor to create the missing table

CREATE TABLE IF NOT EXISTS public.daily_plans (
    id UUID PRIMARY KEY,
    date TEXT NOT NULL UNIQUE,
    "availableHours" NUMERIC NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "morningNote" TEXT,
    reflection TEXT,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL
);

-- If you are using Row Level Security (RLS), uncomment these lines:
-- ALTER TABLE public.daily_plans ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable full access for all users" ON public.daily_plans FOR ALL USING (true) WITH CHECK (true);
