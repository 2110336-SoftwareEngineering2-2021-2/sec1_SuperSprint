import TutorProfile from '../../../components/profile/TutorProfile';

import React from 'react';
import Layout from '../../../components/Layout';
import TutorImage from '../../../public/images/President-Putin.png';
import { useRouter } from 'next/router';

// function getTutorData(tutorId) {

// }


export default function tutorOther({ data }) {

    const subjects = ["CEM III","Algorithm II","Physics VII"];

    // const router = useRouter();

    // const { tutorId } = router.query; 

    // console.log(tutorId);

  return (
    <div>
        <Layout>
        <div className="justify-center flex text-3xl text-b">
                <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">Tutor's Profile</h1>
            </div>
            <div className="justify-center items-center px-20">
            <TutorProfile 
                tutorName={data.tutorName}
                gender={data.gender}
                birthDate={data.birthDate}
                phoneNumber={data.phoneNumber}
                preferredSubjects = {data.preferredSubjects}
                priceMin = {data.priceMin}
                priceMax = {data.priceMax}
                rating = {data.rating}
                isTutor = {data.isTutor}
                imgUrl = {data.imgUrl}
            />  
            </div>
        </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {

    try {
        const { tutorId } = context.query;
    
        const res = fetch(`http://${process.env.API_URL}/tutor/${tutorId}`)
        const data = await res.json()

        return {
            props: {
                data: {
                    tutorName: data.tutorName,
                    gender: data.gender,
                    birthDate: data.birthDate,
                    phoneNumber: data.phoneNumber,
                    preferredSubjects: data.preferredSubjects,
                    priceMax: data.priceMax,
                    priceMin: data.priceMin,
                    rating: data.rating,
                    isTutor: data.isTutor,
                    imgUrl: data.imgUrl
                }
            }
        }

    } catch (error) {
        return {
            props: {                
                data: {
                    tutorName: "John Doe",
                    gender: "Male",
                    birthDate: "32 December 2222",
                    phoneNumber: "0987654321",
                    preferredSubjects: [],
                    priceMax: "9999",
                    priceMin: "0",
                    rating: "3.33",
                    isTutor: true,
                    imgUrl: ""
            }}
        }
    }


}
