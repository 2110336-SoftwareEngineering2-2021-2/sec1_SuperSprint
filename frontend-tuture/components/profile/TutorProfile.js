import React from 'react'
import Image from 'next/image';
// import LineImage from '../../public/images/Yellow-Vertical-Line.svg';
// import TutorImage from '../../public/images/tutor-profile.svg';

export default function TutorProfile({
    tutorName,
    gender,
    birthDate,
    phoneNumber,
    preferredSubjects,
    priceMin,
    priceMax,
    rating,
    isTutor,
    imgUrl
}) {
  return (
    <div className="card lg:card-side card-bordered border-primary flex bg-base-200 shadow-xl my-10 mx-auto border-solid">
        <div className="flex-1 card-body p-5 m-10 px-10 align-middle">
            <div className="flex flex-col justify-center items-center">
                <div className="w-50 h-50">
                    <Image src={imgUrl} alt="line" objectFit="contain" width={300} height={300} />
                </div>
                    {isTutor &&
                    <div className="flex-col items-center place-items-center my-5 space-y-5">
                        <h1 className="card-title">Username: johndoe</h1> 
                        <h1 className="card-title">E-mail : johndoe@gmail.com</h1>
                    </div>
                    }
                    {!isTutor &&
                    <div className="flex-col items-center place-items-center my-5 space-y-5">
                        <h1 className="card-title">{tutorName}</h1>
                    </div>
                    }
            </div>
        </div>
        <div className="divider-horizontal w-1 bg-primary my-7 mr-20"></div>
        {/* <div className="h-[225px] w-[400px]">
            <Image src={LineImage} alt="line" width="20%" objectFit="contain" layout="fill" />
        </div> */}
        <div className="flex-1 card-body align-middle justify-center space-y-8">
            <h1 className="card-title">Name : {tutorName}</h1>
            <h1 className="card-title">Gender : {gender}</h1>
            <h1 className="card-title">Birthdate : {birthDate}</h1>
            <h1 className="card-title">Phone number : {phoneNumber}</h1>
            <h1 className="card-title">Price range : {priceMin} - {priceMax} Baht</h1>
            <h1 className="card-title">Rating : {rating} / 5.0</h1>
            <h1 className="card-title">Preferred subjects : 
            <ul className="flex space-x-2">
                {preferredSubjects.map(subject => {
                    return <li key={subject}>{subject}</li>
                })}
            </ul>
            
            </h1>
            {/* <div className="justify-end card-actions"></div> */}
        </div>
    </div>
  )
}
