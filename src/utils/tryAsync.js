import Swal from 'sweetalert2';

export async function tryAsync(fn, cb) {
  try {
    const res = await fn;
    cb?.();

    if (res.data?.message) {
      Swal.fire({
        title: res.data?.message,
        icon: 'success',
        draggable: false,
      });
    }

    return res;
  } catch (e) {
    console.error('awaitCatch api error:', e.response);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: e?.response?.data?.message,
    });
    throw e;
  }
}
