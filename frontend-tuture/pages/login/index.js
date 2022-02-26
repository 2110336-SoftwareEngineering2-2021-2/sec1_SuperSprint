import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Layout from '../../components/Layout';
import TutorImage from '../../public/images/sir-teaching-maths-in-the-class-2127160-2127160.svg';
import StudentImage from '../../public/images/students-studying-physics-in-classroom-2140100-2140100.svg';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { set } from 'react-hook-form';
import { signIn , signOut , useSession } from "next-auth/react";

export default function Login() {

    const [role,setRole] = useState('s ');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    function Signin(info){
      console.log(info);
    }

    const {data:session,status} = useSession();

    //console.log(session);
    console.log("status",status);
    console.log("session",session);
    console.log(username,password);

    // if (status === "authenticated") {
    //   return <p>Signed in as {session.user.email}</p>
    // }

    // if (status === "loading") {
    //   return "Loading or not authenticated..."
    // }
    // function handleUsername(event) {
    //   setUsername(event.target.value);
    // }

    // function handlePassword(event) {
    //   setPassword(event.target.value);
    // }

  return (
    <Layout title="Login | Tuture" signedIn={false}>
      <div className="container m-auto flex flex-col gap-4">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          Sign In
        </h1>
        <div className="m-auto flex w-full justify-center px-2">
           <div className={`${role=='s ' ? "border-solid hover:border-solid border-primary hover:border-primary" : ""} btn h-auto rounded-box glass w-96`}>
            <button className="" onClick={() => setRole("s ")}>
            <figure className="px-2 pt-2">
              <div className="relative h-[225px] w-[400px]">
                <Image
                  src={StudentImage}
                  alt="car!"
                  layout="fill" // required
                  objectFit="cover" // change to suit your needs
                />
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Student</h2>
              {/* <div className="card-actions">
                <Link href="/register/tutor" passHref>
                  <button className="btn btn-primary btn-sm">Select</button>
                </Link>
              </div> */}
            </div>
          </button>
          </div>
          <div className="divider divider-horizontal">OR</div>
          
          {/* Button here */}
          <div className={`${role=='t ' ? "border-solid hover:border-solid border-primary hover:border-primary" : ""} btn h-auto rounded-box glass w-96`}>
          <button onClick={() => setRole("t ")}>
            <figure className="px-2 pt-2">
              <div className="relative h-[225px] w-[400px]">
                <Image
                  src={TutorImage}
                  alt="car!"
                  layout="fill" // required
                  objectFit="cover" // change to suit your needs
                />
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Tutor</h2>
              {/* <div className="card-actions">
                <Link href="/register/tutor" passHref>
                  <button className="btn btn-primary btn-sm">Select</button>
                </Link>
              </div> */}
            </div>
          </button>
          </div>
        </div>
        <p className="text-center text-sm sm:text-base m-5">Choose account type you want to login with.</p>

          {/* <form onSubmit={handleSubmit(submitLogin)}> */}
          {/* <form> */}
            <div className="flex flex-row justify-center w-full">
                <div className="flex text-xl">
                    <h1>Username:&nbsp;&nbsp;</h1>
                </div>
                <input
                        className="input-bordered input-primary input w-full max-w-xs"
                        type="text"
                        value={username}
                        placeholder="Enter Username"
                        name="username"
                        autoComplete="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
            </div>
            {/* <br/> */}
            <div className="flex flex-row justify-center w-full">
                <div className="flex text-xl">
                    <h1>Password:&nbsp;&nbsp;&nbsp;</h1>
                </div>
                <input
                        type="password"
                        className="input-bordered input-primary input w-full max-w-xs"
                        value={password}
                        placeholder="Enter Password"
                        autoComplete="current-password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        // value={password.password}
                        // onChange={onPasswordChange}
                    />
                </div>
                {/* <br/> */}
                <div className="flex w-full justify-center">
                    <input type="submit" className="btn btn-primary" value="Sign In"
                     onClick={() => signIn('credentials',{
                       username: username,
                       password: password
                     }, { callbackUrl: "/" })

                      // signIn('credentials', {
                      //   username: role + username,
                      //   password: password
                      // })
                    }
                     />
                </div>
          {/* </form> */}
                {/* <p className="overflow-hidden" align="center">or</p>  */}
                <div className="divider divider-vertical">OR</div>
                <Link href="../register" passHref>
                    <button class="astext">Sign Up</button>
                </Link>
                <button onClick={() => signOut()}>
                  Log out
                </button>
        </div>
    </Layout>
  );
}


