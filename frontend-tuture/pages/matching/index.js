import Layout from "../../components/Layout";

const subjects = ["Mathmetic", "Physic", "Biology", "English"];
const levels = ["Middle School", "High School"];

function Matching() {
  return (
    <Layout title="Matching">
      <div className="flex flex-col items-center">
        <h2 className="mb-6 text-2xl font-bold">Matching</h2>
        <form className="w-full max-w-2xl p-2">
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="relative mb-6 w-full px-3 md:mb-0 md:w-1/2">
              <label className="label" for="grid-subject">
                <span className="label-text">
                  Subject <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <div>
                <select
                  className="select select-bordered select-primary w-full"
                  id="grid-subject"
                  required
                >
                  <option value="" disabled selected className="text-gray-400">
                    {" "}
                    Select your subject{" "}
                  </option>
                  {subjects.map((e, idx) => (
                    <option key={idx}>{e}</option>
                  ))}
                </select>
              </div>
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full px-3 md:w-1/2">
              <label className="label" for="grid-level">
                <span className="label-text">
                  Education Level{" "}
                  <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <select
                  className="select select-bordered select-primary w-full"
                  id="grid-level"
                  required
                >
                  <option value="" disabled selected>
                    {" "}
                    Select your education level{" "}
                  </option>
                  {levels.map((e, idx) => (
                    <option key={idx}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <input
              type="submit"
              className="btn btn-primary btn-sm rounded-full"
              value="Match"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Matching;
