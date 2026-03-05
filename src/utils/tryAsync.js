export async function tryAsync(fn, cb) {
  try {
    const res = await fn;
    cb?.();
    return res;
  } catch (e) {
    console.error('awaitCatch api error:', e);
    throw e;
  }
}
