// import Layout from "../components/Layout";

// export default function Home() {
//   return (
//     <Layout title='Home'>
//       <h1 className="w-full font-bold text-4xl">Hello</h1>
//     </Layout>
//   );
// }

import Layout from "../components/Layout";
import SortingDropdown from "../components/SortingDropdown";

export default function Home() {
  return (
    <Layout title='Home'>
      <h1 className="w-full font-bold text-4xl">Hello</h1>
      <div className="mr-0 ml-auto w-fit">
        <SortingDropdown />
      </div>
    </Layout>
  );
}
