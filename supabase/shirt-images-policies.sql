-- Policies needed while the app works without authentication.
-- Run this in the Supabase SQL editor for the project.

update storage.buckets
set public = true
where id = 'shirt-images';

alter table public.shirt_images enable row level security;

grant select, insert, update, delete on table public.shirt_images
to anon, authenticated;

drop policy if exists "Permet llegir imatges de samarretes" on public.shirt_images;
create policy "Permet llegir imatges de samarretes"
on public.shirt_images
for select
to anon, authenticated
using (true);

drop policy if exists "Permet inserir imatges de samarretes" on public.shirt_images;
create policy "Permet inserir imatges de samarretes"
on public.shirt_images
for insert
to anon, authenticated
with check (true);

drop policy if exists "Permet actualitzar imatges de samarretes" on public.shirt_images;
create policy "Permet actualitzar imatges de samarretes"
on public.shirt_images
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Permet eliminar imatges de samarretes" on public.shirt_images;
create policy "Permet eliminar imatges de samarretes"
on public.shirt_images
for delete
to anon, authenticated
using (true);

drop policy if exists "Permet llegir fitxers de samarretes" on storage.objects;
create policy "Permet llegir fitxers de samarretes"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'shirt-images'
  and (storage.foldername(name))[1] = 'shirts'
);

drop policy if exists "Permet pujar fitxers de samarretes" on storage.objects;
create policy "Permet pujar fitxers de samarretes"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'shirt-images'
  and (storage.foldername(name))[1] = 'shirts'
);

drop policy if exists "Permet netejar fitxers de samarretes" on storage.objects;
create policy "Permet netejar fitxers de samarretes"
on storage.objects
for delete
to anon, authenticated
using (
  bucket_id = 'shirt-images'
  and (storage.foldername(name))[1] = 'shirts'
);
