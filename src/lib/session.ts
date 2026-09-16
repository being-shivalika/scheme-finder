export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('schemesetu_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('schemesetu_session_id', sessionId);
  }
  return sessionId;
};
