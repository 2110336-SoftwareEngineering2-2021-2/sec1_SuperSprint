import { useEffect, useState } from "react";
import { Switch, Transition } from "@headlessui/react";
import Layout from "../../components/Layout";
import TutorCard from "../../components/TutorCard";
import ProfileDropdown from "../../components/ProfileDropdown";

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
      <div className="w-fit ml-auto mr-0">
        <ProfileDropdown name="Phusaratisasdfadsl;kjfasdlkf Jong" profileImg="http://daisyui.com/tailwind-css-component-profile-1@56w.png" />
      </div>

      <div className="my-2 flex flex-wrap justify-center gap-4">{temp}</div>

      <Switch.Group>
        <div className="flex items-center">
          <Switch.Label className="mr-4">Enable notifications</Switch.Label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-amber-500" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2`}
          >
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
    </Layout>
  );
}
