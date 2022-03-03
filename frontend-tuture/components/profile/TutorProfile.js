import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function TutorProfile({
  username,
  e_mail,
  tutorName,
  gender,
  phoneNumber,
  preferredSubjects,
  priceMin,
  priceMax,
  rating,
  imgUrl,
  successMatch,
}) {
  const { data: session } = useSession();

  return (
    <div className="container my-10 mx-auto flex max-w-4xl flex-col border-solid border-primary bg-base-200 p-4 shadow-xl md:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="avatar">
          <div className="m-2 w-40 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 md:w-48">
            <img src={imgUrl} alt="Profile Avatar" />
          </div>
        </div>
        {session && session.user.role === 'tutor' && (
          <div className="mx-auto w-fit">
            <p>Username: {username}</p>
            <p>E-mail : {e_mail}</p>
          </div>
        )}
      </div>
      <div className="divider divider-vertical md:divider-horizontal"></div>
      <div className="flex flex-[2]">
        <div className="mx-4 my-4 flex flex-1 flex-col items-start gap-1 md:mx-0">
          <p>Name</p>
          <p>Gender</p>
          <p>Phone number</p>
          <p>Price range</p>
          <p>Rating</p>
          <p>Success Match</p>
          <p>Teaching Subjects</p>
        </div>
        <div className="mx-4 my-4 flex flex-1 flex-col items-start gap-1 md:mx-0">
          <p>{tutorName}</p>
          <p>{gender}</p>
          <p>{phoneNumber}</p>
          <p>
            {priceMin}-{priceMax} THB/Hr
          </p>
          <p>{rating}</p>
          <p>{successMatch}</p>
          {preferredSubjects.length > 0 ? (
            <ul className="ml-6 list-disc">
              {preferredSubjects?.map((subject, idx) => {
                return (
                  <li key={idx}>
                    {subject.title} ( {subject.level} )
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>-</p>
          )}
        </div>
      </div>
    </div>
  );
}
