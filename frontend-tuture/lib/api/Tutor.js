import whatGender from "../whatGender";

export default class Tutor {
  constructor() {}

  static async getTutorProfile(session, tutorId) {
    try {
      const res = await fetch(
        // `${process.env.NEXT_PUBLIC_API_URL}/subject/getSubjects`
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/getById?id=${tutorId}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error('Fetch error');
      }
      const data = await res.json();

      return {
        success: true,
        id: data._id,
        username: data.username,
        e_mail: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: whatGender(data.gender),
        // birthDate: data.birthDate, //!
        phoneNumber: data.phone,
        preferredSubjects: data.teachSubject,
        priceMin: data.priceMin,
        priceMax: data.priceMax,
        rating: data.avgRating,
        imgUrl: data.profileUrl,
        successMatch: data.successMatch,
        dutyTime: data.dutyTime,
      };
    } catch (error) {
      console.log(error.stack);
      return {
        success: false,
        username: 'johndoe',
        e_mail: 'johndoe@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'fegirl',
        // birthDate: '1 Jan 1000',
        phoneNumber: '0123456789',
        preferredSubjects: ['CEM III', 'Algorithm II', 'Physics VII'],
        priceMin: 0,
        priceMax: 10000,
        rating: 6.0,
        imgUrl: 'https://api.lorem.space/image/face?hash=3174',
        successMatch: 13598,
        dutyTime: ['-'],
      };
    }
  }

  static async getTutorScores(session, tutorId) {
    try {
      const res = await fetch(
        // `${process.env.NEXT_PUBLIC_API_URL}/subject/getSubjects`
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/score?id=${tutorId}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error.stack);
      return [];
    }
  }
}
