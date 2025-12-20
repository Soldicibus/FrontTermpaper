export async function prefetchUserData(queryClient, userId) {
  if (!userId || !queryClient) return;
  try {
  } catch (err) {
    // ignore prefetch failures
    // eslint-disable-next-line no-console
    console.warn('[prefetch] failed to prefetch user data', err?.message || err);
  }
}
