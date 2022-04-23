export default class Score {
  constructor() {}

  static async getAllPendingScore(session) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/score/getAllPendingScore`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error('Fetch error');
    }
  }

  static async approveScore(session, tutorId, subjectId, adminId) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/score/${tutorId}/${subjectId}/approve`,
      {
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
