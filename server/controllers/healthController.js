export function createHealthController({ pingDatabase }) {
  return {
    async check(_req, res) {
      let database = 'down';
      try {
        database = (await pingDatabase()) ? 'up' : 'down';
      } catch {
        database = 'down';
      }
      res.status(database === 'up' ? 200 : 503).json({ status: database === 'up' ? 'ok' : 'degraded', database });
    },
  };
}
