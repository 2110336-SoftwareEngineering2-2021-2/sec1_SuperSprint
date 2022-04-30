export default class Chat {
  constructor() {}

  static async getChat(session, tutorId, studentId) {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/chat?tutorId=${tutorId}&studentId=${studentId}`);
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_API_URL}/subject/getSubjects`
      `${process.env.NEXT_PUBLIC_API_URL}/chat?tutorId=${tutorId}&studentId=${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    if (!res.ok) {
      const test = await res.json();
      console.log(test);
      throw new Error('Fetch Error');
    }
    const data = await res.json();
    return data;
  }
}
