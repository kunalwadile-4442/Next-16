export const ws_response = (
  {
    evt,
    callback,
  }: {
    evt: { event: string; data: any };
    router?: any;
    callback?: (payload: any) => void;
  },
  router: unknown,
  p0: (d: any) => void,
) => {
  return async (dispatch: any, getState: () => any) => {
    const ws = typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data;
    const type = ws?.request?.type;
    const action = ws?.request?.action;
    const payload = ws?.request?.payload;
    const data = ws?.data;
    switch (type) {
      /* ------------------------------------------------------------------ COLLEGE SERVICE ------------------------------------------------------------------ */

      default:
        return;
    }
  };
};
