export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4ZmQxM2RmOS1kOTVlLTRkODEtODA0ZC00YWNhNGRkZWE1YzYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMjU5MDI3OSwiZXhwIjoxNzAzMTk1MDc5fQ.l5eV_OiAOxPLRjMZ-zo4i-JtqmC2XK8ltitpubexJP8';

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};
