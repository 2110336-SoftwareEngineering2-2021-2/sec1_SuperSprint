import { useEffect, useState } from "react";
import { Switch, Transition } from "@headlessui/react";
import Layout from "../../components/Layout";
import TutorCard from "../../components/TutorCard";

const names = [
  "Adam Benson",
  "Clare Donaldsdfadsfdsfson",
  "Phusaratis Jong",
  "Donald Clarkson",
];

export default function Testpage() {
  const [enabled, setEnabled] = useState(false);

  let temp = [];
  for (let i = 0; i < 4; i++) {
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
    <Layout title={"test page"}>

      <div className="flex flex-wrap justify-center gap-4 my-2">{temp}</div>

      <Switch.Group>
        <div className="flex items-center">
          <Switch.Label className="mr-4">Enable notifications</Switch.Label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-amber-500" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-700`}
          >
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
    </Layout>
  );
}
