import Layout from './Layout';
import TutorCard from './TutorCard';

function Recommend({ tutors }) {
  return (
    <div className="my-2 flex flex-wrap justify-center gap-4">
      {tutors.map((item, idx) => (
        <TutorCard
          key={idx}
          name={item.name}
          profileImg={item.profileImg}
          subjects={item.subjects}
          levels={item.levels}
          rating={item.rating}
          price={item.price}
          onCardClick={() => console.log(`Card click ${item.name}`)}
          onChooseClick={() => console.log(`Choose button click ${item.name}`)}
        />
      ))}
    </div>
  );
}

export default Recommend;
