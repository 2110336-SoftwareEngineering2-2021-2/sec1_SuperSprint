import Layout from "../../components/Layout";

const subjects = ["Mathmetic", "Physic", "Biology", "English"];
const levels = ["Middle School", "High School"];

function Matching() {
  return (
    <Layout title="Matching">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-2xl mb-6">Matching</h2>
        <form className="w-full max-w-2xl p-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="relative w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-subject"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-200 hover:border-amber-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-amber-300 transition-all"
                  id="grid-subject"
                  required
                >
                  <option value="" disabled selected className="text-gray-400"> Select your subject </option>
                  {subjects.map((e, idx) => (
                    <option key={idx}>{e}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="relative w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-level"
              >
                Education Level <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-200 hover:border-amber-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-amber-300 transition-all"
                  id="grid-level"
                  required
                >
                  <option value="" disabled selected> Select your education level </option>
                  {levels.map((e, idx) => (
                    <option key={idx}>{e}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <input type="submit" className="btn-primary" value="Match" />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Matching;
