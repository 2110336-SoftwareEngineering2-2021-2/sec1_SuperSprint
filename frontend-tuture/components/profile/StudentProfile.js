import React from 'react';
import Image from 'next/image';
import avatarUrl from '../../lib/avatarUrl';
// import LineImage from '../../public/images/Yellow-Vertical-Line.svg';

export default function StudentProfile({
  id,
  username,
  e_mail,
  firstName,
  lastName,
  gender,
  // birthDate,
  phoneNumber,
  preferredSubjects,
  imgUrl,
}) {
  return (
    <div className="container my-5 mx-auto flex max-w-4xl flex-col border-solid border-primary bg-base-200 p-4 shadow-xl md:my-10 md:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="avatar">
          <div className="m-2 w-40 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 md:w-48">
            <img
              src={avatarUrl(imgUrl, firstName + lastName + id)}
              alt="Profile Avatar"
            />
          </div>
        </div>
        <div className="mx-auto w-fit">
          <p>Username: {username}</p>
          <p>E-mail : {e_mail}</p>
        </div>
      </div>
      <div className="divider divider-vertical md:divider-horizontal"></div>
      <div className="my-0 flex-[2] md:my-2">
        <div className="flex flex-[2]">
          <p className="mx-4 flex-1 md:mx-0">Name</p>
          <p className="mx-4 flex-1 md:mx-0">{`${firstName} ${lastName}`}</p>
        </div>
        <div className="flex flex-[2]">
          <p className="mx-4 flex-1 md:mx-0">Gender</p>
          <p className="mx-4 flex-1 md:mx-0">{gender}</p>
        </div>
        <div className="flex flex-[2]">
          <p className="mx-4 flex-1 md:mx-0">Phone number</p>
          <p className="mx-4 flex-1 md:mx-0">{phoneNumber}</p>
        </div>
        <div className="flex flex-[2]">
          <p className="mx-4 flex-1 md:mx-0">Preferred Subjects</p>
          <p className="mx-4 flex-1 md:mx-0">
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
          </p>
        </div>
      </div>
    </div>
  );
}
