export default class Score {
  constructor() {}

  static async getAllPendingScore(session) {
    // console.log('token', session.accessToken);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/score/getAllPendingScore`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    // console.log('test');
    if (!res.ok) {
      const temp = await res.json();
      console.error(temp);
      throw new Error('Fetch error');
    }
    const data = await res.json();
    return data;
  }

  static async approveScore(session, tutorId, subjectId, adminId) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/score/${tutorId}/${subjectId}/approve`,
      {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          adminId: adminId,
        }),
      }
    );
    if (!res.ok) {
      throw new Error('Fetch error');
    }
  }

  static async rejectScore(session, tutorId, subjectId, adminId) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/score/${tutorId}/${subjectId}/reject`,
      {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          adminId: adminId,
        }),
      }
    );
    if (!res.ok) {
      throw new Error('Fetch error');
    }
  }
}
