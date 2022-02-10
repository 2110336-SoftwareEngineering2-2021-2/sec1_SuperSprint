import React from 'react';
import TutorCard from '../../components/TutorCard';
import Layout from '../../components/Layout';

export default function MatchingResultPage() {

    const names = [
        "Adam Benson",
        "Clare Donaldsdfadsfdsfson",
        "Phusaratis Jong",
        "Donald Clarkson",
        "Eonald Clarkson",
        "Fonald Clarkson",
        "Gonald Clarkson",
        "Honald Clarkson",
    ];

    let temp = [];
    for (let i = 0; i < 8; i++) {
      temp.push(
        <TutorCard
          key={i}
          name={names[i]}
          profileImg={
            "https://www.chicagotribune.com/resizer/a-16fPYl-SK8W6HPnzjOHK1rqho=/800x551/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/IEYVMAFZ7BBXHM46GFNLWRN3ZA.jpg"
          }
          subjects={["Physics", "Chemistry"]}
          levels={["High school", "Middle school"]}
          rating={Math.random() * 5}
          price={{ min: 300, max: 500 }}
          onCardClick={() => console.log(`Card click ${names[i]}`)}
          onChooseClick={() => console.log(`Choose button click ${names[i]}`)}
        />
      );
    }
  


  return (
  <Layout title='matchingresultpage'>  
      {/* <SortOption /> */}
    <h1 className="text-5xl font-semibold text-center">Matching Result</h1>
    {/* <div className="flex flex-col items-center my-5 gap-5">
      {temp}
    </div> */}
    <div className="grid grid-cols-1 md:grid-cols-2 items-center my-10 gap-x-5">
      <div className="grid gap-y-5">{temp}</div>
      <div className="grid gap-y-5">{temp}</div>
    </div>
  </Layout>
  )
}